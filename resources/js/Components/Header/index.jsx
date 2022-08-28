import { Link, Head } from '@inertiajs/inertia-react';

export default function Header(props) {
    const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Xukint';

    return (
        <>
            { props?.title && <Head title={props.title} /> }
            
            <div className="shadow justify-center text-center">
                <div className="px-6 py-4 center">

                    <Link href={route('home')} className="inline-block text-center">
                        <img
                            src="/images/Logo.svg"
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