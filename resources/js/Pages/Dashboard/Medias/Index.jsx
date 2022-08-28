import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Dashboard from '@/Layouts/Dashboard';
import SubHeader from '@/Components/Dashboard/SubHeader';
import Pagination from '@/Components/Pagination';
import { hiddenSuccess } from '@/Components/Dashboard/Functions';
import { Link } from '@inertiajs/inertia-react';

export default function Index(props) {
    hiddenSuccess('success');

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<SubHeader title={props?.title} route={props?.routeTo} />}
        >
            
            <Dashboard>
                <div className="grid bg-black text-white text-left grid-cols-5 py-6 rounded-t-lg">
                    <div className='col-span-4 px-2'>
                        Photo
                    </div>

                    <div className='px-2 text-center'>
                        Action
                    </div>
                </div>
                
                <div className='list'>
                    {
                        Object.entries(props.list).map((value, key) => {
                            const id = value[0];
                            const slug = value[1];
                            const url = route('home') + slug.replace('public/', '/storage/');

                            return (
                                <div className='grid grid-cols-5 items-center hover:bg-slate-50' key={id} >
                                    <div 
                                        className="col-span-4 py-4 px-2" 
                                        href={url}
                                    >
                                        <picture>
                                            <source srcSet={url} type="image/webp" />
                                            <img className='w-32 block' src={url} />
                                        </picture>
                                    </div>
    
                                    <div className='actions col-span-1 text-center items-center' >

                                        <form 
                                            id={`formCategory-${id}`}
                                            className='col-span-2 sm:col-span-1 px-0 sm:px-2' 
                                            action={route('dashboard.medias.destroy', [id])}
                                            method="POST"
                                        >
                                            <input type="hidden" name="_method" value="DELETE" />
                                            <input type="hidden" name="_token" value={props.csrf_token} />
                                            <input type="hidden" name="url" value={id} />
    
                                            <button
                                                type="submit"
                                                className='px-3 text-black text-sm hover:bg-red-300 text-white rounded py-2 my-2 w-full'
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    if (window.confirm(`Delete the photo?`)) {
                                                        document.getElementById(`formCategory-${id}`).submit();
                                                    }
                                                }}
                                            >
                                                Eliminar
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )
                        })
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
