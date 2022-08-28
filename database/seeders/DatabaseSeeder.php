<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory()->create([
            'name' => 'Flikimax',
            'email' => 'flikimax@gmail.com',
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Naleja',
            'email' => 'alejandra.rg1227@gmail.com',
        ]);

        // $this->call([
        //     PhotoCategorySeeder::class,
        //     PhotoSeeder::class,
        // ]);
    }
}
