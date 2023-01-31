<?php

namespace Tests\Feature\Http\Controllers\Dashboard;

use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use App\Models\User;
use Database\Seeders\Roles;
use Illuminate\Database\Eloquent\Collection;

class UserControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function setUp():void
    {
        parent::setUp();
        $this->seed(RoleSeeder::class);
    }

    public function test_guest()
    {
        $prefix = 'dashboard/users';
        $this->get($prefix)->assertRedirect('login');
        $this->get("$prefix/1/edit")->assertRedirect('login');
        $this->get("$prefix/create")->assertRedirect('login');

        $this->put("$prefix/1")->assertRedirect('login');
        $this->post($prefix)->assertRedirect('login');
        $this->delete("$prefix/1")->assertRedirect('login');
    }

    public function test_user_without_permissions()
    {
        $user = User::factory()
            ->create();

        $prefix = '/dashboard/users';
        $response = $this->actingAs( User::factory()->create() );

        $response
            ->get( $prefix . '/' )
            ->assertStatus(403);

        $response
            ->get( $prefix . "/$user->id/edit" )
            ->assertStatus(403);

        $response
            ->get( $prefix . '/create' )
            ->assertStatus(403);

        $response
            ->put( $prefix . "/$user->id" )
            ->assertStatus(403);

        $response
            ->post( $prefix . '/' )
            ->assertStatus(403);

        $response
            ->delete( $prefix . "/$user->id" )
            ->assertStatus(403);
    }

    public function test_index()
    {
        $user = User::factory()
            ->create()
            ->assignRole('Super Admin');

        $this
            ->actingAs($user)
            ->get( '/dashboard/users' )
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard/Users/Index')
                ->hasAll([
                    'permissions',
                    'users'
                ])
            );
    }

    /**
     * ==============================================
     * =================== CREATE ===================
     * ==============================================
     */
    public function test_create()
    {
        $user = User::factory()
            ->create()
            ->assignRole('Super Admin');

        $otherUser = User::factory()
            ->create();

        $this
            ->actingAs($user)
            ->get( "/dashboard/users/$otherUser->id/edit" )
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->Component('Dashboard/Users/CreateAndEdit')
                ->hasAll([
                    'roles',
                    'roleDefault',
                    'csrf_token'
                ])
            );
    }

    public function test_store()
    {
        $roles = new Roles;
        $roles = $roles();
        $roles[] = 'none';

        $data = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
        ];
        $dataUser = array_merge($data, [
            'password' => $this->faker->password(8),
            'role' => array_shift($roles)
        ]);
        $dataUser['password_confirmation'] = $dataUser['password'];

        $user = User::factory()
            ->create()
            ->assignRole('Super Admin');

        $this
            ->actingAs($user)
            ->post('dashboard/users', $dataUser)
            ->assertRedirect('dashboard/users');

        $this->assertDatabaseHas('users', $data);

        $newUser = User::where('email', $data['email'])->first();
        $this->assertInstanceOf(Collection::class, $newUser->roles);
    }

    /**
     * ============================================
     * =================== EDIT ===================
     * ============================================
     */
    public function test_edit()
    {
        $user = User::factory()
            ->create()
            ->assignRole('Super Admin');

        $otherUser = User::factory()
            ->create([
                'name' => 'User Test',
                'email' => 'test@mail.com'
            ]);

        $this
            ->actingAs($user)
            ->get( "/dashboard/users/$otherUser->id/edit" )
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->Component('Dashboard/Users/CreateAndEdit')
                ->hasAll([
                    'user',
                    'roles',
                    'roleDefault',
                    'formAction',
                    'csrf_token'
                ])
                ->whereAll([
                    'user.name' => $otherUser->name,
                    'user.email' => $otherUser->email,
                ])
            );
    }

    public function test_update()
    {
        $user = User::factory()
            ->create()
            ->assignRole('Super Admin');

        $otherUser = User::factory()
            ->create([
                'name' => 'User Test',
                'email' => 'test@mail.com'
            ]);

        $roles = new Roles;
        $roles = $roles();
        $roles[] = 'none';
        $data = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
        ];
        $dataUser = array_merge($data, [
            'password' => $this->faker->password(8),
            'role' => array_shift($roles)
        ]);
        $dataUser['password_confirmation'] = $dataUser['password'];

        $this
            ->actingAs($user)
            ->patch("dashboard/users/$otherUser->id", $dataUser)
            ->assertRedirect("dashboard/users/$otherUser->id/edit");

        $this->assertDatabaseHas('users', [
            'email' => $data['email']
        ]);

        $newUser = User::where('email', $data['email'])->first();
        $this->assertInstanceOf(Collection::class, $newUser->roles);
    }

    /**
     * ===============================================
     * =================== DESTROY ===================
     * ===============================================
     */
    public function test_destroy()
    {
        $user = User::factory()
            ->create()
            ->assignRole('Super Admin');

        $otherUser = User::factory()
            ->create([
                'name' => $this->faker->name,
                'email' => $this->faker->email,
            ]);

        $this
            ->actingAs($user)
            ->delete("dashboard/users/$otherUser->id")
            ->assertRedirect("dashboard/users");

        $this->assertDatabaseMissing('users', [
            'name' => $otherUser->name,
            'email' => $otherUser->email,
        ]);
    }

}
