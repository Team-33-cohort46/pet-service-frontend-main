
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationPage: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value);

    const signUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null); // Очистка предыдущего сообщения об ошибке
        const item = { firstName, lastName, email, password };

        try {
            const response = await fetch("/api/auth/register", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: { "Content-Type": 'application/json' }
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('firstName', result.firstName);
                navigate('/login');

            } else {
                console.error("Registration failed:", result.message || "Unknown error");
                setErrorMessage(result.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-12 px-4">
            <form onSubmit={signUp} className="max-w-lg w-4/5 scale-90">
                <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
                {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name:</label>
                    <input
                        value={firstName}
                        onChange={handleChange(setFirstName)}
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name:</label>
                    <input
                        value={lastName}
                        onChange={handleChange(setLastName)}
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
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
                <div className="mb-4">
                    <input type="checkbox" id="consent" name="consent" className="mr-2" required />
                    <label htmlFor="consent" className="text-sm">
                        I consent to the processing of my personal data in accordance with the Privacy Policy.
                    </label>
                </div>
                <div className="mb-4">
                    <input type="checkbox" id="policy" name="policy" className="mr-2" required />
                    <label htmlFor="policy" className="text-sm">
                        I have read and agree to the <a href="/terms" className="text-blue-500">Terms of Use</a> and <a href="/privacy" className="text-blue-500">Privacy Policy</a>.
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-theme-blue text-white font-bold py-2 px-4 rounded"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegistrationPage;

