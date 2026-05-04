import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { api } from '../api';
import Banner from '../components/Banner';
import { NavLink } from 'react-router-dom';

export default function Cart() {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    // Состояния для формы оформления заказа
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [agreement, setAgreement] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    // Считаем общую стоимость
    const totalSum = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

    // Удаление товара из корзины
    const handleDelete = (id: number, size: string) => {
        dispatch(removeFromCart({ id, size }));
    };

    // Оформление заказа
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone || !address || !agreement || cartItems.length === 0) return;

        setLoading(true);
        setError(false);

        // Формируем объект заказа по требованиям API
        const order = {
            owner: { phone, address },
            items: cartItems.map(item => ({
                id: item.id,
                price: item.price,
                count: item.count,
            })),
        };

        api.postOrder(order)
            .then(() => {
                setSuccess(true);
                setLoading(false);
                dispatch(clearCart()); // Очищаем корзину после успешного заказа
                setPhone('');
                setAddress('');
                setAgreement(false);
            })
            .catch(err => {
                console.error('Ошибка при оформлении заказа:', err);
                setError(true);
                setLoading(false);
            });
    };

    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <Banner />

                    <section className="cart">
                        <h2 className="text-center">Корзина</h2>

                        {/* Если заказ успешно оформлен */}
                        {success ? (
                            <div className="alert alert-success text-center">
                                <h4 className="alert-heading">Заказ успешно оформлен!</h4>
                                <p>Спасибо за покупку. Менеджер свяжется с вами в ближайшее время.</p>
                                <NavLink to="/" className="btn btn-outline-success mt-3">Вернуться на главную</NavLink>
                            </div>
                        ) : (
                            <>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Название</th>
                                            <th scope="col">Размер</th>
                                            <th scope="col">Кол-во</th>
                                            <th scope="col">Стоимость</th>
                                            <th scope="col">Итого</th>
                                            <th scope="col">Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <tr key={`${item.id}-${item.size}`}>
                                                <td scope="row">{index + 1}</td>
                                                <td><NavLink to={`/catalog/${item.id}.html`}>{item.title}</NavLink></td>
                                                <td>{item.size}</td>
                                                <td>{item.count}</td>
                                                <td>{item.price} руб.</td>
                                                <td>{item.price * item.count} руб.</td>
                                                <td>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => handleDelete(item.id, item.size)}
                                                    >
                                                        Удалить
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {cartItems.length === 0 && (
                                            <tr>
                                                <td colSpan={7} className="text-center">Ваша корзина пуста</td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td colSpan={5} className="text-right">Общая стоимость</td>
                                            <td>{totalSum} руб.</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* Форма оформления заказа (показываем только если в корзине есть товары) */}
                                {cartItems.length > 0 && (
                                    <section className="order">
                                        <h2 className="text-center">Оформить заказ</h2>
                                        <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
                                            <form className="card-body" onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="phone">Телефон</label>
                                                    <input
                                                        className="form-control"
                                                        id="phone"
                                                        placeholder="Ваш телефон"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="address">Адрес доставки</label>
                                                    <input
                                                        className="form-control"
                                                        id="address"
                                                        placeholder="Адрес доставки"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="agreement"
                                                        checked={agreement}
                                                        onChange={(e) => setAgreement(e.target.checked)}
                                                        required
                                                    />
                                                    <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                                                </div>

                                                {error && <div className="alert alert-danger">Произошла ошибка. Попробуйте еще раз.</div>}

                                                <button
                                                    type="submit"
                                                    className="btn btn-outline-secondary"
                                                    disabled={loading || !agreement || !phone || !address}
                                                >
                                                    {loading ? 'Отправка...' : 'Оформить'}
                                                </button>
                                            </form>
                                        </div>
                                    </section>
                                )}
                            </>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}