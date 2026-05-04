import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import Banner from '../components/Banner';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

// Интерфейс для детальной информации о товаре
interface ProductDetails {
    id: number;
    title: string;
    images: string[];
    sku: string;
    manufacturer: string;
    color: string;
    material: string;
    reason: string;
    season: string;
    price: number;
    sizes: Array<{ size: string; available: boolean }>;
}

export default function Product() {
    const { id } = useParams<{ id: string }>(); // Достаем ID из адресной строки
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Состояния для выбора размера и количества
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        api.getItemById(id)
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Ошибка загрузки товара:', err);
                setError(true);
                setLoading(false);
            });
    }, [id]);

    // Обработчики для кнопок + и -
    const increaseQuantity = () => {
        if (quantity < 10) setQuantity(q => q + 1); // Ограничим максимум 10 штуками
    };
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(q => q - 1);
    };

    const handleAddToCart = () => {
        if (!product || !selectedSize) return;

        // Отправляем товар в Redux!
        dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            count: quantity,
            size: selectedSize
        }));

        // И переходим в корзину
        navigate('/cart.html');
    };

    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <Banner />

                    {loading ? (
                        <div className="preloader">
                            <span></span><span></span><span></span><span></span>
                        </div>
                    ) : error || !product ? (
                        <div className="alert alert-danger text-center">Ошибка загрузки товара.</div>
                    ) : (
                        <section className="catalog-item">
                            <h2 className="text-center">{product.title}</h2>
                            <div className="row">
                                <div className="col-5">
                                    <img src={product.images[0]} className="img-fluid" alt={product.title} />
                                </div>
                                <div className="col-7">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr><td>Артикул</td><td>{product.sku}</td></tr>
                                            <tr><td>Производитель</td><td>{product.manufacturer}</td></tr>
                                            <tr><td>Цвет</td><td>{product.color}</td></tr>
                                            <tr><td>Материалы</td><td>{product.material}</td></tr>
                                            <tr><td>Сезон</td><td>{product.season}</td></tr>
                                            <tr><td>Повод</td><td>{product.reason}</td></tr>
                                        </tbody>
                                    </table>

                                    <div className="text-center">
                                        {/* Размеры */}
                                        <p>
                                            Размеры в наличии:
                                            {product.sizes
                                                .filter(s => s.available)
                                                .map(s => (
                                                    <span
                                                        key={s.size}
                                                        className={`catalog-item-size ${selectedSize === s.size ? 'selected' : ''}`}
                                                        onClick={() => setSelectedSize(s.size)}
                                                    >
                                                        {s.size}
                                                    </span>
                                                ))}
                                        </p>

                                        {/* Количество (показываем только если есть доступные размеры) */}
                                        {product.sizes.some(s => s.available) && (
                                            <p>Количество:
                                                <span className="btn-group btn-group-sm pl-2">
                                                    <button className="btn btn-secondary" onClick={decreaseQuantity}>-</button>
                                                    <span className="btn btn-outline-primary">{quantity}</span>
                                                    <button className="btn btn-secondary" onClick={increaseQuantity}>+</button>
                                                </span>
                                            </p>
                                        )}
                                    </div>

                                    {/* Кнопка В корзину (активна только если выбран размер) */}
                                    {product.sizes.some(s => s.available) && (
                                        <button
                                            className="btn btn-danger btn-block btn-lg"
                                            disabled={!selectedSize} // Блокируем, если размер не выбран
                                            onClick={handleAddToCart}
                                        >
                                            В корзину
                                        </button>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
}