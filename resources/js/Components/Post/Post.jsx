import React from "react";
import { Avatar } from "../Avatar";
import { useAppContextInfo } from "../../PageContainer";
import { ArrowBigDown, ArrowBigUp, MessageSquare, Share2, BookmarkPlus, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Url } from "../../Url";
import { fetchRequest } from "../../Tools/FetchBody";
import formatDate from "../../Tools/FormatDate";

export function Post({ post }) {
  const { user } = useAppContextInfo();

  const handleVote = async (postId, type) => {
    const data = {
      user_id: user.id,
      votable_id: postId,
      votable_type: "App\\Models\\Post",
      type,
      vote_value: type === "upvote" ? 1 : -1,
    };

    try {
      const response = await fetch(`${Url}posts/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("Error while voting");
        return;
      }

      // Actualizar votos (si se requiere lógica adicional)
      console.log("Vote successful");
    } catch (error) {
      console.error("Error in the request:", error);
    }
  };

  if (!post) {
    return (
      <div className="text-center text-gray-500">
        <span>Post not available.</span>
      </div>
    );
  }

  const {
    id,
    title,
    content,
    votes = 0,
    comments = [],
    subreddit = {},
    author = {},
    created_at,
  } = post;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-[#1A1A1B] border border-gray-700 rounded-lg shadow-lg flex p-6 hover:scale-105 transition-all duration-300">
        {/* Voting Section */}
        <div className="flex flex-col items-center justify-start space-y-3 pr-4 text-gray-400">
          <button
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 focus:ring focus:ring-blue-500 transition-all"
            onClick={() => handleVote(id, "upvote")}
            aria-label="Upvote"
          >
            <ArrowBigUp className="h-6 w-6 text-gray-300 hover:text-blue-500" />
          </button>
          <span className="font-semibold text-white text-lg">{votes}</span>
          <button
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 focus:ring focus:ring-red-500 transition-all"
            onClick={() => handleVote(id, "downvote")}
            aria-label="Downvote"
          >
            <ArrowBigDown className="h-6 w-6 text-gray-300 hover:text-red-500" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-grow">
          <div className="flex items-center space-x-3 text-gray-400 text-sm mb-3">
            <Avatar
              src={subreddit.photo || ""}
              alt={title || "Avatar"}
              className="w-10 h-10 rounded-full"
            />
            <span className="text-sm">
              <Link
                to={`subreddit/r/${subreddit.name || "unknown"}`}
                className="text-blue-500 hover:underline"
              >
                r/{subreddit.name || "unknown"}
              </Link>{" "}
              • Posted by{" "}
              <Link className="hover:underline">
                u/{author.username || "unknown"}
              </Link>
              <span> • {formatDate(created_at)}</span>
            </span>
          </div>

          <Link to={`post/${id}`}>
            <h2 className="text-xl font-semibold text-white mb-2 hover:underline transition-colors">
              {title || "Untitled"}
            </h2>
            <p className="text-gray-300 mb-4">{content || "No content available."}</p>
          </Link>

          <div className="flex items-center space-x-6 mt-4 text-gray-400">
            <button className="flex items-center space-x-2 hover:text-white transition-all">
              <MessageSquare className="h-5 w-5" />
              <span>{comments.length} Comments</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-white transition-all">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-white transition-all">
              <BookmarkPlus className="h-5 w-5" />
              <span>Save</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-white ml-auto transition-all">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
