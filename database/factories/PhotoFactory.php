<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\photo>
 */
class PhotoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'photo_category_id' => rand(1,10),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->text(200),
            'url' => $this->faker->imageUrl(
                '1080',
                '1350'
            )
            // 'url' => $this->faker->image(
            //     'public/storage/images', 
            //     1080, 
            //     1350
            // ),
        ];
    }
}
