<?php

namespace App\Models\Filters\Photo;

class PhotoCategoryFilter
{
    public function __invoke($query, $column, $slug)
    {
        if ( empty($slug) ) {
            return $query;
        }

        return $query->whereHas('photo_category', function ($q) use ($slug) {
            $q->whereSlug($slug);
        });
    }
}
