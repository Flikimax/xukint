import React, { useState } from 'react';
import OpenEye from "@/Components/Dashboard/InputPassword/OpenEye";
import ClosedEye from "@/Components/Dashboard/InputPassword/ClosedEye";

export default function Index(props) {
    const { id, name, autoComplete, defaultValue, setData } = props;
    const [componentEye, setComponentEye] = useState(<OpenEye />);

    const changeEye = (event) => {
        const element = event.target.parentNode;
        const eye = element.dataset.eye ?? 'open';
        const input = document.getElementById(element.dataset.input);

        if ( eye === 'open' ) {
            element.setAttribute('data-eye', 'closed');
            input.setAttribute('type', 'text');
            setComponentEye(<ClosedEye />);
        } else {
            element.setAttribute('data-eye', 'open');
            input.setAttribute('type', 'password');
            setComponentEye(<OpenEye />);
        }
    };

    return (
        <>
            <input
                type="password"
                id={id}
                name={name}
                autoComplete={autoComplete}
                defaultValue={defaultValue}
                className="block w-full flex-1 rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={e => setData(name, e.target.value)}
            />

            <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                <button type="button" onClick={changeEye} data-input={name}>
                    { componentEye }
                </button>
            </span>
        </>
    )
}
