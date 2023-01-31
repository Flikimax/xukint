import React from 'react';

export default function ErrorForm(props) {
    const { error } = props;
    return (
        <>
            {
                error &&
                <div className="error-form my-2 text-red-500">
                    {error}
                </div>
            }
        </>
    )
}
