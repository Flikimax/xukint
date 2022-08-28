import React from 'react';
import Authenticated from '@/Layouts/Authenticated';

import { hiddenSuccess } from '@/Components/Dashboard/Functions';
import Dashboard from '@/Layouts/Dashboard';


import SubHeader from '@/Components/Dashboard/SubHeader';


import { Link, Head } from '@inertiajs/inertia-react';
 
export default function CreateAndEdit(props) {
    hiddenSuccess('success');

    const title = props?.title ? props.title : 'Dashboard';

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            // header={<Header title={title} route="dashboard.photos.create" />}
            header={<SubHeader title={props?.title} route={props?.routeTo} />}
        >
            <Head title={title} />

            <Dashboard>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    <form 
                        className='col-span-1 lg:col-span-2'
                        action={ props?.formAction ? route(props.formAction, props.photo) : route('dashboard.photos.store') } method="POST"
                        encType="multipart/form-data"
                    >

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
                                        <label htmlFor="photo_category_id" className="block text-sm font-medium text-gray-700">Category *</label>
                                        <select 
                                            id="photo_category_id" 
                                            name="photo_category_id" 
                                            autoComplete="photo_category_id" 
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            defaultValue={ props.photo.photo_category_id }
                                        >
                                            {
                                                props.categories && 
                                                props.categories.map(category => (
                                                    <option value={category.id} key={category.id}  >
                                                        { category.name }

                                                        

                                                    </option>
                                                ))
                                            }
                                        </select>
                                        {
                                            props.errors?.category && 
                                            <div className="bg-red-300 my-2 p-2 rounded-md text-sm">
                                                { props.errors.category }
                                            </div>
                                        }
                                    </div>

                                    <div className="lg:col-span-3 col-span-6">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title *</label>
                                        <input 
                                            type="text" 
                                            name="title" 
                                            id="name" 
                                            autoComplete="title" 
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            defaultValue={ props?.photo?.title && props.photo.title }
                                        />
                                        {
                                            props.errors?.title && 
                                            <div className="bg-red-300 my-2 p-2 rounded-md text-sm">
                                                { props.errors.title }
                                            </div>
                                        }
                                    </div>

                                    <div className="lg:col-span-3 col-span-6">
                                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                                            Photo
                                        </label>
                                        <input 
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                            aria-describedby="file_input_help" 
                                            id="photo" 
                                            name="photo" 
                                            type="file"
                                            accept='image/*'
                                        />
                                        
                                        {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p> */}
                                        {
                                            props.errors?.url && 
                                            <div className="bg-red-300 my-2 p-2 rounded-md text-sm">
                                                { props.errors.description }
                                            </div>
                                        }
                                    </div>



                                    <div className="col-span-6">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <textarea 
                                            name="description" 
                                            id="description" 
                                            cols="30" 
                                            rows="10"
                                            defaultValue={ props?.photo?.description && props.photo.description }
                                            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                        ></textarea>
                                    </div>

        








                                </div>
                            </div>

                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                            </div>
                        </div>
                    </form>

                    <div className='px-4 py-5 bg-white sm:p-6'>
                        {
                            props?.photo?.url && 
                            <div>
                                <picture>
                                    <source srcSet={props.photo.url} type="image/webp" />
                                    <img className='w-full block' src={props.photo.url} alt={props.photo.title} />
                                </picture>
                            </div>
                        }
                    </div>

                </div>

                


            </Dashboard>







        </Authenticated>
    );
}
