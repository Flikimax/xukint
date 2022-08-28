import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
 
export default function SubHeader(props) {
    const title = props?.title ? props.title : 'Dashboard';

    return (
        <>
        <Head title={title} />
        
        <div className='flex justify-between'>
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                {title}
            </h2>
            {
                props?.route && props?.route?.link && props?.route?.text &&
                <Link href={props.route.link} className="">
                    <button className='px-3 bg-black text-white rounded'>
                        { props.route.text }
                    </button>
                </Link>
            }
        </div>
        </>
    );
}
