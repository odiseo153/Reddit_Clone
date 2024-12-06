import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Header } from "./Header";

export function Layout({ children }) {
    // State for modal and sidebar
    const [modals, setModals] = useState({
        login: false,
        register: false,
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Handlers for modals
    const toggleModal = (modalName) =>
        setModals((prev) => ({ ...prev, [modalName]: !prev[modalName] }));

    // Sidebar toggle handler
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
        <div className="flex h-screen bg-gray-900">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header
                    toggleSidebar={toggleSidebar}
                    openLoginModal={() => toggleModal("login")}
                    closeLoginModal={() => toggleModal("login")}
                    openRegisterModal={() => toggleModal("register")}
                    closeRegisterModal={() => toggleModal("register")}
                    isLoginModalOpen={modals.login}
                    isRegisterModalOpen={modals.register}
                />

                {/* Main Content */}
                <main className="flex-1 overflow-auto bg-gray-800 p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}
