import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RestoreAccountPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value);

    const handleRestore = async (e: React.FormEvent) => {
        e.preventDefault();

        const credentials = { email, password };

        try {
            const response = await fetch("/api/auth/register/restore", {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": 'application/json' },
            });

            if (response.ok) {
                setSuccessMessage("Ваш аккаунт успешно восстановлен! Теперь вы можете войти.");
                setError("");
                setEmail("");
                setPassword("");
            } else {
                const result = await response.json();
                setError(result.message || "Не удалось восстановить аккаунт.");
                setSuccessMessage("");
            }
        } catch (error) {
            console.error("Ошибка при восстановлении аккаунта:", error);
            setError("Произошла ошибка. Попробуйте позже.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <form onSubmit={handleRestore} className="max-w-md w-full bg-white p-8 shadow-md rounded">
                <h2 className="text-2xl font-semibold mb-6 text-center">Восстановление аккаунта</h2>

                {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
                {successMessage && <div className="mb-4 text-green-500 text-center">{successMessage}</div>}

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
                    <label htmlFor="newPassword" className="block text-gray-700 mb-2">Новый пароль:</label>
                    <input
                        value={password}
                        onChange={handleChange(setPassword)}
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
                >
                    Восстановить аккаунт
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="mt-4 w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Назад к входу
                </button>
            </form>
        </div>
    );
};

export default RestoreAccountPage;
