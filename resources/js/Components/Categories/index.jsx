import { Link } from '@inertiajs/inertia-react';

export default function Categories( props ) {
    const slugActived = props.active ? props.active : null;
    const toggleMenu = () => {
        const menu = document.getElementById("mobile-menu");
        if ( menu ) {
            menu.classList.toggle("hidden");
        }
    }

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 mt-1">
            <h4 className='text-center mb-4 hidden lg:block'>
                Categories
            </h4>
        
            <div className="container flex flex-wrap justify-center items-center mx-auto">
                <button onClick={ toggleMenu } data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 mb-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>

                <div className="hidden w-full lg:block lg:w-auto" id="mobile-menu">
                    <ul className="flex flex-row flex-wrap justify-center">

                        <li className={`mx-1.5 ${ slugActived ?? 'active' }`}>
                            <Link 
                                href="/"
                                className={`${ slugActived?? 'bg-black text-white' } block py-1 px-2 my-1 rounded-md shadow hover:bg-black hover:text-white`}
                            >
                                All
                            </Link>
                        </li>

                        {
                            props.categories.map(category  => {
                                const isActiveLi = ( category.slug === slugActived ) ? 'active' : '';
                                const isActiveA = ( category.slug === slugActived ) ? 'bg-black text-white' : 'text-gray-600';
                                return (
                                    <li className={`mx-1.5 ${isActiveLi}`} key={category.id}>
                                        <Link 
                                            href={`/${encodeURIComponent(category.slug)}`} 
                                            className={`${isActiveA} block py-1 px-2 my-1 rounded-md shadow hover:bg-black hover:text-white`}
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

