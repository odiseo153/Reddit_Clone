import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Importar páginas
import Settings from "./Page/Settings";
import Home from "./Page/Home";
import SubReddit from "./Page/SubReddit";
import CreatePost from "./Page/CreatePost";
import PostDetail from "./Page/PostDetail";
import UserProfile from "./Page/UserProfile";
import { Layout } from "./Components/Layout";

export const Main = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Función para alternar el estado del sidebar
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <Router>
      {/* Layout general con sidebar y contenido */}
      <Layout >
          {/* Configuración de rutas */}
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<CreatePost />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/subreddit/r/:id" element={<SubReddit />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
      </Layout>
    </Router>
  );
};
