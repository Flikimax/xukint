<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class PhotoCategory extends Model
{
    use HasFactory;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForhumans();
    }

    /**
     * Get the posts for the category.
     */
    public function photoCategories()
    {
        return $this->hasMany(Photo::class);
    }
}
