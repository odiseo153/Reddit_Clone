import { Send } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CommentComponent } from "../Components/Comment";
import { Url } from "../Url";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import { useAppContextInfo } from "../PageContainer";
import { fetchRequest } from "../Tools/FetchBody";
import { Message } from "../Tools/Mensaje";
import formatDate from "../Tools/FormatDate";
import { Avatar } from "../Components/Avatar";
import { Post } from "../Components/Post/Post";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAppContextInfo();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetchRequest(`${Url}posts/${id}`);
        setPost(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCreateComment = async () => {
    if (!newComment.trim()) return;

    const data = {
      post_id: id,
      user_id: user.id,
      content: newComment,
    };

    try {
      const response = await fetchRequest(`${Url}comments`, "POST", data, "application/json");

      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, response],
      }));
      setNewComment("");
      Message.successMessage("Comentario agregado");
    } catch (error) {
      console.error("Error creating comment:", error.message);
    }
  };

  if (loading) return <div className="text-2xl text-center text-gray-300">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-[#1A1A1B]">
      {/* Layout Wrapper */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section */}
        <div className="flex-1 space-y-8">
          <Post post={post} />

          {/* Create Comment Section */}
          <div className="bg-[#2C2F33] flex flex-col rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Add a Comment</h3>
            <div className="flex items-center space-x-2">
              <Input
                className="flex-grow bg-[#23272A] p-3 rounded-l-lg border border-gray-700 text-white focus:ring focus:ring-blue-500"
                rows="4"
                placeholder="Write your comment here..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                variant="ghost"
                onClick={handleCreateComment}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-r-lg transition-all p-3"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-[#2C2F33] rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Comments</h3>
            {post.comments?.length > 0 ? (
              post.comments.map((comment) => (
                <CommentComponent key={comment.id} comment={comment} />
              ))
            ) : (
              <p className="text-gray-400">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Subreddit Info */}
          <div className="bg-[#23272A] border text-white border-[#2C2F33] rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <Avatar src={post.subreddit.photo} />
                <h2 className="text-lg font-bold">{post.subreddit?.name}</h2>
              </div>
              {user && (
                <Button variant="outline" className="px-4 py-2 text-sm bg-[#2C2F33] hover:bg-[#3A3F47] text-white rounded-lg">
                  Join
                </Button>
              )}
            </div>
            <p className="text-sm text-gray-300 mb-4">{post.subreddit?.description}</p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="font-bold text-lg">{post.subreddit?.posts?.length || 0}</p>
                <p className="text-sm text-gray-400">Posts</p>
              </div>
              <div>
                <p className="font-bold text-lg">{post.subreddit?.comment_count || 0}</p>
                <p className="text-sm text-gray-400">Users</p>
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-400">
              <p>Created at:</p>
              <p>{formatDate(post.subreddit?.create_at)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



