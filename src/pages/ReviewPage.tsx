import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';

const ReviewPage: React.FC = () => {
    const [message, setMessage] = useState('');
    const [stars, setStars] = useState(5);
    const [email, setEmail] = useState(''); // Email пользователя, которому отправляем отзыв
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { isLoggedIn } = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Если пользователь не авторизован
        if (!isLoggedIn) {
            setError('Вы должны войти в систему, чтобы оставить отзыв.');
            return;
        }

        // Проверка данных
        if (!email) {
            setError('Введите email пользователя.');
            return;
        }
        if (!message.trim()) {
            setError('Сообщение отзыва не может быть пустым.');
            return;
        }
        if (stars < 1 || stars > 5) {
            setError('Рейтинг должен быть от 1 до 5.');
            return;
        }

        try {
            // Очистить сообщения
            setError(null);
            setSuccess(null);

            // Отправка данных на сервер
            const response = await axios.patch(
                `/api/auth/user/${email}`,
                { message, stars },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Передача токена
                    },
                }
            );

            // Если успешный запрос
            setSuccess('Ваш отзыв успешно отправлен!');
            setMessage('');
            setStars(5);
            setEmail('');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Произошла ошибка при отправке отзыва.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Оставить отзыв</h1>

            {/* Если ошибка */}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* Если успех */}
            {success && <div className="text-green-500 mb-4">{success}</div>}

            <form onSubmit={handleSubmit}>
                {/* Поле для ввода email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email пользователя:
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 p-4 rounded-md"
                        placeholder="Введите email пользователя..."
                    />
                </div>

                {/* Поле для ввода сообщения */}
                <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Ваш отзыв:
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full border border-gray-300 p-4 rounded-md"
                        rows={5}
                        placeholder="Введите ваш отзыв здесь..."
                    ></textarea>
                </div>

                {/* Поле для ввода рейтинга */}
                <div className="mb-4">
                    <label htmlFor="stars" className="block text-sm font-medium mb-1">
                        Рейтинг (1-5):
                    </label>
                    <input
                        type="number"
                        id="stars"
                        value={stars}
                        onChange={(e) => setStars(Number(e.target.value))}
                        className="w-full border border-gray-300 p-4 rounded-md"
                        min={1}
                        max={5}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-theme-blue text-white px-6 py-2 mt-4 rounded-md hover:bg-theme-blue-light"
                >
                    Отправить
                </button>
            </form>
        </div>
    );
};

export default ReviewPage;
