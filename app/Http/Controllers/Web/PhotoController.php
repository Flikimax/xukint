<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use App\Models\Photo;

class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
    //     * @return Response
     */
    public function index()
    {
//        $photosList = Photo::paginate(20);
//
//        return Inertia::render('Dashboard/Photo/Index', [
//            'title' => 'Photos',
//            'routeTo' => $this->routeTo(route('dashboard.photos.create'), 'Add new'),
//            'list' => $photosList
//        ]);

//        return Inertia::render('Dashboard/Users/Index', [
//            'search' => request()->name ?? '',
//            'users' => $users
//        ]);
    }

    /**
     * Display a listing of the resource.
     *
//     * @return Response
     */
    public function show(Photo $photo)
    {
        if ( $photo->nsfw && ! Auth::user() ) {
            return redirect()->route('nsfw');
        }


//        return Inertia::render('Dashboard/Users/Index', [
//            'search' => request()->name ?? '',
//            'users' => $users
//        ]);
    }

}
