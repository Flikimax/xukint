<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Requests\StorePhotosCategories;

use App\Models\PhotoCategory;
use Inertia\Inertia;

class PhotoCategoriesController extends Controller
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
        $categories = PhotoCategory::orderBy('updated_at', 'desc')->paginate(10);
        $sucessMessage = (session()->has('success')) ? session()->get('success') : null;

        return Inertia::render('Dashboard/Categories/Index', [
            'title' => 'Categories',
            'routeToAddNew' => $this->routeTo(route('dashboard.categories.create'), 'Add new'),
            'list' => $categories,
            'csrf_token' => csrf_token(),
            'sucessMessage' => $sucessMessage
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Dashboard/Categories/CreateAndEdit', [
            'title' => 'Create category',
            'routeTo' => $this->routeTo(route('dashboard.categories.index'), 'View categories'),
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
    public function store(StorePhotosCategories $request)
    {
        $category = PhotoCategory::create( $request->all() );
        return redirect()->route('dashboard.categories.edit', [$category->id])->with('success', 'Created');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PhotoCategory  $photosCategories
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $category = PhotoCategory::find($id);
        if ( ! $category ) {
            return redirect()->route('dashboard.categories.index');
        }
        $sucessMessage = (session()->has('success')) ? session()->get('success') : null;

        return Inertia::render('Dashboard/Categories/CreateAndEdit', [
            'category' => $category,
            'title' => 'Update category',
            'routeTo' => $this->routeTo(route('dashboard.categories.index'), 'View categories'),
            'sucessMessage' => $sucessMessage,
            'formAction' => 'dashboard.categories.update',
            'csrf_token' => csrf_token()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PhotoCategory  $photosCategories
     * @return \Illuminate\Http\Response
     */
    public function update(StorePhotosCategories $request, $id)
    {
        $category = PhotoCategory::find($id);
        if ( ! $category ) {
            return redirect()->route('dashboard.categories.index');
        }

        $category->update( $request->all() );
        return redirect()->back()->with('success', 'Saved');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PhotoCategory  $photosCategories
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        PhotoCategory::destroy($id);
        return redirect()->route('dashboard.categories.index')->with('success', 'Deleted');
    }
}
