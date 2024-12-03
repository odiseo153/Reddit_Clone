import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchRequest } from './Tools/FetchBody';
import { Url } from './Url';

// Crear el contexto
const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado de error

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetchRequest(`${Url}me`);
                if (response?.user) {
                    setUser(response.user);
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Failed to fetch user data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [isLoading]);

    return (
        <AppContext.Provider value={{ user, setUser, isLoading, error }}>
            {children}
        </AppContext.Provider>
    );
};

// Hook personalizado para consumir el contexto
export const useAppContextInfo = () => {
    return useContext(AppContext);
};
