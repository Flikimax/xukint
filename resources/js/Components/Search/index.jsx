import React from 'react';
import {useForm} from "@inertiajs/inertia-react";

export default function Search(props) {
    const { route, formData } = props;
    const { data, setData, get, errors } = useForm({
        [formData.input.name]: formData.input.value ?? ''
    });

    function submit(e) {
        e.preventDefault();
        get(route)
    }

    return (
        <form onSubmit={submit} method="GET">
            <input
                className="border-b-2 border-b-gray-300 focus-visible:border-transparent p-2 focus:border-transparent"
                list="items"
                name={ formData.input.name }
                id="search"
                placeholder="Buscar"
                value={ data[formData.input.name] }
                onChange={e => setData(formData.input.name, e.target.value)}
            />
            {errors[formData.input.name] && <div>{errors[formData.input.name]}</div>}
        </form>
    );
}
