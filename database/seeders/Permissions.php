<?php

namespace Database\Seeders;

class Permissions
{
    public static function getPermissions(): array
    {
        $permissions = [];

        $permissions['guest'] = [
            'nsfw',
            'dashboard',
        ];

        $permissions['posts'] = [
            'dashboard.posts.index',
            'dashboard.posts.create',
            'dashboard.posts.store',
            'dashboard.posts.show',
            'dashboard.posts.edit',
            'dashboard.posts.update',
            'dashboard.posts.destroy',
        ];
        $permissions['posts'] = array_merge($permissions['posts'], $permissions['guest']);
        
        $permissions['photos'] = [
            'dashboard.photos.index',
            'dashboard.photos.create',
            'dashboard.photos.store',
            'dashboard.photos.edit',
            'dashboard.photos.update',
            'dashboard.photos.destroy',
        ];
        $permissions['photos'] = array_merge($permissions['photos'], $permissions['guest']);
        
        $permissions['admin'] = array_merge($permissions['photos'], $permissions['posts'], $permissions['guest']);
        $permissions['super_admin'] = array_merge($permissions['admin'], [
            'dashboard.users.index',
            'dashboard.users.create',
            'dashboard.users.store',
            'dashboard.users.show',
            'dashboard.users.edit',
            'dashboard.users.update',
            'dashboard.users.destroy',
        ]);
        
        return $permissions;
    }
}
