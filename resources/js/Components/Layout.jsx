import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Header } from "./Header";

export function Layout({ children }) {
    // State for modals and sidebar
    const [modalState, setModalState] = useState({
        isLoginModalOpen: false,
        isRegisterModalOpen: false,
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Handlers for modal state
    const toggleModal = (modalName, isOpen) =>
        setModalState((prev) => ({ ...prev, [modalName]: isOpen }));

    // Sidebar toggle
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
        <div className="flex h-screen bg-gray-900">
            {/* Sidebar */}
            <Sidebar onClose={toggleSidebar} isOpen={isSidebarOpen} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header
                    toggleSidebar={toggleSidebar}
                    openLoginModal={() => toggleModal("isLoginModalOpen", true)}
                    closeLoginModal={() => toggleModal("isLoginModalOpen", false)}
                    openRegisterModal={() =>
                        toggleModal("isRegisterModalOpen", true)
                    }
                    closeRegisterModal={() =>
                        toggleModal("isRegisterModalOpen", false)
                    }
                    isLoginModalOpen={modalState.isLoginModalOpen}
                    isRegisterModalOpen={modalState.isRegisterModalOpen}
                />

                {/* Main Content */}
                <main className="flex-1 overflow-auto bg-gray-800 ">
                    {children}
                </main>
            </div>
        </div>
    );
}
