import { useState, useEffect } from "react";
import { Post } from "../Components/Post/Post";
import { Url } from "../Url";
import { fetchRequest } from "../Tools/FetchBody";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchRequest(`${Url}posts`);
        setPosts(response.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <span className="text-white text-lg">Loading posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <span className="text-red-500 text-lg">{error}</span>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 bg-gray-900">
      <div className="text-white space-y-6">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <Post post={post} />
          ))
        ) : (
        <div className="text-center text-gray-500">No posts available.</div>
        )}
      </div>
    </div>
  );
}
