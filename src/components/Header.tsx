import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setSearchQuery } from '../store/searchSlice';

export default function Header() {
    const [isSearchInvisible, setIsSearchInvisible] = useState(true);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    // Достаем текст поиска
    const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
    // Достаем список товаров в корзине
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const toggleSearch = () => {
        if (!isSearchInvisible && searchQuery.trim() !== '') {
            navigate('/catalog.html');
        } else {
            setIsSearchInvisible(!isSearchInvisible);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            navigate('/catalog.html');
        }
    };

    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <NavLink className="navbar-brand" to="/">
                            <img src="/img/header-logo.png" alt="Bosa Noga" />
                        </NavLink>
                        <div className="collapse navbar-collapse" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">Главная</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/catalog.html">Каталог</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about.html">О магазине</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contacts.html">Контакты</NavLink>
                                </li>
                            </ul>

                            <div>
                                <div className="header-controls-pics">
                                    <div
                                        data-id="search-expander"
                                        className="header-controls-pic header-controls-search"
                                        onClick={toggleSearch}
                                    ></div>

                                    {/* Иконка корзины с динамическим счетчиком */}
                                    <div
                                        className="header-controls-pic header-controls-cart"
                                        onClick={() => navigate('/cart.html')}
                                    >
                                        {/* Показываем кружочек, только если в корзине есть товары */}
                                        {cartItems.length > 0 && (
                                            <div className="header-controls-cart-full">
                                                {cartItems.length}
                                            </div>
                                        )}
                                        <div className="header-controls-cart-menu"></div>
                                    </div>
                                </div>

                                <form
                                    data-id="search-form"
                                    className={`header-controls-search-form form-inline ${isSearchInvisible ? 'invisible' : ''}`}
                                    onSubmit={handleSearchSubmit}
                                >
                                    <input
                                        className="form-control"
                                        placeholder="Поиск"
                                        value={searchQuery}
                                        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                                    />
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}