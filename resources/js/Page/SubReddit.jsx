import { Button } from "../Components/Button";
import { ChevronDown, MoreHorizontal, Plus,Star,StarOff } from "lucide-react";
import { useState, useEffect } from "react";
import { Url } from "../Url";
import { useParams } from "react-router-dom";
import { Avatar } from "../Components/Avatar";
import LoadingSpinner from "../Components/Loading";
import { useAppContextInfo } from "../PageContainer";
import { fetchRequest } from "../Tools/FetchBody";
import { Message } from "../Tools/Mensaje";
import { useNavigate, Link } from "react-router-dom";



export default function SubReddit() {
  const { id } = useParams();
  const [reddit, setReddit] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAppContextInfo();
  let navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchRequest(`${Url}reddit/${id}`);
        setReddit(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchPosts();
    }
  }, [id]);

  

  const deleteSubReddit = async () => {
    try {
      const request = await fetchRequest(`${Url}reddit/${reddit.id}`, 'DELETE');
      Message.successMessage(request.message)
      navigate("/");
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlerFavorite = async () => {
    try {
      const request = await fetchRequest(`${Url}reddit/favorite/${reddit.id}`, 'POST');
      Message.successMessage(request);
      setReddit((prevState) => ({
        ...prevState,
        is_favorite: !prevState.is_favorite, // Cambiar el estado de unión
      }));
      Message.successMessage(reddit.is_favorite ? "SubReddit remove for favorites" : request);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const JoinToSubReddit = async () => {
    try {
      setLoading(true); // Activar el estado de carga
      const request = await fetchRequest(`${Url}reddit/join/${reddit.id}`, 'POST');

      // Mostrar el mensaje adecuado según la acción
      Message.successMessage(reddit.is_join ? "Saliste del grupo" : request.message);

      // Actualizar el estado del subreddit
      setReddit((prevState) => ({
        ...prevState,
        is_join: !prevState.is_join, // Cambiar el estado de unión
        users_count: prevState.users_count + (prevState.is_join ? -1 : 1) // Actualizar el conteo de usuarios
      }));
    } catch (error) {
      console.error("Error al unirse o salir del subreddit:", error);
    } finally {
      setLoading(false);
    }
  };


  const isUserRedditOwner = reddit.user_id === user?.id;

  return (
    <div className="min-h-screen bg-[#1a1a1b] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <Avatar src={reddit.photo} className="w-10 h-10 bg-gray-700 rounded-full" />
          <h1 className="text-2xl font-bold">r/{reddit.name || "Loading..."}</h1>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>

              {reddit.is_join &&
                <Link to="/submit" className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Post
                </Link>
              }
              {isUserRedditOwner &&
                <Button
                  onClick={isUserRedditOwner ? () => deleteSubReddit() : null}
                  className={`rounded-full bg-[#e12727] hover:bg-[#e12727]/80`}
                >
                  Delete
                </Button>
              }

              <Button
                onClick={JoinToSubReddit}
                className={`rounded-full ${reddit.is_join ? "bg-[#8d2121] hover:bg-[#e12727]/80" : "bg-[#0079D3] hover:bg-[#0079D3]/80"
                  } text-white`}
              >
                {reddit.is_join ? "Exit" : "Join"}
              </Button>
              <Button variant="ghost" onClick={handlerFavorite}>
                {reddit.is_favorite ?<StarOff /> :<Star /> } 
              </Button>
            </>
          ) : (
            <Button className="bg-gray-700 text-white cursor-not-allowed" disabled>
              Login to Join
            </Button>
          )}

        </div>
      </header>

      <div className="container mx-auto px-4 py-4 flex gap-6">
        {/* Main content */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <Button variant="ghost" className="text-gray-400 hover:bg-white/10">
              Hot
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <h1 className="text-2xl p-2">Posts</h1>
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <LoadingSpinner />
            </div>
          ) : (
            <div>
              {reddit.posts?.length > 0 ? (
                reddit.posts.map((post, index) => (
                  <div
                    className="bg-[#1a1a1b] border border-gray-800 rounded-md mb-4"
                    key={index}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar src={post.author?.photo} className="w-8 h-8 bg-gray-700 rounded-full" />
                        <div className="text-sm text-gray-400">
                          <span>u/{post.author?.username}</span>
                          <span className="mx-1">•</span>
                          <span>{post.created_at}</span>
                        </div>
                        {user && (
                          <Button variant="ghost" className="ml-auto">
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        )}
                      </div>
                      <h2 className="text-lg font-medium mb-2">{post.title}</h2>
                      <p className="text-gray-300 mb-4">{post.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400">No posts available</div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-80 space-y-4">
          <div className="bg-[#1a1a1b] border border-gray-800 rounded-md">
            <div className="p-4">
              <h2 className="font-medium mb-4">{reddit.name || "Loading..."}</h2>
              <div className="text-sm text-gray-400 mb-4">
                <p>{reddit.description || "No description available."}</p>
              </div>
              <div className="flex items-center gap-4 text-sm mb-4">
                <div>
                  <div className="font-medium">{reddit.users_count || "0"}</div>
                  <div className="text-gray-400">Members</div>
                </div>
                <div>
                  <div className="font-medium">{reddit.online || "0"}</div>
                  <div className="text-gray-400">Online</div>
                </div>

                <div>
                  <div className="font-medium">{reddit.posts_count || "0"}</div>
                  <div className="text-gray-400">Posts</div>
                </div>

              </div>
              <div className="text-sm text-gray-400">
                Created by {reddit.create_by?.username || "Unknown"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <Button variant="ghost" onClick={toggleMenu} className="text-white">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>
      {isOpen && (
        <ul className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <li className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            Opción 1
          </li>
          <li className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            Opción 2
          </li>
          <li className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            Opción 3
          </li>
        </ul>
      )}
    </div>
  );
};
