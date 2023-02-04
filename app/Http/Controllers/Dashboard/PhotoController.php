<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Filters\Photo\PhotoFilters;
use App\Models\Photo;
use App\Models\PhotoCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use App\Http\Requests\Dashboard\PhotoRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class PhotoController extends Controller
{
    /** @var array $pathsPhotos */
    protected $pathsPhotos = [
        'photo' => 'public/photos',
        'photo_nsfw' => 'public/photos/nsfw',
        'photo_nsfw_hiden' => 'public/photos/nsfw/hiden',
    ];


    /**
     * Display a listing of the resource.
     *
     * @param PhotoFilters $filters
     * @return Response
     */
    public function index(PhotoFilters $filters): Response
    {
        $photos = Photo::filter($filters)
            ->orderBy('id', 'desc')
            ->paginate(20);

        $categories = PhotoCategory::orderBy('name')
            ->get();

        return Inertia::render('Dashboard/Photos/Index', [
            'search' => request()->title ?? '',
            'filters' => [
                'nsfw' => $this->requestNsfw(),
                'category' => request()->category ?? '',
            ],
            'categories' => $categories,
            'photos' => $photos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        return Inertia::render('Dashboard/Photos/CreateAndEdit', [
            'categories' => PhotoCategory::orderBy('name', 'asc')->get(),
            'csrf_token' => csrf_token()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param PhotoRequest $request
     * @return RedirectResponse
     */
    public function store(PhotoRequest $request): RedirectResponse
    {
        $request->validate([
            'photo_category_id' => 'required|integer',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'photo' => 'mimes:jpg,jpeg,png', 
            'photo_nsfw' => 'mimes:jpg,jpeg,png', 
            'slug' => 'required|unique:photos,slug',
            'nsfw' => 'required',
        ]);
        
        $path = (bool) $request->nsfw ? $this->pathsPhotos['photo_nsfw'] : $this->pathsPhotos['photo'];
        $photo = Photo::create([
            'photo_category_id' => $request->photo_category_id,
            'title' => $request->title,
            'description' => $request?->description,
            'url' => $this->uploadPhoto($request, 'photo', $path),
            'url_nsfw' => $this->uploadPhoto($request, 'photo_nsfw', $this->pathsPhotos['photo_nsfw_hiden']),
            'slug' => Str::slug($request->title),
            'nsfw' => (bool) $request->nsfw
        ]);

        return redirect()->route('dashboard.photos.edit', $photo)->with('success', 'Creado con éxito');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Photo $photo
     * @return Response
     */
    public function edit(Photo $photo): Response
    {
        return Inertia::render('Dashboard/Photos/CreateAndEdit', [
            'photo' => $photo,
            'categories' => PhotoCategory::orderBy('name', 'asc')->get(),
            'formAction' => 'update',
            'csrf_token' => csrf_token()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param PhotoRequest $request
     * @param Photo $photo
     * @return RedirectResponse
     */
    public function update(PhotoRequest $request, Photo $photo): RedirectResponse
    {
        $request->validate([
            'photo_category_id' => 'required|integer',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'photo' => 'mimes:jpg,jpeg,png', 
            'photo_nsfw' => 'mimes:jpg,jpeg,png', 
            'slug' => 'required|unique:photos,slug,' . $photo->id,
            'nsfw' => 'required',
        ]);

        $path = (bool) $request->nsfw ? $this->pathsPhotos['photo_nsfw'] : $this->pathsPhotos['photo'];
        $photo->update([
            'photo_category_id' => $request->photo_category_id,
            'title' => $request->title,
            'description' => $request?->description,
            'url' => $photo->url ?? $this->uploadPhoto($request, 'photo', $path),
            'url_nsfw' => $photo->url_nsfw ?? $this->uploadPhoto($request, 'photo_nsfw', $this->pathsPhotos['photo_nsfw_hiden']),
            'slug' => Str::slug($request->title),
            'nsfw' => (bool) $request->nsfw
        ]);

        if ( $photo->url ) {
            $photoName = basename($photo->url);
            $path .= "/$photoName";
            
            $url = ltrim($photo->url, '/');
            $url = explode('/', $url);
            $url[0] = 'public';
            $url = implode('/', $url);

            if ( $path != $url ) {
                if ( Storage::move($url, $path) ) {
                    $newPath = explode('/', $path);
                    $newPath[0] = 'storage';
                    $newPath = '/' . implode('/', $newPath);

                    $photo->update([
                        'url' => $newPath,
                    ]);
                }
            }
        }

        return redirect()->route('dashboard.photos.edit', $photo)->with('success', 'Actualizado con éxito');
    }

    /**
     * Elimina la foto segun el campo de una foto. 
     *
     * @param Photo $photo
     * @param string $name
     * @return type
     **/
    public function destroyPhoto(Photo $photo, $name)
    {
        $path = $photo->{$name};
        $this->deletePhoto($path);
        $photo->update([$name => null]);
        return redirect()->route('dashboard.photos.edit', $photo)->with('success', 'Actualizado con éxito');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Photo $photo
     * @return RedirectResponse
     */
    public function destroy(Photo $photo): RedirectResponse
    {
        $this->deletePhoto($photo->url);
        $this->deletePhoto($photo->url_nsfw);

        $photo->delete();
        return redirect()->route('dashboard.photos.index')->with('success', 'Eliminado con éxito');
    }

    /**
     * Elimina un archivo (foto).
     *
     * @param string $path
     * @return bool
     **/
    public function deletePhoto($path)
    {
        $path = ltrim($path, '/');
        $path = explode('/', $path);
        $path[0] = 'public';
        $path = implode('/', $path);

        // dd( $path );

        return Storage::delete($path);
    }


    /**
     * Valida si NSFW es verdadero o falso.
     *
     * @return string
     **/
    private function requestNsfw(): string
    {
        if ( ! request()->nsfw && request()->nsfw !== '0' ) {
            return '';
        }

        return request()->nsfw == 0 ? '0' : '1';
    }

    /**
     * Sube una foto.
     *
     * @param PhotoRequest $request
     * @return null|string
     **/
    private function uploadPhoto(PhotoRequest $request, $name, $path = null): ?string
    {
        if ( $request->hasFile($name) ) {
            $md5Name = md5_file($request->file($name)->getRealPath());
            $extensionFile = $request->file($name)->guessExtension();

            $file = $request->file($name)->storeAs($path, "$md5Name.$extensionFile"  ,'local');
            return Storage::url($file);
        }

        return null;
    }
}
