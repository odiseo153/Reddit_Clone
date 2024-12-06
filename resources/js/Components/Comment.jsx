import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import formatDate from '../Tools/FormatDate';
import { Avatar } from './Avatar';
import { Link } from 'react-router-dom';

export function CommentComponent({ comment, profile = false }) {
  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-800 rounded-lg shadow-md">
      {/* Header con Avatar y Nombre de Usuario */}
      <div className="flex items-center space-x-4">
        {/* Avatar del usuario */}
        {!profile &&
     <div>

        <Avatar
        src={comment.user?.photo}
        alt={comment.user?.username}
        className="h-12 w-12 rounded-full border-2 border-gray-600"
        />
          <h4 className="font-bold text-white">{comment.user?.username}</h4>
        </div>
        }
        <div>
          <p className="text-sm text-gray-400">{formatDate(comment.created_at)}</p>
        </div>
     
      </div>

      {/* Contenido del comentario */}
      <p className="text-gray-300 leading-relaxed">{comment.content}</p>

      {/* Información del post y subreddit si `profile` es true */}
      {profile && comment.post && (
        <div className="space-y-2 bg-gray-700 p-3 rounded-lg shadow-inner">
          <div>
            <h5 className="text-sm text-gray-400">Post:</h5>
            <p className="font-semibold text-gray-200">{comment.post.title}</p>
          </div>
          {comment.post.subreddit && (
            <div>
              <h5 className="text-sm text-gray-400">Subreddit:</h5>
              <Link to={`/subreddit/r/${comment.post.subreddit.name}`} className="font-semibold text-gray-200">{comment.post.subreddit.name}</Link>
            </div>
          )}
        </div>
      )}

      {/* Sección de acciones */}
      <div className="flex items-center space-x-6 text-gray-400 border-t border-gray-700 pt-3">
        <button className="flex items-center space-x-1 hover:text-white">
          <ArrowBigUp className="h-5 w-5" />
          <span>Upvote</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-white">
          <ArrowBigDown className="h-5 w-5" />
          <span>Downvote</span>
        </button>
      </div>
    </div>
  );
}
