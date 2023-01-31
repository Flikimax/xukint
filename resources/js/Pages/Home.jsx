import React from 'react';

import Header from '@/Components/Web/Header';
import Categories from '@/Components/Web/Categories';
import Photos from '@/Components/Web/Photos';

export default function Home(props) {
    return (
        <>
            <Header props={props} title="Inicio" />
            <Categories categories={props.categories} active={props?.active} />
            <Photos photos={props.photos} auth={props.auth} />
        </>
    );
}