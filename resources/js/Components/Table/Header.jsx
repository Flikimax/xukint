import Search from "@/Components/Search";


export default function Header(props) {
    const { label, action, search } = props;

    return (
        <div className="flex justify-between flex-col-reverse md:flex-row my-4">
            <div className="flex">
                <div className="shrink-0 flex items-center text-sm font-medium">
                    { label }
                </div>
            </div>

            <div className="flex md:items-center justify-between my-6 md:my-0">
                <div className="relative">
                    { search && <Search {...search} /> }
                </div>

                {
                    action && action?.url &&
                    <div className="ml-3 relative items-start">
                        <button className="bg-black text-white rounded-md">
                            <a
                                className="block py-2 px-4"
                                href={route(action.url)}
                            >
                                { action.label ?? 'Acción' }
                            </a>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
