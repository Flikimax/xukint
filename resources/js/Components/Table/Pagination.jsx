import { Link } from '@inertiajs/inertia-react';

export default function Pagination( props ) {
    const links = props?.links ? props?.links : null;

    let queryString = window.location.search;
    queryString = queryString.replace('?', '&');

    return (
        <>
            {
                links && (links[0]?.url != null || links[ links.length - 1 ]?.url != null) &&
                <div className='pagination text-center py-6'>
                    <nav className="pagination relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {
                            links.map((link, key) => {
                                if ( ! link.url ) {
                                    return
                                }

                                const url = new URL(link.url + queryString);
                                const params = new URLSearchParams( new URL(link.url).search );
                                url.searchParams.set('page', params.get('page') );

                                const isActiveLi = ( link.active )
                                    ? 'active z-10 bg-black border-white text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium';

                                return (
                                    <Link
                                        className={`${isActiveLi}`} key={key}
                                        href={`${url}`}
                                        aria-current="page"
                                        dangerouslySetInnerHTML={{__html: link.label}}
                                    ></Link>
                                )
                            })
                        }
                    </nav>
                </div>
            }
        </>
    )
}
