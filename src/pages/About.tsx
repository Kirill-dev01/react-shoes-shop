import React from 'react';
import Banner from '../components/Banner';

export default function About() {
    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <Banner />
                    <section className="about">
                        <h2 className="text-center">О магазине</h2>
                        <p>В магазине Bosa Noga вы найдете более 100 000 пар обуви по самым привлекательным ценам.</p>
                        <p>
                            Вы можете примерить обувь перед покупкой и убедиться в ее качестве.
                            Все товары, представленные в нашем каталоге, имеют сертификаты качества.
                            Мы напрямую сотрудничаем с производителями, поэтому гарантируем вам самые низкие цены.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}