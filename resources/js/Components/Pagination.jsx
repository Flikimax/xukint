import { Link } from '@inertiajs/inertia-react';

export default function Pagination( props ) {
    const links = props?.links ? props?.links : null;
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

                                const params = new URLSearchParams( new URL(link.url).search )
                                const isActiveLi = ( link.active ) 
                                    ? 'active z-10 bg-black border-white text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium' 
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium';

                                return (
                                    <Link 
                                        className={`${isActiveLi}`} key={key}
                                        href={`?page=${params.get('page')}`}  
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

















// <!-- This example requires Tailwind CSS v2.0+ -->
// <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//   <div className="flex-1 flex justify-between sm:hidden">
//     <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
//     <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
//   </div>
//   <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//     <div>
//       <p className="text-sm text-gray-700">
//         Showing
//         <span className="font-medium">1</span>
//         to
//         <span className="font-medium">10</span>
//         of
//         <span className="font-medium">97</span>
//         results
//       </p>
//     </div>
//     <div>
//       <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//         <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//           <span className="sr-only">Previous</span>
//           <!-- Heroicon name: solid/chevron-left -->
//           <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//             <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
//           </svg>
//         </a>
//         <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
//         <a href="#" aria-current="page" className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 1 </a>
//         <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 2 </a>
//         <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 3 </a>
//         <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>
//         <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 8 </a>
//         <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 9 </a>
//         <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 10 </a>
//         <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//           <span className="sr-only">Next</span>
//           <!-- Heroicon name: solid/chevron-right -->
//           <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//             <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
//           </svg>
//         </a>
//       </nav>
//     </div>
//   </div>
// </div>


