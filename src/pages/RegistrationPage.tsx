// src/pages/RegistrationPage.tsx
import React from 'react';

const RegistrationPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add registration handling logic here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 mb-2">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
                        <input
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
                            I consent to the processing of my personal data in accordance with the Privacy Policy. Please check this box as my written consent.
                        </label>
                    </div>
                    <div className="mb-4">
                        <input type="checkbox" id="policy" name="policy" className="mr-2" required />
                        <label htmlFor="policy" className="text-sm">
                            I have read and agree to the <a href="#" className="text-blue-500">Terms of Use</a> and <a href="#" className="text-blue-500">Privacy Policy</a>.
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
        </div>
    );
};

export default RegistrationPage;
