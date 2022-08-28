import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Dashboard from '@/Layouts/Dashboard';
import SubHeader from '@/Components/Dashboard/SubHeader';
import Pagination from '@/Components/Pagination';
import { Link } from '@inertiajs/inertia-react';

import '@/Components/Photos/style.css';
 
export default function Index(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<SubHeader title={props?.title} route={props?.routeTo} />}
        >
            
            <Dashboard>

                <div className='list grid lg:grid-cols-4 grid-cols-2 '>
                    {
                        props.list.data.map(photo => (
                                <div className={`grid-item relative photo-${photo.id}`} key={photo.id} >
                                    
                                    <Link href={route('dashboard.photos.edit', [photo.id])} >
                                        <div className="overlay w-full h-full absolute lg:bg-black hover:lg:opacity-60 opacity-0 transition ease-in-out delay-400 top-0 left-0"></div>
                                        
                                        <picture>
                                            <source srcSet={photo.url} type="image/webp" />
                                            <img className='w-full block' src={photo.url} alt={photo.tile} />
                                        </picture>
                                    </Link>

                                </div>
                            ) 
                        )
                    }
                </div>

                <Pagination links={props.list?.links} />
            </Dashboard>
        </Authenticated>
    );
}
