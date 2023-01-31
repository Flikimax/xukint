import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function HeaderCreateEdit(props) {
    const { back, newItem } = props;

    return (
        <div className="flex justify-between flex-col md:flex-row my-4">
            <div className="flex">
                <div className="shrink-0 flex items-center text-sm font-medium">
                    <button className="bg-black text-white rounded-md">
                        <Link
                            className="block py-2 px-4"
                            href={route(back.route)}
                        >
                            { back.text }
                        </Link>
                    </button>
                </div>
            </div>
            {
                newItem &&
                <div className="flex md:items-center justify-between my-6 md:my-0">
                    <div className="shrink-0 flex items-center text-sm font-medium">
                        <button className="bg-black text-white rounded-md">
                            <Link
                                className="block py-2 px-4"
                                href={route(newItem.route)}
                            >
                                { newItem.text }
                            </Link>
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}
