import React, { useState } from 'react';

export default function Dashboard({ auth, header, children }) {

    return (    
        <div className="py-12">
            <div className="max-w-7xl mx-auto bg-white border-b border-gray-200 bg-white sm:rounded-lg shadow-sm sm:rounded-lg">
                <div className="overflow-hidden rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
