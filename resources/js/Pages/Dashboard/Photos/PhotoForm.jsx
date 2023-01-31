import React from 'react';
import ErrorForm from "@/Components/Dashboard/ErrorForm"
import {Link, useForm} from '@inertiajs/inertia-react';

export default function PhotoForm(props) {
    const { categories, action, csrf } = props;
    const errorsProps = props.errors;
    let { photo } = props;

    if ( ! photo && categories.length > 0 ) {
        photo = {
            photo_category_id: categories[0].id,
            nsfw: 0,
            photo: null,
            photo_nsfw: null,
        }
    }

    const { data, setData, post, put, delete: destroy, processing, errors } = useForm(photo);

    const submit = (e) => {
        e.preventDefault();
        const url = "dashboard.photos.";
        action === 'update' ? put( route(url + action, photo) ) : post( route(url + "store") );
    }

    const submitDestroy = (e) => {
        e.preventDefault();
        let result = confirm("¿Desea eliminar la publicación?");
        if ( result ) {
            destroy( route('dashboard.photos.destroy', photo) );
        }
    }

    const submitDestroyPhoto = (e) => {
        e.preventDefault();
        let result = confirm("¿Desea eliminar la foto?");
        if ( result ) {
            destroy( route('dashboard.photos.destroyPhoto', [photo, e.target.name.value]) );
        }
    }

    return (
        <>
            <div className={ photo?.url ? 'grid gap-6' : 'grid grid-cols-1' }>
                <div className="relative">
                    <form
                        method="POST"
                        action={ props?.action ? route('dashboard.photos.update', data.slug) : route('dashboard.photos.store') }
                        encType="multipart/form-data"
                    >
                        { props?.action && <input type="hidden" name="_method" value="PUT" /> }
                        <input type="hidden" name="_token" value={csrf} />

                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="bg-white px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-6 gap-6">

                                    <div className="lg:col-span-3 col-span-6">
                                        <label htmlFor="photo_category_id" className="block text-sm font-medium text-gray-700">Categoría *</label>
                                        <select
                                            id="photo_category_id"
                                            name="photo_category_id"
                                            autoComplete="photo_category_id"
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            // defaultValue={ data.photo_category_id }
                                            onChange={e => setData('photo_category_id', e.target.value)}
                                        >
                                            {
                                                categories && categories.map(category => (
                                                    <option value={category.id} key={category.id}  >
                                                        { category.name }
                                                    </option>
                                                ))
                                            }
                                        </select>

                                        <ErrorForm error={errors.photo_category_id} />
                                    </div>

                                    <div className="lg:col-span-3 col-span-6">
                                        <label htmlFor="photo_category_id" className="block text-sm font-medium text-gray-700">NSFW *</label>
                                        <select
                                            id="nsfw"
                                            name="nsfw"
                                            autoComplete="nsfw"
                                            defaultValue={ data.nsfw }
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={e => setData('nsfw', e.target.value)}
                                        >
                                            <option value='0'>No</option>
                                            <option value='1'>Si</option>
                                        </select>

                                        <ErrorForm error={errors.nsfw} />
                                    </div>

                                    <div className={photo?.url ? 'col-span-6 lg:col-span-6 ' : 'lg:col-span-3 ' + `col-span-6`}>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titulo *</label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="name"
                                            autoComplete="title"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            defaultValue={ data.title }
                                            onChange={e => setData('title', e.target.value)}
                                        />

                                        <ErrorForm error={ errorsProps.title } />
                                        <ErrorForm error={ errorsProps.slug } />
                                    </div>

                                    {
                                        ! photo?.url &&
                                        <div className="lg:col-span-3 col-span-6">
                                            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                                                Foto
                                            </label>
                                            <input
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                aria-describedby="file_input_help"
                                                id="photo"
                                                name="photo"
                                                type="file"
                                                accept='image/*'
                                                onChange={e => setData('photo', e.target.value)}
                                            />

                                            <ErrorForm error={errors.photo} />
                                        </div>
                                    }

                                    {
                                        ! photo?.url_nsfw && data?.nsfw == '1' && <div className="lg:col-span-3 col-span-6">
                                            <label htmlFor="photo_nsfw" className="block text-sm font-medium text-gray-700">
                                                Versión  NSFW
                                            </label>
                                            <input
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                aria-describedby="file_input_help"
                                                id="photo_nsfw"
                                                name="photo_nsfw"
                                                type="file"
                                                accept='image/*'
                                                onChange={e => setData('photo_nsfw', e.target.value)}
                                            />

                                            <ErrorForm error={errors.photo_nsfw} />
                                        </div>
                                    }

                                    <div className="col-span-6">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            id="description"
                                            cols="30"
                                            rows="10"
                                            // defaultValue={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                        ></textarea>
                                        <ErrorForm error={errors.description} />
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
                            className="absolute left-0 bottom-0 px-6 py-3 text-sm"
                        >
                            <input type="hidden" name="_method" value="DELETE" />
                            <input type="hidden" name="_token" value={csrf} />

                            <button type="submit" className="rounded-md">
                                Eliminar
                            </button>
                        </form>
                    }
                </div>
            </div>

            {
                action === 'update' && 
                <div className='grid grid-cols-2'>
                    {
                        photo?.url &&
                        <div className='px-4 py-5 bg-white sm:p-6'>
                            <p className='font-bold text-center my-4'>
                                Foto
                            </p>
                            <picture>
                                <source srcSet={photo.url} type="image/webp" />
                                <img className='w-full block' src={photo.url} alt={photo.title} />
                            </picture>

                            <form
                                action="#"
                                method="POST"
                                onSubmit={submitDestroyPhoto}
                                className="block text-center px-6 py-3 text-sm"
                            >
                                <input type="hidden" name="name" value="url" />
                                <input type="hidden" name="_method" value="DELETE" />
                                <input type="hidden" name="_token" value={csrf} />

                                <button type="submit" className="rounded-md">
                                    Eliminar foto
                                </button>
                            </form>
                        </div>
                    }

                    {
                        photo?.url_nsfw && photo?.nsfw == 1 &&
                        <div className='px-4 py-5 bg-white sm:p-6'>
                            <p className='font-bold text-center my-4'>
                                Versión NSFW
                            </p>
                            <picture>
                                <source srcSet={photo.url_nsfw} type="image/webp" />
                                <img className='w-full block' src={photo.url_nsfw} alt={photo.title} />
                            </picture>

                            <form
                                action="#"
                                method="POST"
                                onSubmit={submitDestroyPhoto}
                                className="block text-center px-6 py-3 text-sm"
                            >
                                <input type="hidden" name="name" value="url_nsfw" />
                                <input type="hidden" name="_method" value="DELETE" />
                                <input type="hidden" name="_token" value={csrf} />

                                <button type="submit" className="rounded-md">
                                    Eliminar foto
                                </button>
                            </form>
                        </div>
                    }
                </div>
            }

        </>
    );
}
