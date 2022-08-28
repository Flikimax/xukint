import React from 'react';

import Header from '@/Components/Header';
import Categories from '@/Components/Categories';
import Photos from '@/Components/Photos';

export default function Home(props) {
    return (
        <>
            <Header />
            <Categories categories={props.categories} active={props?.active} />
            <Photos photos={props.photos}/>
        </>
    );
}
