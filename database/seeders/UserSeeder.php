<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;


class UserSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Flikimax',
            'email' => 'flikimax@gmail.com',
            'password' => bcrypt('12345678')
        ])->assignRole('Super Admin');

        // User::factory(30)
        //     ->create();

        // $this->assignRole();
    }

    public function assignRole()
    {
        $roles = new Roles;
        $roles = $roles();
        foreach (User::all() as $user) {
            $keyRole = array_rand($roles);
            $user->assignRole($keyRole);
        }
    }
}
