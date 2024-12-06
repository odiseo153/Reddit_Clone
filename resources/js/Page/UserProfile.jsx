import { Plus, Share2, Upload, UserCircle, User, Image } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingSpinner from "../Components/Loading";
import { useAppContextInfo } from "../PageContainer";
import formatDate from "../Tools/FormatDate";
import { Avatar } from "../Components/Avatar";
import { Post } from "../Components/Post/Post";
import { CommentComponent } from "../Components/Comment";

export default function UserProfile() {
  const { user } = useAppContextInfo();
  const [loading, setLoading] = useState(!user);
  const [activeTab, setActiveTab] = useState("Overview"); 
  

  useEffect(() => {
    if (user) setLoading(false);
  console.log(user)
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600">Please log in to continue</h1>
        <p className="mt-4 text-gray-700">Your session has expired or you are not logged in. Please sign in to access this content.</p>
      </div>
    );
  }

  const options = ["Overview", "Posts", "Favorites", "Comments", "Upvotes", "Downvotes"];

  // Componentes específicos para cada sección
  const TabContent = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview user={user} />;
      case "Posts":
        return <PostsComponent />;
      case "Favorites":
        return <Favorites  />;
      case "Comments":
        return <Comments user={user} />;
      case "Upvotes":
        return <Upvotes user={user} />;
      case "Downvotes":
        return <Downvotes user={user} />;
      default:
        return <p className="text-gray-400">No content available.</p>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div
        className="relative h-40 bg-cover bg-center"
        style={{
          backgroundImage: `url(${user?.banner || "https://via.placeholder.com/1920x300"})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative max-w-6xl mx-auto flex items-end gap-4 p-4">
          <div className="relative">
            <Avatar
              src={user?.photo}
              className="w-36 h-36 rounded-full border-4 border-black"
            />
            <button className="absolute bottom-0 right-0 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
              <Upload className="w-4 h-4 text-white" />
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user?.username}</h1>
            <p className="text-gray-400">u/{user?.username}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 p-4">
        {/* Left Content */}
        <div>
          {/* Tabs */}
          <div className="flex border-b border-gray-800 mb-4">
            {options.map((option) => (
              <button
                key={option}
                className={`px-4 py-2 ${
                  activeTab === option ? "bg-gray-800 text-white" : "text-gray-400"
                } hover:bg-gray-800 focus:outline-none`}
                onClick={() => setActiveTab(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Dynamic Content */}
          <TabContent />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Profile Summary */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">{user?.username}</h2>
              <button className="px-3 py-1 text-sm bg-gray-800 rounded hover:bg-gray-700">
                <Share2 className="w-4 h-4 mr-2 inline" />
                Share
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-bold">{user?.posts_count || 0}</p>
                <p className="text-sm text-gray-400">Posts</p>
              </div>
              <div>
                <p className="font-bold">{user?.comments_count || 0}</p>
                <p className="text-sm text-gray-400">Comments</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">Joined</p>
              <p>{formatDate(user?.created_at)}</p>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <h2 className="font-bold mb-4">Settings</h2>
            <div className="space-y-4">
              {[{ icon: User, label: "Profile", description: "Customize your profile" },
                { icon: Image, label: "Banner", description: "Customize your banner" }
              ].map(
                ({ icon: Icon, label, description }, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      <div>
                        <p>{label}</p>
                        <p className="text-sm text-gray-400">{description}</p>
                      </div>
                    </div>
                    <Link
                      to={label === "Profile" ? `/settings` : null}
                      className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700"
                    >
                      Edit
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Secciones individuales como componentes
const Overview = ({ user }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Overview</h2>
    <p>Welcome, {user?.username}! Here's your profile overview.</p>
  </div>
);

const PostsComponent = () => {
  const { user } = useAppContextInfo();
  const posts = user.posts ?? []; 
  console.log(posts)

  return( 
    <div>
    <h2 className="text-xl font-bold mb-4">Posts</h2>
    {posts.length > 0 ?
    <div className="space-y-6">
      {posts.map((post, index) => {
        return(
            <Post post={post} />
        )
      })}
    </div>
    :
    <p>{user?.username} hasn't posted yet.</p>
  }
  </div>
)
};

const Favorites = () => {
  const { user } = useAppContextInfo();

  const favorites = user.favorites;
  console.log(favorites)
  if (!favorites || favorites.length === 0) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-300">
        <p>No favorite subreddits found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4 bg-gray-800 rounded-lg">
      <h1 className="text-3xl font-bold text-white mb-6">Favorite Subreddits</h1>

      <div className="space-y-4">
        {favorites.map((subreddit) => (
          <div
            key={subreddit.id}
            className="flex items-start bg-[#1A1A1B] border border-gray-700 rounded-lg shadow-lg p-6"
          >
            {/* Subreddit Photo */}
            <img
              src={subreddit.photo}
              alt={subreddit.name}
              className="w-16 h-16 rounded-full mr-4"
            />

            {/* Subreddit Details */}
            <div className="flex-grow">
              <h2 className="text-lg font-semibold text-white mb-2">
                <Link
                  to={`/subreddit/r/${subreddit.name}`}
                  className="hover:underline text-blue-500"
                >
                  r/{subreddit.name}
                </Link>
              </h2>

              <p className="text-gray-300 mb-2">
                {subreddit.description || "No description available."}
              </p>

              <span className="text-sm text-gray-400">
                Created on: {formatDate(subreddit.created_at)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Comments = () => {
 const {user} = useAppContextInfo();
 const comments = user.comments ?? [];

  return(
    <div>
    <h2 className="text-xl font-bold mb-4">Comments</h2>
 
    {comments.length > 0 ?
    <div className="space-y-6">
      {comments.map((comment, index) => {
        return(
          <CommentComponent comment={comment} profile={true} />
        )
      })}
    </div>
    :
    <p>{user?.username} hasn't posted yet.</p>
  }
  </div>
)
};

const Upvotes = ({ user }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Upvotes</h2>
    <p>See the content upvoted by {user?.username}.</p>
  </div>
);

const Downvotes = ({ user }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Downvotes</h2>
    <p>See the content downvoted by {user?.username}.</p>
  </div>
);
