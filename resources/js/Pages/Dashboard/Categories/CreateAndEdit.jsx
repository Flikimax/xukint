import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Dashboard from '@/Layouts/Dashboard';
import { hiddenSuccess } from '@/Components/Dashboard/Functions';
import SubHeader from '@/Components/Dashboard/SubHeader';
import { Link } from '@inertiajs/inertia-react';



export default function CreateAndEdit(props) {
    hiddenSuccess('success');
    
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<SubHeader title={props?.title} route={props?.routeTo} />}
        >
            
            <Dashboard>
                <div className="mt-10 sm:mt-0">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form action={ props?.formAction ? route(props.formAction, props.category) : route('dashboard.categories.store') } method="POST">
                            { props?.formAction && <input type="hidden" name="_method" value="PUT" /> }
                            <input type="hidden" name="_token" value={props.csrf_token} />

                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">

                                        {
                                            props?.sucessMessage && 
                                            <div id="success" className="bg-green-300 my-2 p-2 rounded-md text-sm col-span-6">
                                                {props.sucessMessage}
                                            </div>
                                        }

                                        <div className="col-span-6">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                id="name" 
                                                autoComplete="name" 
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                defaultValue={ props?.category?.name && props.category.name }
                                            />
                                        
                                            {
                                                props.errors?.name && 
                                                <div className="bg-red-300 my-2 p-2 rounded-md text-sm">
                                                    { props.errors.name }
                                                </div>
                                            }
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <span className="hidden md:inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">{ route('home') }/</span>
                                                <input 
                                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" 
                                                    type="text" 
                                                    name="slug" 
                                                    id="slug"
                                                    defaultValue={ props?.category?.slug && props.category.slug }
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Dashboard>
        </Authenticated>
    );
}
