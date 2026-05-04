import React from 'react';
import Banner from '../components/Banner';
import CatalogComponent from '../components/Catalog';

export default function Catalog() {
    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <Banner />
                    <CatalogComponent />
                </div>
            </div>
        </main>
    );
}