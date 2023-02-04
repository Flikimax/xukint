import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-500 leading-normal">
                ¿Ha olvidado su contraseña? No se preocupe.
                <br />
                <br />
                Indíquenos su dirección de correo electrónico y le enviaremos un enlace para restablecer la contraseña que le permitirá elegir una nueva.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    type="text"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    handleChange={onHandleChange}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="w-full !block text-center" processing={processing}>
                        Restablecer contraseña
                    </PrimaryButton>
                </div>
            </form>

            <hr className='mt-4' />

            <div className="flex items-center flex-col md:flex-row justify-between mt-4">
                <Link
                    href={route('login')}
                    className="my-2 text-sm text-gray-600 hover:text-gray-900"
                >
                    Iniciar sesión
                </Link>

                <Link
                    href={route('register')}
                    className="my-2 text-sm text-gray-600 hover:text-gray-900"
                >
                    Registrarse
                </Link>
            </div>
        </GuestLayout>
    );
}
