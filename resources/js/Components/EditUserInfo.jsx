import React, { useState } from 'react';
import { Url } from '../../Url';
import { useAppContextInfo } from '../../PageContainer';
import Modal from '../Modal';
import { Message } from '../../Tools/Mensaje';
import { Input } from '../Input';
import { Button } from '../Button';

export function EditUserInfo({ isOpen, onClose }) {
    const [email, setEmail] = useState('test@gmail.com');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState(null);
    const { setUser } = useAppContextInfo();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${Url}login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed. Please try again.');
            }

            const data = await response.json();
            console.log(data);
            Message.successMessage(data.message);
            setUser(data.user);
            localStorage.setItem('token',data.token);
            onClose(); // Close modal upon successful login
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="border-2 rounded-xl flex flex-col items-center text-black dark:bg-gray-900 dark:text-white">
                <div className="w-full max-w-md p-6 dark:bg-gray-800 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-center">Sign In</h2>
                    <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                        Enter your email and password to sign in!
                    </p>
                    {error && (
                        <p className="mt-3 text-center text-sm text-red-600">
                            {error}
                        </p>
                    )}
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <FormInput
                            id="email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                        />
                        <FormInput
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="••••••••"
                        />
                        <Button
                            type="submit"
                            className="w-full py-3 mt-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                        >
                            Sign In
                        </Button>
                    </form>
                    <div className="flex justify-between mt-4 text-sm">
                        <a href="/dashboard/signin/email_signin" className="text-primary hover:underline">
                            Sign in via magic link
                        </a>
                        <a href="/dashboard/signin/forgot_password" className="text-primary hover:underline">
                            Forgot your password?
                        </a>
                    </div>
                    <div className="mt-6 text-center text-sm">
                        Don't have an account?{' '}
                        <a href="/dashboard/signin/signup" className="text-primary font-medium hover:underline">
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

function FormInput({ id, label, type, value, onChange, placeholder }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium">
                {label}
            </label>
            <Input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                className="w-full mt-1 px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary"
            />
        </div>
    );
}
