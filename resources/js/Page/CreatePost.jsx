import { useState, useEffect } from "react";
import { Bold, Italic, Strikethrough, Link2, List, ListOrdered, Trash2 } from "lucide-react";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { useAppContextInfo } from "../PageContainer";
import { fetchRequest } from "../Tools/FetchBody";
import { Url } from "../Url";
import {Textarea} from "../Components/Textarea";

export default function CreatePost() {
  const { user } = useAppContextInfo();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState("Text");
  const [reddits, setReddits] = useState([]);
  const [redditId, setRedditId] = useState("");

  useEffect(() => {
    fetchRequest(`${Url}reddit-home`).then(setReddits);
  }, []);

  const submit = async () => {
    const post = { title, content, subreddit_id: +redditId, user_id: +user.id };
    if (!title || !content || isNaN(post.subreddit_id) || isNaN(post.user_id)) return;
    try {
      const res = await fetch(`${Url}posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (!res.ok) throw new Error("Error en la solicitud");
      console.log(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const tabs = {
    Text: <Text setContent={setContent} />,
    "Images & Video": <FileUpload />,
    Link: <Input placeholder="Escribe tu link" />,
  };

  return (
    <div className="h-100 text-white  p-4 max-w-3xl mx-auto">
      <header className="flex justify-between mb-6">
        <h1 className="text-xl font-medium">Create Post</h1>
      </header>
      <select onChange={(e) => setRedditId(e.target.value)} className="w-full p-2 rounded bg-zinc-900 mb-6">
        {reddits.map((reddit) => (
          <option key={reddit.id} value={reddit.id}>
            {reddit.name}
          </option>
        ))}
      </select>
      <div className="bg-zinc-900 rounded-lg p-4">
        <nav className="flex space-x-8 mb-4 border-b border-zinc-800">
          {Object.keys(tabs).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 ${activeTab === tab ? "border-b-2 border-blue-500" : "text-gray-400"}`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={300}
          className="bg-transparent border-none text-lg mb-4"
        />
        {tabs[activeTab]}
        <footer className="flex justify-end gap-3 mt-4">
          <Button className="text-gray-400 border border-zinc-700" variant="ghost">Save Draft</Button>
          <Button onClick={submit} className="bg-blue-500 text-white" variant="ghost">
            Post
          </Button>
        </footer>
      </div>
    </div>
  );
}

const Text = ({ setContent }) => (
  <div className="border border-zinc-800 rounded-lg">
    <div className="flex items-center gap-1 p-2 border-b">
      {[Bold, Italic, Strikethrough, Link2, List, ListOrdered].map((Icon, i) => (
        <button key={i} className="h-8 w-8 p-0  ">
          <Icon className="h-4 w-4" />
        </button>
      ))} 
    </div>
    <Textarea placeholder="Body" onChange={(e) => setContent(e.target.value)} className="min-h-[200px] bg-transparent" />
  </div>
);

const FileUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  return selectedImage ? (
    <div className="relative h-48">
      <img src={selectedImage} alt="Preview" className="object-contain h-full w-full rounded-lg" />
      <button onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  ) : (
    <input type="file" onChange={(e) => setSelectedImage(URL.createObjectURL(e.target.files[0]))} className="opacity-0" />
  );
};
