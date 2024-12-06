import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Home as HomeIcon, 
  X, 
  Plus, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { Url } from "../Url";
import CreateCommunityModal from "./Community/CreateComunnitie";
import LoadingSpinner from "./Loading";
import { fetchRequest } from "../Tools/FetchBody";
import { Avatar } from "./Avatar";
import { useAppContextInfo } from "../PageContainer";



export default function Sidebar({ onClose, children }) {
  const [openSections, setOpenSections] = useState({});
  const [reddits, setReddits] = useState([]);
  const [redditsjoin, setRedditsJoin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const {user} = useAppContextInfo();

  useEffect(() => {
    (async () => {
      try {
        const url =user ==null ? "reddit-home" :"reddit-homes"

        const response = await fetchRequest(`${Url+url}`);
          setReddits(response.reddits.slice(0, 6));
          setRedditsJoin(response.redditsJoin);
        } catch (error) {
        console.error("Error loading communities:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const toggleSection = (section) => 
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const sections = [
    { name: "recents", label: "Recents", items: reddits },
    {
      name: "communities",
      label: "Communities",
      items: redditsjoin,
      createText: "Create a community",
      onCreate: () => setModalOpen(true),
    },
    { name: "topics", label: "Topics", items: [{ name: "Technology" }, { name: "Science" }] },
    { name: "resources", label: "Resources", items: [{ name: "Help" }, { name: "Blog" }] },
    { name: "settings", label: "Settings", items: [{ name: "Account Settings" }] },
  ];

  return (
    <div className="flex flex-col    min-h-screen">
  {/* Sidebar */}
  <aside className="fixed md:relative w-64 bg-gray-800 z-50 h-full overflow-y-scroll hide-scrollbar">
    {/* Header */}
    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
      <h1 className="text-white text-2xl font-bold">Reddit</h1>
      <button 
        onClick={onClose} 
        className="text-gray-400 hover:text-white md:hidden focus:outline-none">
        <X className="h-6 w-6" />
      </button> 
    </div>

    {/* Navigation */}
    <nav className="p-6 space-y-6 max-w-full">
      {/* Home Link */}
      <Link 
        to="/" 
        className="border-b flex items-center px-4 py-3 text-white bg-gray-700 rounded-lg transition hover:bg-gray-600">
        <HomeIcon className="mr-3 h-5 w-5" />
        Home
      </Link>

      {/* Sections */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <LoadingSpinner />
          </div>
        ) : (
          sections.map((section) => (
            <div key={section.name} className="space-y-2 ">
              <button
                onClick={() => toggleSection(section.name)}
                className="flex justify-between items-center w-full px-4 py-2 text-gray-400 rounded-lg hover:text-white hover:bg-gray-700 transition">
                {section.label}
                {openSections[section.name] ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              {openSections[section.name] && (
                <div className="pl-6 space-y-2 transition-all duration-300 ease-in-out">
                  {section.createText && (
                    <button
                      onClick={section.onCreate}
                      className="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:text-white hover:bg-gray-700 transition">
                      <Plus className="mr-2 h-5 w-5" />
                      {section.createText}
                    </button>
                  )}
                  {section.items.map((item, idx) => (
                    <Link
                      key={idx}
                      to={`/subreddit/r/${item.name || ""}`}
                      className="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:text-white hover:bg-gray-700 transition">
                      {item.photo ? (
                        <Avatar src={item.photo} />
                      ) : (
                        <div className="mr-2 h-6 w-6 bg-gray-600 rounded-full"></div>
                      )}
                      <span className="ml-2">{item.name || "Unnamed"}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </nav>
  </aside>

  {/* Main Content */}
  <main className="flex-1 bg-gray-800">{children}</main>

  {/* Modal */}
  {isModalOpen && <CreateCommunityModal onClose={() => setModalOpen(false)} />}
</div>

  );
}
