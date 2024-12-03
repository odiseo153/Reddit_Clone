import React, { useState } from 'react';
import { Url } from '../../Url';
import { useAppContextInfo } from '../../PageContainer';
import Modal from '../Modal';
import { Message } from '../../Tools/Mensaje';
import LoadingSpinner from '../Loading';

export function Register({ isOpen, onClose }) {
    const [newUser, setNewUser] = useState({
        email: '',
        photo: '',
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const { setUser } = useAppContextInfo();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(`${Url}users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                throw new Error('Registration failed. Please check your inputs.');
            }

            const data = await response.json();
            Message.successMessage('Registration successful! Welcome!');
            console.log(data)
            setUser(data);
            onClose(); // Close the modal after successful registration
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Stop loading after the process finishes
        }
    };

    const inputFields = [
        { name: 'email', type: 'email', placeholder: 'name@example.com', label: 'Email' },
        { name: 'username', type: 'text', placeholder: 'Your username', label: 'Username' },
        { name: 'photo', type: 'url', placeholder: 'https://example.com/photo.jpg', label: 'Photo URL' },
        { name: 'password', type: 'password', placeholder: 'Password', label: 'Password' },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="border-2 rounded-xl flex flex-col justify-center items-center text-black dark:bg-gray-900 dark:text-white">
                <div className="w-full max-w-md mt-8 p-6 dark:bg-gray-800 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
                    <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                        Enter your details to create an account!
                    </p>
                    {error && <p className="text-red-600 text-center mt-2">{error}</p>}

                    {loading ? (
                        <div className="flex justify-center items-center mt-4">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                            {inputFields.map(({ name, type, placeholder, label }) => (
                                <div key={name}>
                                    <label htmlFor={name} className="block text-sm font-medium">
                                        {label}
                                    </label>
                                    <input
                                        type={type}
                                        name={name}
                                        id={name}
                                        value={newUser[name]}
                                        onChange={handleChange}
                                        placeholder={placeholder}
                                        required={name !== 'photo'}
                                        className="w-full mt-1 px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
                                    />
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="w-full py-3 mt-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                            >
                                Sign Up
                            </button>
                        </form>
                    )}

                    <div className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <a href="/dashboard/signin" className="text-primary font-medium">
                            Sign in
                        </a>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
