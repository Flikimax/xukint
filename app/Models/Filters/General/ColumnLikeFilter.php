<?php

namespace App\Models\Filters\General;

class ColumnLikeFilter
{
    public function __invoke($query, $column, $value)
    {
        return $query->where($column, 'like', "%$value%");
    }
}
