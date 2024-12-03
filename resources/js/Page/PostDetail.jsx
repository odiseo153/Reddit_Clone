import { 
  ArrowBigDown, 
  ArrowBigLeft, 
  ArrowBigUp, 
  MessageSquare, 
  Send
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CommentComponent } from "../Components/Comment";
import { Url } from "../Url";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import { useAppContextInfo } from "../PageContainer";
import { fetchRequest } from "../Tools/FetchBody";
import { Message } from "../Tools/Mensaje";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useAppContextInfo();


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${Url}posts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);
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
      "post_id": id,
      "user_id": user.id, 
      "content": newComment,
    }

    console.log(data);

    try {
      const response = await fetchRequest(`${Url}comments`,'POST',data,"application/json");

      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, response],
      }));
      setNewComment("");
      Message.successMessage("Comentario agregado")
    } catch (error) {
      console.error("Error creating comment:", error.message);
    }
  };

  if (loading) return <div className="text-2xl">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 text-white">
      {/* Post Section */}
      <div className="bg-gray-800 rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-700 flex items-center space-x-4">
          <Link to="/" className="text-gray-400 hover:text-white">
            <ArrowBigLeft />
          </Link>
          <img
            src={post.subreddit?.photo}
            alt={post.subreddit?.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-sm text-gray-400">
              Posted by u/{post.user?.username} {post.createdAt}
            </p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-lg">{post.content}</p>
        </div>
        <div className="p-4 border-t border-gray-700 flex items-center space-x-6">
          {/* Voting Section */}
          <div className="flex items-center space-x-2">
            <button className="hover:text-green-500">
              <ArrowBigUp className="h-5 w-5" />
            </button>
            <span>{post.votes_count || 0}</span>
            <button className="hover:text-red-500">
              <ArrowBigDown className="h-5 w-5" />
            </button>
          </div>
          {/* Comments Count */}
          <div className="flex items-center space-x-1">
            <MessageSquare className="h-5 w-5" />
            <span>{post.comments?.length} Comments</span>
          </div>
        </div>
      </div>

      {/* Create Comment Section */}
      <div className="bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-xl font-semibold mb-4">Add a Comment</h3>
        <Input
          className="w-full bg-gray-900 p-3 rounded-lg border border-gray-700 text-white"
          rows="4"
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="ghost" onClick={handleCreateComment} className="mt-4">
          <Send />
        </Button>
      </div>

      {/* Comments Section */}
      <div className="bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        {post.comments?.length > 0 ? (
          post.comments.map((comment) => (
            <CommentComponent key={comment.id} comment={comment} />
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
