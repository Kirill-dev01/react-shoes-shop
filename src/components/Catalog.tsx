import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Item } from './TopSales';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setSearchQuery } from '../store/searchSlice';

interface Category {
    id: number;
    title: string;
}

export default function Catalog() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [activeCategory, setActiveCategory] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const location = useLocation();
    const isCatalogPage = location.pathname === '/catalog.html';

    const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
    const dispatch = useDispatch();

    // Загружаем категории
    useEffect(() => {
        api.getCategories()
            .then(data => setCategories(data))
            .catch(err => console.error('Ошибка загрузки категорий:', err));
    }, []);

    // Загружаем товары
    useEffect(() => {
        setLoading(true);
        setError(false);
        setHasMore(true);

        const params = new URLSearchParams();
        if (activeCategory !== 0) {
            params.append('categoryId', activeCategory.toString());
        }
        if (searchQuery.trim() !== '') {
            params.append('q', searchQuery);
        }

        api.getItems(params)
            .then(data => {
                setItems(data);
                if (data.length < 6) setHasMore(false);
                setLoading(false);
            })
            .catch(err => {
                console.error('Ошибка загрузки товаров:', err);
                setError(true);
                setLoading(false);
            });
    }, [activeCategory, searchQuery]);

    // Функция для кнопки "Загрузить ещё"
    const handleLoadMore = () => {
        setLoadingMore(true);

        const params = new URLSearchParams();
        if (activeCategory !== 0) params.append('categoryId', activeCategory.toString());
        if (searchQuery.trim() !== '') params.append('q', searchQuery);
        params.append('offset', items.length.toString());

        api.getItems(params)
            .then(data => {
                setItems(prevItems => [...prevItems, ...data]);
                if (data.length < 6) setHasMore(false);
                setLoadingMore(false);
            })
            .catch(err => {
                console.error('Ошибка загрузки дополнительных товаров:', err);
                setLoadingMore(false);
            });
    };

    const handleCategoryClick = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        setActiveCategory(id);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>

            {isCatalogPage && (
                <form className="catalog-search-form form-inline" onSubmit={handleSearchSubmit}>
                    <input
                        className="form-control"
                        placeholder="Поиск"
                        value={searchQuery}
                        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    />
                </form>
            )}

            {/* Меню категорий */}
            <ul className="catalog-categories nav justify-content-center">
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeCategory === 0 ? 'active' : ''}`}
                        href="#"
                        onClick={(e) => handleCategoryClick(e, 0)}
                    >
                        Все
                    </a>
                </li>
                {categories.map(category => (
                    <li className="nav-item" key={category.id}>
                        <a
                            className={`nav-link ${activeCategory === category.id ? 'active' : ''}`}
                            href="#"
                            onClick={(e) => handleCategoryClick(e, category.id)}
                        >
                            {category.title}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Отрисовка товаров или лоадера */}
            {loading ? (
                <div className="preloader">
                    <span></span><span></span><span></span><span></span>
                </div>
            ) : error ? (
                <div className="alert alert-danger text-center">Ошибка загрузки каталога.</div>
            ) : items.length === 0 ? (
                <div className="text-center my-5">Товары не найдены</div>
            ) : (
                <>
                    <div className="row">
                        {items.map(item => (
                            <div className="col-4" key={item.id}>
                                <div className="card catalog-item-card h-100">
                                    <img
                                        src={item.images[0]}
                                        className="card-img-top img-fluid"
                                        alt={item.title}
                                        style={{ height: '250px', objectFit: 'contain' }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <p className="card-text">{item.title}</p>
                                        <p className="card-text">{item.price} руб.</p>
                                        <div className="mt-auto">
                                            <NavLink to={`/catalog/${item.id}.html`} className="btn btn-outline-primary">Заказать</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {hasMore && (
                        <div className="text-center">
                            <button
                                className="btn btn-outline-primary"
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                            >
                                {loadingMore ? 'Загрузка...' : 'Загрузить ещё'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}