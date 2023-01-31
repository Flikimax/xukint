<?php

namespace App\Models\Filters;

use App\Models\Filters\General\ColumnLikeFilter;

class UserFilters extends AbstracFilter
{
    protected array $filters = [
        'name' => ColumnLikeFilter::class
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
