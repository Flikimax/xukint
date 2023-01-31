<?php

namespace App\Models\Filters\Photo;

use App\Models\Filters\AbstracFilter;
use App\Models\Filters\General\ColumnLikeFilter;

class PhotoFilters extends AbstracFilter
{
    protected array $filters = [
        'title' => ColumnLikeFilter::class,
        'nsfw' => NsfwFilter::class,
        'category' => PhotoCategoryFilter::class
    ];

    public function apply($query)
    {
        foreach ($this->receivedFilters() as $name => $value) {
            $filterInstance = new $this->filters[$name];
            $query = $filterInstance($query, $name, $value);
        }
        return $query;
    }
}
