<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\PhotoCategory;
use App\Models\Photo;
use Inertia\Inertia;

class PhotosController extends Controller
{
    protected function routeTo($route, $text) {
        return [
            'link' => $route,
            'text' => $text
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $photosList = Photo::paginate(20);
        
        return Inertia::render('Dashboard/Photo/Index', [
            'title' => 'Photos',
            'routeTo' => $this->routeTo(route('dashboard.photos.create'), 'Add new'),
            'list' => $photosList
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = PhotoCategory::orderBy('updated_at', 'desc')->get();

        return Inertia::render('Dashboard/Photo/CreateAndEdit', [
            'title' => 'Create Photo',
            'routeTo' => $this->routeTo(route('dashboard.photos.index'), 'View categories'),
            'categories' => $categories,
            'sucessMessage' => session()->has('success') ? session()->get('success') : null,
            'csrf_token' => csrf_token()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'photo_category_id' => 'required|integer',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'photo' => 'mimes:jpg,jpeg,png',
        ]);

        if ( $request->hasFile('photo') ) {
            $md5Name = md5_file($request->file('photo')->getRealPath());
            $extensionFile = $request->file('photo')->guessExtension();

            $file = $request->file('photo')->storeAs('public/photos', "{$md5Name}.{$extensionFile}"  ,'local');
            $url = Storage::url($file);
        }

        $photo = Photo::create([
            'photo_category_id' => $request->photo_category_id,
            'url' => $url ?? null,
            'title' => $request->title,
            'description' => $request?->description,
        ]);

        return redirect()->route('dashboard.photos.edit', [$photo->id])->with('success', 'Created');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Photo  $photos
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $photo = Photo::find($id);
        if ( ! $photo ) {
            return redirect()->route('dashboard.photos.index');
        }
        $sucessMessage = (session()->has('success')) ? session()->get('success') : null;

        $categories = PhotoCategory::orderBy('updated_at', 'desc')->get();

        return Inertia::render('Dashboard/Photo/CreateAndEdit', [
            'title' => 'Photos - Edit',
            'routeTo' => $this->routeTo(route('dashboard.photos.index'), 'View Photos'),
            'photo' => $photo,
            'categories' => $categories,
            'sucessMessage' => $sucessMessage,
            'formAction' => 'dashboard.photos.update',
            'csrf_token' => csrf_token()
        ]); 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'photo_category_id' => 'required|integer',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'photo' => 'mimes:jpg,jpeg,png',
        ]);

        $photo = Photo::find($id);
        if ( ! $photo ) {
            return redirect()->route('dashboard.photos.index');
        }

        $url = $photo->url;
        if ( $request->hasFile('photo') ) {
            $md5Name = md5_file($request->file('photo')->getRealPath());
            $extensionFile = $request->file('photo')->guessExtension();

            $file = $request->file('photo')->storeAs('public/photos', "{$md5Name}.{$extensionFile}"  ,'local');
            $url = Storage::url($file);
        }

        $photo->update([
            'photo_category_id' => $request->photo_category_id,
            'url' => $url ?? null,
            'title' => $request->title,
            'description' => $request?->description,
        ]);

        return redirect()->back()->with('success', 'Saved');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\photos  $photos
     * @return \Illuminate\Http\Response
     */
    public function destroy(photos $photos)
    {
        //
    }
}
