import React from "react";
import { Link } from '@inertiajs/inertia-react';
import Pagination from "@/Components/Table/Pagination";

export default function Table( props ) {
    const { columns, hidden, actions, items, callback } = props;

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 text-gray-400">
                <thead
                    className="text-xs  uppercase  text-black font-bold"
                >
                    <tr>
                        {
                            Object.keys(columns).map((column, index) => {
                                const classes = (hidden.includes(column)) ? 'hidden md:table-cell' : '';
                                return (
                                    <th scope="col" className={`py-3 px-6 ${classes}`} key={index}>
                                        { columns[`${column}`] }
                                    </th>
                                )
                            })
                        }

                        {
                            Object.keys(actions).map((action, index) => {
                                if ( ! actions[action].text ) {
                                    return false;
                                }

                                return (
                                    <th scope="col" className="py-3 px-6" key={index}>
                                        <span className="sr-only">
                                            { actions[action].text }
                                        </span>
                                    </th>
                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        items.data.map(item => {
                            return (
                                <tr
                                    key={item.id}
                                    className="bg-white border-b border-gray-900 hover:bg-gray-200 "
                                >
                                    {
                                        Object.keys(columns).map((column, index) => {
                                            if ( ! item[`${column}`] ) {
                                                return false;
                                            }

                                            const classes = (hidden.includes(column)) ? 'hidden md:table-cell' : '';
                                            let newItem = item[`${column}`];
                                            if ( callback[column] ) {
                                                const results = callback[column](item);
                                                newItem = results.join(', ');
                                            }

                                            return (
                                                <th scope="row" className={`py-4 px-6 font-medium text-gray-900 whitespace-nowrap ${classes}`} key={index}>
                                                    { newItem }
                                                </th>
                                            )
                                        })
                                    }

                                    {
                                        Object.keys(actions).map((action, index) => {
                                            if ( ! actions[action].text || ! actions[action].route ) {
                                                return false;
                                            }

                                            return (
                                                <td className="py-4 px-6 text-right" key={index}>
                                                    <Link
                                                        href={ route(actions[action].route, item.id) }
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        { actions[action].text }
                                                    </Link>
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

            <Pagination links={items?.links} />
        </div>
    )
}
