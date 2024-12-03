import { Input } from "./Input";
import { Url } from "../Url";
import { fetchRequest } from "../Tools/FetchBody";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export function SearchInput() {
  const [reddits, setReddits] = useState([]);
  const [filteredReddits, setFilteredReddits] = useState([]);
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchReddits = async () => {
      try {
        const response = await fetchRequest(`${Url}reddit-home`);
        setReddits(response);
      } catch (error) {
        console.error("Error loading communities:", error);
      }
    };
    fetchReddits();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredReddits([]);
      setIsMenuOpen(false);
    } else {
      setFilteredReddits(
        reddits.filter((reddit) =>
          reddit.name.toLowerCase().includes(query.toLowerCase())
        )
      );
      setIsMenuOpen(true);
    }
  }, [query, reddits]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex-1 max-w-full mx-4 relative" ref={menuRef}>
      <Input
        className="bg-[#272729] border-gray-700"
        placeholder="Search Reddit"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isMenuOpen && filteredReddits.length > 0 && (
        <ul ref={menuRef} className="absolute mt-2 w-full bg-[#1a1a1b] border border-gray-700 rounded-md shadow-lg z-10">
          {filteredReddits.map((reddit) => (
            <Link
              to={`subreddit/${reddit.id}`}
              key={reddit.id}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
            >
              <img
                src={reddit.photo || "/placeholder.jpg"} // Agrega una imagen de marcador si no hay foto
                alt={reddit.name}
                className="w-8 h-8 rounded-full mr-3"
              />
              <span className="text-white">{reddit.name}</span>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
