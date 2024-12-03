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



export default function Sidebar({ onClose, children }) {
  const [openSections, setOpenSections] = useState({});
  const [reddits, setReddits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchRequest(`${Url}reddit-home`);
        setReddits(response.slice(0, 6));
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
    {
      name: "communities",
      label: "Communities",
      items: reddits,
      createText: "Create a community",
      onCreate: () => setModalOpen(true),
    },
    { name: "topics", label: "Topics", items: [{ name: "Technology" }, { name: "Science" }] },
    { name: "resources", label: "Resources", items: [{ name: "Help" }, { name: "Blog" }] },
    { name: "settings", label: "Settings", items: [{ name: "Account Settings" }] },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-gray-900 min-h-screen">
      {/* Sidebar */}
      <aside className="fixed md:relative w-64 bg-gray-800 md:w-auto z-50 md:h-auto h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h1 className="text-white text-lg font-bold">Reddit</h1>
          <button onClick={onClose} className="text-gray-400 hover:text-white md:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>
        {/* Navigation */}
        <nav className="p-4 space-y-4">
          <Link to="/" className="flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-lg">
            <HomeIcon className="mr-2 h-5 w-5" />
            Home
          </Link>
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <LoadingSpinner />
              </div>
            ) : (
              sections.map((section) => (
                <div key={section.name} className="space-y-2">
                  <button
                    onClick={() => toggleSection(section.name)}
                    className="flex justify-between items-center w-full text-gray-400 px-4 py-2 hover:text-white"
                  >
                    {section.label}
                    {openSections[section.name] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {openSections[section.name] && (
                    <div className="pl-6 space-y-2">
                      {section.createText && (
                        <button
                          onClick={section.onCreate}
                          className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
                        >
                          <Plus className="mr-2 h-5 w-5" />
                          {section.createText}
                        </button>
                      )}
                      {section.items.map((item, idx) => (
                        <Link
                          key={idx}
                          to={`/subreddit/r/${item.name || ""}`}
                          className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
                        >
                          {item.photo &&
                          <Avatar src={item.photo} />
                          }
                          <div className="p-1">
                          {item.name || "Unnamed"}
                          </div>
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
      <main className="flex-1 bg-gray-800 p-6">{children}</main>
      {/* Modal */}
      {isModalOpen && <CreateCommunityModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
