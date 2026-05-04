// Базовый URL запущенного бекенда
const API_URL = 'http://localhost:7070/api';

// Функция-помощник для обработки ответов
const fetchJson = async (url: string) => {
    const response = await fetch(`${API_URL}${url}`);
    if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    return response.json();
};

export const api = {
    // Получить хиты продаж
    getTopSales: () => fetchJson('/top-sales'),
    // Получить категории
    getCategories: () => fetchJson('/categories'),
    // Получить товары каталога (с параметрами фильтрации)
    getItems: (params: URLSearchParams) => fetchJson(`/items?${params}`),
    // Получить детали товара по ID
    getItemById: (id: string) => fetchJson(`/items/${id}`),
    // Отправить заказ
    postOrder: (order: any) => fetchJson('/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    })
};