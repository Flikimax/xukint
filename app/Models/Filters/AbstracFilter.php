<?php

namespace App\Models\Filters;

abstract class AbstracFilter
{
    protected array $filters;

    abstract public function apply($query);

    public function receivedFilters(): array
    {
        return request()->only( array_keys($this->filters) );
    }
}
