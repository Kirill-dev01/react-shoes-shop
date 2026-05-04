import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { NavLink } from 'react-router-dom'; // Понадобится для ссылки "Заказать"

// Описываем структуру товара, которую возвращает сервер
export interface Item {
    id: number;
    category: number;
    title: string;
    price: number;
    images: string[];
}

export default function TopSales() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Делаем запрос при монтировании компонента
        api.getTopSales()
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Ошибка загрузки хитов продаж:', err);
                setError(true);
                setLoading(false);
            });
    }, []);

    // Если произошла ошибка
    if (error) {
        return (
            <section className="top-sales">
                <h2 className="text-center">Хиты продаж!</h2>
                <div className="alert alert-danger">Ошибка загрузки. Попробуйте позже.</div>
            </section>
        );
    }

    // Если сервер вернул пустой массив (хитов нет) - по заданию скрываем блок
    if (!loading && items.length === 0) {
        return null;
    }

    return (
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>

            {/* Показываем лоадер, пока грузятся данные */}
            {loading ? (
                <div className="preloader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            ) : (
                // Когда загрузились - рисуем карточки товаров
                <div className="row">
                    {items.map(item => (
                        <div className="col-4" key={item.id}>
                            {/* Добавили класс h-100, чтобы карточка тянулась на всю высоту колонки */}
                            <div className="card catalog-item-card h-100">

                                {/* Добавили стили для картинки, чтобы она всегда была одинаковой высоты и не сплющивалась */}
                                <img
                                    src={item.images[0]}
                                    className="card-img-top img-fluid"
                                    alt={item.title}
                                    style={{ height: '250px', objectFit: 'contain' }}
                                />

                                {/* Сделали тело карточки flex-контейнером */}
                                <div className="card-body d-flex flex-column">
                                    <p className="card-text">{item.title}</p>
                                    <p className="card-text">{item.price} руб.</p>

                                    {/* Добавили mt-auto (margin-top: auto), чтобы кнопка всегда прижималась к самому низу */}
                                    <div className="mt-auto">
                                        <NavLink to={`/catalog/${item.id}.html`} className="btn btn-outline-primary">Заказать</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}