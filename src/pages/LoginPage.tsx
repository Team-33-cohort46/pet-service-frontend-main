
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
                navigate("/profile");

            } else {
                setError(result.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-12 px-4">
            <form onSubmit={handleSubmit} className="max-w-lg w-4/5 scale-90">
                <h2 className="text-2xl font-semibold mb-6 text-center">Log In</h2>

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
                    <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
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
                    className="w-full bg-sky-600 hover:bg-theme-blue text-white font-bold py-2 px-4 rounded"
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LoginPage;

