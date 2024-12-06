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
        const response = await fetchRequest(`${Url}posts?with=author,subreddit&count=comments,votes`);
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
      <div className="flex items-center justify-center min-h-screen bg-[#1A1A1B]">
        <span className="text-white text-lg">Loading posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1A1A1B]">
        <span className="text-red-500 text-lg">{error}</span>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 bg-[#0d0d0e]">
      <div className="max-w-3xl mx-auto space-y-6">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <Post key={i} post={post} />
          ))
        ) : (
          <div className="text-center text-gray-400">No posts available.</div>
        )}
      </div>
    </div>
  );
}
