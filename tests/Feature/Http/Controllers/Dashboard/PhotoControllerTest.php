<?php

namespace Tests\Feature\Http\Controllers\Dashboard;

use App\Models\Photo;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Faker\Factory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PhotoControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(RoleSeeder::class);
    }

    public function test_guest()
    {
        $prefix = 'dashboard/photos';
        $this->get($prefix)->assertRedirect('login');
        $this->get("$prefix/1/edit")->assertRedirect('login');
        $this->get("$prefix/create")->assertRedirect('login');

        $this->put("$prefix/1")->assertRedirect('login');
        $this->post($prefix)->assertRedirect('login');
        $this->delete("$prefix/1")->assertRedirect('login');
    }

    public function test_photo_without_permissions()
    {
        $photo = Photo::factory()
            ->create();

        $prefix = '/dashboard/photos';
        $response = $this->actingAs( User::factory()->create() );

        $response
            ->get( $prefix . '/' )
            ->assertStatus(403);

        $response
            ->get( $prefix . "/$photo->slug/edit" )
            ->assertStatus(403);

        $response
            ->get( $prefix . '/create' )
            ->assertStatus(403);

        $response
            ->put( $prefix . "/$photo->slug" )
            ->assertStatus(403);

        $response
            ->post( $prefix . '/' )
            ->assertStatus(403);

        $response
            ->delete( $prefix . "/$photo->slug" )
            ->assertStatus(403);
    }


    public function test_photo_with_others_permissions()
    {
        $photo = Photo::factory()
            ->create();

        $user = User::factory()
            ->create()
            ->assignRole('Admin');

        $prefix = '/dashboard/photos';
        $response = $this->actingAs($user);

        $response
            ->get( $prefix . '/' )
            ->assertStatus(200);

        $response
            ->get( $prefix . "/$photo->slug/edit" )
            ->assertStatus(200);

        $response
            ->get( $prefix . '/create' )
            ->assertStatus(200);

        $response
            ->put( $prefix . "/$photo->slug" )
            ->assertStatus(302);

        $response
            ->post( $prefix . '/' )
            ->assertStatus(302);

        $response
            ->delete( $prefix . "/$photo->slug" )
            ->assertStatus(302);
    }

    /**
     * ==============================================
     * =================== SHOW ===================
     * ==============================================
     */
    public function test_show_not_nsfw()
    {
        $photo = Photo::factory()
            ->create([
                'nsfw' => false
            ]);

        $this
            ->get("photos/$photo->slug")
            ->assertStatus(200);
    }

    public function test_show_photo_nsfw()
    {
        $user = User::factory()
            ->create()
            ->assignRole('Guest');

        $photo = Photo::factory()
            ->create([
                'nsfw' => true
            ]);

        $this
            ->actingAs($user)
            ->get("photos/$photo->slug")
            ->assertStatus(200);
    }

    public function test_show_photo_nsfw_and_without_permissions()
    {
        $photo = Photo::factory()
            ->create([
                'nsfw' => true
            ]);

        $this
            ->get("photos/$photo->slug")
            ->assertRedirect('nsfw');
    }

    /**
     * ==============================================
     * =================== INDEX ===================
     * ==============================================
     */
    public function test_index()
    {
        $user = User::factory()
            ->create()
            ->assignRole('Photos');

        $this
            ->actingAs($user)
            ->get('/dashboard/photos')
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard/Photos/Index')
                ->hasAll([
                    'photos',
                    'categories'
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
            ->assignRole('Photos');

        $this
            ->actingAs($user)
            ->get("/dashboard/photos/create")
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard/Photos/CreateAndEdit')
            );
    }

    public function test_store()
    {
        $user = User::factory()
            ->create()
            ->assignRole('Photos');

        Storage::fake('local');

        $data = [
            'photo_category_id' => 1,
            'title' => 'Aloha nueva photo',
            'description' => 'Nueva descripción',
            'photo' => UploadedFile::fake()->image('photo.jpg'),
            'slug' => 'aloha-nueva-photo',
            'nsfw' => '1'
        ];

        $this
            ->actingAs($user)
            ->post("/dashboard/photos", $data)
            ->assertRedirect("/dashboard/photos/{$data['slug']}/edit");

        unset($data['photo']);
        $this->assertDatabaseHas('photos', $data);

        $photo = Photo::where('slug', $data['slug'])->first();

//        dd( $photo->url );
//        /storage/photos/14c27678aea34e590b2f562e59211e2c.jpg

        // Assert the file was stored...
    //    Storage::disk('local')->assertExists('photos/14c27678aea34e590b2f562e59211e2c.jpg');


//        $this->assertDatabaseHas('photos', $data);
    }

    /**
     * ==============================================
     * =================== EDIT ===================
     * ==============================================
     */
    public function test_edit()
    {
        $user = User::factory()
            ->create()
            ->assignRole('Photos');

        $photo = Photo::factory()->create();

        $this
            ->actingAs($user)
            ->get("/dashboard/photos/$photo->slug/edit")
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard/Photos/CreateAndEdit')
                ->hasAll([
                    'photo'
                ])
            );
    }

    public function test_update()
    {
        $user = User::factory()
            ->create()
            ->assignRole('Photos');

        $photo = Photo::factory()->create([
            'nsfw' => false
        ]);
        $data = [
            'photo_category_id' => $photo->photo_category_id,
            'title' => 'Aloha photo',
            'description' => 'Nueva descripción',
            'slug' => 'aloha-photo',
            'nsfw' => '1'
        ];

        $this
            ->actingAs($user)
            ->put("/dashboard/photos/$photo->slug", $data)
            ->assertRedirect("/dashboard/photos/{$data['slug']}/edit");

        $this->assertDatabaseHas('photos', $data);
    }
}
