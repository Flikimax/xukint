<?php
namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Photo;
use App\Models\PhotoCategory;

class PhotosCategoryController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(PhotoCategory $photoCategory)
    {
        return Inertia::render('Home', [
            'categories' => PhotoCategory::all(),
            'photos' => $photoCategory->photoCategories()->orderByDesc('id')->paginate(30),
            'active' => $photoCategory->slug
        ]);
    }
}