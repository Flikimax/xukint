import { Link, Head } from '@inertiajs/inertia-react';

export default function Header({props, title}) {
    const appName = "Xukint";

    return (
        <>
            { props?.title && <Head title={props.title} /> }

            <div className="relative flex items-top h-14 justify-center bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0 drop-shadow-lg">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <>
                            <Link href={route('dashboard')} className="text-sm text-gray-700 dark:text-gray-500">
                                Dashboard
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 dark:text-gray-500">
                                Iniciar sesión
                            </Link>
                            
                            <Link href={route('register')} className="ml-4 text-sm text-gray-700 dark:text-gray-500">
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <div className="shadow justify-center text-center">
                <div className="px-6 py-4 center">

                    <Link href={route('home')} className="inline-block text-center">
                        <img
                            src="/assets/img/Logo.svg"
                            alt="Logo"
                            className="lg-h-12 lg-12"
                        />  

                        <h1 className="font-bold">
                            { appName }
                        </h1>
                    </Link>
                </div>
            </div>
        </>
    )
}