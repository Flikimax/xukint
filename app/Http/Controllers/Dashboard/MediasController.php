<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Photo;


class MediasController extends Controller
{
    public array $filesFiltered = [];

    public function __construct() {
        $allFiles = Storage::allFiles('public/photos');
        $photos = Photo::all('url');

        foreach ($photos as $photo) {
            $url = str_replace('/storage/', 'public/', $photo->url);
            $key = array_search($url, $allFiles);

            if ( $key !== false ) {
                unset( $allFiles[$key] );
            }
        }

        $this->filesFiltered = $allFiles;
    }


    public function index()
    {
        return Inertia::render('Dashboard/Medias/Index', [
            'title' => 'Medias',
            'list' => $this->filesFiltered,
            'sucessMessage' => session()->has('success') ? session()->get('success') : null,
            'csrf_token' => csrf_token()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PhotoCategory  $photosCategories
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if ( ! isset( $this->filesFiltered[ $id ] ) ) {
            return redirect()->route('dashboard.medias.index');
        }
        Storage::delete( $this->filesFiltered[ $id ] );

        return redirect()->route('dashboard.medias.index')->with('success', 'Deleted');
    }
}
