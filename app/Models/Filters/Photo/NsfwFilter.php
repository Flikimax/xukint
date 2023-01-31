<?php

namespace App\Models\Filters\Photo;

class NsfwFilter
{
    public function __invoke($query, $column, $isNsfw)
    {
        if ( is_null($isNsfw) ) {
            return $query;
        }

        return $query->where($column, $isNsfw);
    }
}
