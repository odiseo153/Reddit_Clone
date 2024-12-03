import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import formatDate from '../Tools/FormatDate';
import { Avatar } from './Avatar';

export function CommentComponent({ comment }) {
  return (
    <div className="flex space-x-4 p-4 bg-gray-800 rounded-lg shadow-md">
      {/* Avatar del usuario */}
      <div className="flex-shrink-0">
        <Avatar
          src={comment.user?.photo}
          alt={comment.user.username}
          className="h-10 w-10 rounded-full"
        />
      </div>

      {/* Contenido del comentario */}
      <div className="flex-1 space-y-2">
        {/* Información del usuario */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-white">{comment.user.username}</span>
            <span className="text-sm text-gray-400">{formatDate(comment.created_at)}</span>
          </div>
        </div>

        {/* Texto del comentario */}
        <p className="text-gray-300 leading-relaxed">{comment.content}</p>

        {/* Sección de acciones */}
        <div className="flex items-center space-x-4 text-gray-400">
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
    </div>
  );
}
