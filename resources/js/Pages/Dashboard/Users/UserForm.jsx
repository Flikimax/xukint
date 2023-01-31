import React from 'react';
import {useForm} from '@inertiajs/inertia-react';
import InputPassword from "@/Components/Dashboard/InputPassword";
import ErrorForm from "@/Components/Dashboard/ErrorForm"

export default function UserForm(props) {
    const { user, roleDefault, roles, action, csrf } = props;
    const { data, setData, post, put, delete: destroy, processing, errors } = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: user?.password ?? '',
        password_confirmation: '',
        role: roleDefault ?? 'none'
    });

    const submit = (e) => {
        e.preventDefault();
        const url = "dashboard.users.";
        action === 'update' ? put( route(url + action, user) ) : post( route(url + "store") );
    }

    const submitDestroy = (e) => {
        e.preventDefault();
        let result = confirm("¿Desea eliminar el usuario?");
        if ( result ) {
            destroy( route('dashboard.users.destroy', user) );
        }
    }

    return (
        <>
            <form
                action="#"
                method="POST"
                onSubmit={submit}
            >
                { props?.action && <input type="hidden" name="_method" value="PUT" /> }
                <input type="hidden" name="_token" value={csrf} />

                <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="name"
                                    defaultValue={data.name}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={e => setData('name', e.target.value)}
                                />
                                <ErrorForm error={errors.name} />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    defaultValue={data.email}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={e => setData('email', e.target.value)}
                                />
                                <ErrorForm error={errors.email} />
                            </div>

                            <div className="col-span-6">
                                <label
                                    htmlFor="role"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Rol
                                </label>
                                <select
                                    required
                                    id="role"
                                    name="role"
                                    autoComplete="role"
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    defaultValue={roleDefault}
                                    onChange={e => setData('role', e.target.value)}
                                >
                                    <option value="none">
                                        Ninguno
                                    </option>
                                    { roles && roles.map(role =>
                                        <option value={role.name} key={role.id}>
                                            { role.name }
                                        </option>
                                    ) }
                                </select>
                            </div>


                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Contraseña
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <InputPassword
                                        id="password"
                                        name="password"
                                        autoComplete="password"
                                        defaultValue={data.password}
                                        setData={setData}
                                    />
                                </div>
                                <ErrorForm error={errors.password} />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Confirmar contraseña
                                </label>

                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <InputPassword
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        autoComplete="password_confirmation"
                                        defaultValue={data.password_confirmation}
                                        setData={setData}
                                    />
                                </div>
                                <ErrorForm error={errors.password_confirmation} />
                            </div>

                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>

            {
                action === 'update' &&
                <form
                    action="#"
                    method="POST"
                    onSubmit={submitDestroy}
                    className="my-4"
                >
                    <input type="hidden" name="_method" value="DELETE" />
                    <input type="hidden" name="_token" value={csrf} />

                    <button type="submit" className="rounded-md">
                        Eliminar
                    </button>
                </form>
            }
        </>
    );
}
