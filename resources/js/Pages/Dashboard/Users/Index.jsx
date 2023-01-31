import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';

import Table from '@/Components/Table/Table';
import NotResults from "@/Components/Table/NotResults";
import Search from '@/Components/Search';

export default function Index(props) {
    const title = 'Usuarios';
    const { users, search } = props;
    const searchData = {
        route: "/dashboard/users",
        formData: {
            name: search,
            input: {
                name: "name",
                value: search
            }
        }
    };

    const tableData = {
        items: users,
        columns: {
            name: "Nombre",
            email: "Email",
            roles: "Permisos"
        },
        hidden: [
            "email",
            "roles"
        ],
        actions: {
            edit: {
                route: "dashboard.users.edit",
                text: "Editar"
            }
        },
        callback: {
            roles: (item) => item.roles && item.roles.map(role => role.name)
        }
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
            permissions={props.permissions}
        >
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto md:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm md:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {
                                props.flash.message &&
                                <div className="">
                                    { props.flash.message }
                                </div>
                            }

                            <div className="flex justify-between flex-col-reverse md:flex-row my-4">
                                <div className="flex">
                                    <div className="shrink-0 flex items-center text-sm font-medium">
                                        { users.total } usuarios
                                    </div>
                                </div>

                                <div className="flex md:items-center justify-between my-6 md:my-0">
                                    <div className="relative">
                                        <Search {...searchData} />
                                    </div>

                                    <div className="ml-3 relative items-start">
                                        <button className="bg-black text-white rounded-md">
                                            <a
                                                className="block py-2 px-4"
                                                href={route('dashboard.users.create')}
                                            >
                                                Agregar nuevo
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            { users.total > 0 ? <Table {...tableData} /> : <NotResults /> }

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
