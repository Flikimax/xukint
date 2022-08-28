import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Dashboard from '@/Layouts/Dashboard';
import { hiddenSuccess } from '@/Components/Dashboard/Functions';
import SubHeader from '@/Components/Dashboard/SubHeader';
import Pagination from '@/Components/Pagination';
import { Link } from '@inertiajs/inertia-react';
 
export default function Index(props) {
    hiddenSuccess('success');

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<SubHeader title={props?.title} route={props?.routeToAddNew} />}
        >
            <Dashboard>
                <div className="grid bg-black text-white text-left grid-cols-5 py-6 rounded-t-lg">
                    <div className='col-span-3 px-2'>
                        Name
                    </div>
                    <div className='px-2 hidden sm:block'>
                        Last Update
                    </div>
                    <div className='px-2 text-center'>
                        Actions
                    </div>
                </div>
                
                <div className='list'>
                    {
                        props.list.data.map(category => (
                            <div className='grid grid-cols-5 items-center hover:bg-slate-50' key={category.id} >
                                <Link 
                                    className="col-span-3 py-4 px-2" 
                                    href={route('dashboard.categories.edit', category)}
                                >
                                    { category.name }
                                </Link>

                                <div className='date hidden sm:block px-2'>
                                    { category.updated_at }
                                </div>

                                <div className='actions grid grid-cols-2 sm:grid-cols-2 col-span-2 sm:col-span-1 text-center items-center' >
                                    <Link 
                                        className="col-span-2 sm:col-span-1 px-0 sm:px-2" 
                                        href={route('dashboard.categories.edit', [category.id])}
                                    >
                                        <button className='px-3 bg-black text-white rounded py-2 my-2 w-full'>
                                            Editar
                                        </button>
                                    </Link>

                                    <form 
                                        id={`formCategory-${category.id}`}
                                        className='col-span-2 sm:col-span-1 px-0 sm:px-2' 
                                        action={route('dashboard.categories.destroy', [category.id])}
                                        method="POST"
                                    >
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <input type="hidden" name="_token" value={props.csrf_token} />
                                        <input type="hidden" name="id" value={category.id} />

                                        <button
                                            type="submit"
                                            className='px-3 text-black text-sm hover:bg-red-300 text-white rounded py-2 my-2 w-full'
                                            onClick={(event) => {
                                                event.preventDefault();
                                                if (window.confirm(`Delete the ${category.name} category?`)) {
                                                    document.getElementById(`formCategory-${category.id}`).submit();
                                                }
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                    </form>
                                        
                                </div>

                            </div>
                        ))
                    }
                </div>

                {
                    props?.sucessMessage && 
                    <div id="success" className="bg-green-300 my-2 p-2 rounded-md text-sm col-span-6">
                        {props.sucessMessage}
                    </div>
                }


                <Pagination links={props.list?.links} />
            </Dashboard>
        </Authenticated>
    );
}
