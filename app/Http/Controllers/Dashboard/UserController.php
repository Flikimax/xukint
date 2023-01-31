<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Database\Seeders\Roles;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

use Illuminate\Validation\Rule;
use App\Models\User;
use Inertia\Response;

use App\Models\Filters\UserFilters;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(UserFilters $filters)
    {
        $users = User::orderBy('name')
            ->where('id', '!=', Auth::user()->id)
            ->filter($filters)
            ->with('roles')
            ->paginate(10);

        return Inertia::render('Dashboard/Users/Index', [
            'search' => request()->name ?? '',
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        $roleDefault = null;
        $roles = Role::all();

        return Inertia::render('Dashboard/Users/CreateAndEdit', [
            'roleDefault' => $roleDefault,
            'roles' => $roles,
            'csrf_token' => csrf_token()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $roles = new Roles;
        $roles = $roles();
        $roles[] = 'none';

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', 'min:8'],
            'password_confirmation' => ['required', 'min:8'],
            'role' => 'string|required|in:' . implode(',', $roles),
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if ( $request->role !== 'none' ) {
            $user->assignRole($request->role);
        }

        event(new Registered($user));

        return redirect()->route('dashboard.users.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  User $user
     * @return Response
     */
    public function edit(User $user): Response
    {
        $userRole = $user->getRoleNames();
        $roleDefault = isset($userRole[0]) ? $userRole[0] : null;
        $roles = Role::all();
        $permissionsOfRole = Role::findByName('Photos')->permissions;

        return Inertia::render('Dashboard/Users/CreateAndEdit', [
            'user' => $user,
            'roleDefault' => $roleDefault,
            'roles' => $roles,
            'permissionsOfRole' => $permissionsOfRole,
            'formAction' => 'update',
            'csrf_token' => csrf_token()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param User $user
     * @return RedirectResponse
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $roles = new Roles;
        $roles = $roles();
        $roles[] = 'none';

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id) ],
            'password' => ['confirmed', 'present'],
            'password_confirmation' => '',
            'role' => 'string|required|in:' . implode(',', $roles),
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        $minimumPasswordLength = 8;
        if ( is_string($request->password) &&
            ( strlen($request->password) > 0 && strlen($request->password) > 0 )
            && ( strlen($request->password) < $minimumPasswordLength && strlen($request->password) < $minimumPasswordLength )
        ) {
            $message = 'La contraseña debe tener al menos 8 caracteres.';
            return redirect()->back()->withErrors([
                'password' => $message,
                'password_confirmation' => $message
            ]);
        } else {
            $data['password'] = Hash::make($request->password);
        }

        $user->update( $data );

        if ( $request->role !== 'none' ) {
            $user->syncRoles([]);
            $user->assignRole($request->role);
        }

        return redirect()->route('dashboard.users.edit', $user)->with('success', 'Actualizado con éxito');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  User $user
     * @return RedirectResponse
     */
    public function destroy(User $user): RedirectResponse
    {
        $user->delete();
        return redirect()->route('dashboard.users.index')->with('message', 'Eliminado con éxito');
    }
}
