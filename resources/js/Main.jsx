import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Settings from './Page/Settings';
import Home from './Page/Home';
import { Layout } from './Components/Layout';
import SubReddit from './Page/SubReddit';
import CreatePost from './Page/CreatePost';
import PostDetail from './Page/PostDetail';
import UserProfile from './Page/User';

export const Main = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <Layout >

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
