import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { setIsLoggedIn, setIsLoggedOut } = useContext(AuthContext);

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const credentials = { email, password };

        try {
            const response = await fetch("/api/auth/login", {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": 'application/json' },
            });

            const result = await response.json();
            if (response.ok) {
                localStorage.setItem('authToken', result.token);
                setIsLoggedIn(true);
                setIsLoggedOut(false);
                navigate("/user");
            } else {
                setError(result.message || "Ошибка входа. Попробуйте снова.");
            }
        } catch (error) {
            console.error("Ошибка во время входа:", error);
            setError("Произошла ошибка. Попробуйте позже.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 shadow-md rounded">
                <h2 className="text-2xl font-semibold mb-6 text-center">Вход</h2>

                {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
                    <input
                        value={email}
                        onChange={handleChange(setEmail)}
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 mb-2">Пароль:</label>
                    <input
                        value={password}
                        onChange={handleChange(setPassword)}
                        type="password"
                        id="password"
                        name="password"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
                >
                    Войти
                </button>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate("/restore-account")}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Восстановить аккаунт
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;