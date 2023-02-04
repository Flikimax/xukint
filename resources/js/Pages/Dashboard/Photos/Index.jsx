import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/inertia-react';

import Header from "@/Components/Table/Header";
import Pagination from "@/Components/Table/Pagination";
import { Link } from '@inertiajs/inertia-react';

export default function Index(props) {
    const title = 'Fotos';
    const { photos, categories, search, filters } = props;
    const { data, setData, get, errors } = useForm(filters);

    const header = {
        label: `${photos.total} fotos`,
        search: {
            route: "/dashboard/photos",
            formData: {
                input: {
                    name: "title",
                    value: search
                }
            }
        },
        action: {
            label: "Agregar Nuevo",
            url: 'dashboard.photos.create'
        }
    };

    function changeFilter(event) {
        setData(event.target.name, event.target.value);
    }

    function submit(event) {
        event.preventDefault();
        get( 'photos' );
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

                            <Header {...header} />

                            <div className="my-6 text-sm font-medium">
                                <form
                                    onSubmit={submit}
                                    id="photoFilters"
                                    className="grid grid-cols-1 lg:grid-cols-6 gap-4"
                                    method="GET"
                                >
                                    <div className="form-container">
                                        <label className="w-full block my-2 h-6" htmlFor="nsfw">
                                            NSFW
                                        </label>
                                        <select
                                            className="block w-full h-10 rounded-md focus-visible:border-transparent p-2 focus:border-transparent"
                                            name="nsfw"
                                            id="nsfw"
                                            defaultValue={ data.nsfw }
                                            onChange={changeFilter}
                                        >
                                            <option value="">Todas</option>
                                            <option value="0">No NSFW</option>
                                            <option value="1">NSFW</option>
                                        </select>
                                    </div>

                                    <div className="form-container col-span-1 lg:col-span-4">
                                        <label className="w-full block my-2 h-6" htmlFor="nsfw">
                                            Categoría
                                        </label>
                                        <select
                                            className="block w-full h-10 rounded-md focus-visible:border-transparent p-2 focus:border-transparent"
                                            name="category"
                                            id="category"
                                            defaultValue={ data.category }
                                            onChange={changeFilter}
                                        >
                                            <option value="">Todas</option>

                                            {
                                                categories && categories.map(category => (
                                                    <option
                                                        key={category.id}
                                                        value={category.slug}
                                                    >
                                                        { category.name }
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="flex items-end">
                                        <button
                                            className="h-10 w-full bg-black text-white rounded-md"
                                            type="submit"
                                        >
                                            Filtrar
                                        </button>
                                    </div>

                                </form>
                            </div>


                            <div className='list grid lg:grid-cols-4 grid-cols-2 '>
                                {
                                    photos?.data.length > 0 && photos.data.map(photo => {
                                        const src = photo.url ? photo.url : '/assets/img/photoless.jpg';
                                        return (
                                            <div className={`grid-item relative photo-${photo.id}`} key={photo.id} >
                                                <Link href={route('dashboard.photos.edit', [photo])} >
                                                    <div className="overlay w-full h-full absolute lg:bg-black hover:lg:opacity-60 opacity-0 transition ease-in-out delay-400 top-0 left-0"></div>
                                                    <picture>
                                                        <source srcSet={src} type="image/webp" />
                                                        <img className='w-full h-full block object-cover' src={src} alt={photo.tile} />
                                                    </picture>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <Pagination links={photos?.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
