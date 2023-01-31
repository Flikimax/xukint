<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = $this->customPermissions(true);
        $roles = new Roles;
        foreach ($roles() as $name) {
            $role = Role::create(['name' => $name]);

            $roleKey = str_replace(' ', '_', $name);
            $roleKey = strtolower($roleKey);

            $role->syncPermissions( $permissions[$roleKey] );
        }
    }

    /**
     * Create permissions.
     *
     * @return array
     */
    public static function customPermissions(bool $ifForgetCached = false): array
    {
        // Reset cached roles and permissions
        if ($ifForgetCached) {
            app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        }

        $customPermissions = Permissions::getPermissions();
        $permissionsCreated = [];
        $cache = [];
        foreach ( $customPermissions as $name => $permissions ) {
            foreach ($permissions as $permission) {
                if ( ! isset($cache[$permission]) ) {
                    $cache[$permission] = Permission::findOrCreate($permission);
                }

                $permissionsCreated[$name][] = $cache[$permission];
            }
        }

        return $permissionsCreated;
    }


}
