import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/inertia-react';

import HeaderCreateEdit from "@/Components/Dashboard/HeaderCreateEdit";
import UserForm from './UserForm';

export default function CreateAndEdit(props) {
    const { user, roleDefault, roles, permissionsOfRole, formAction, csrf_token } = props;

    let header = {
        back: {
            text: "Volver",
            route: "dashboard.users.index"
        }
    };

    if ( formAction === 'update' ) {
        header.newItem = {
            text: "Agregar nuevo",
            route: "dashboard.users.create"
        };
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            permissions={props.permissions}
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 bg-white border-b border-gray-200">
                            <HeaderCreateEdit {...header} />
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                {
                                    props.flash.success &&
                                    <div className="bg-green-400 p-4 rounded">
                                        { props.flash.success }
                                    </div>
                                }
                                <UserForm user={user} roleDefault={roleDefault} roles={roles} action={formAction} csrf={csrf_token} />
                            </div>

                            {
                                formAction === 'update' && permissionsOfRole && permissionsOfRole.length > 0 && (
                                    <>
                                        <hr />
                                        <div className='mt-8'>
                                            
                                            <h4 className='mb-8'>
                                                Permisos
                                            </h4>

                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                                {
                                                    permissionsOfRole.map((permission) => (
                                                        <div >
                                                            { permission.name }
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                        </div>
                                    </>
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
