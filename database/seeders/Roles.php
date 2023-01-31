<?php

namespace Database\Seeders;

class Roles
{
    private array $roles = [
        'Super Admin',
        'Admin',
        'Photos',
        'Posts',
        'Guest'
    ];

    public function __invoke()
    {
        return $this->roles;
    }
}
