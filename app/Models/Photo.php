<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopeFilter($query, $filters)
    {
        return $filters->apply($query);
    }


    // Relaciones
    /**
     * Get the posts for the category.
     */
    public function photo_category()
    {
        return $this->belongsTo(PhotoCategory::class);
    }
}
