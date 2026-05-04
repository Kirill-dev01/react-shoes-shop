import React from 'react';
import Banner from '../components/Banner';
import TopSales from '../components/TopSales';
import Catalog from '../components/Catalog';

export default function Home() {
    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <Banner />
                    <TopSales />
                    <Catalog />
                </div>
            </div>
        </main>
    );
}