import { useState, useEffect } from "react";
import { Bold, Italic, Strikethrough, Link2, List, ListOrdered, Trash2 } from "lucide-react";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { useAppContextInfo } from "../PageContainer";
import { fetchRequest } from "../Tools/FetchBody";
import { Url } from "../Url";
import { Textarea } from "../Components/Textarea";

export default function CreatePost() {
  const { user } = useAppContextInfo();
  const [activeTab, setActiveTab] = useState("Text");
  const [reddits, setReddits] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    subreddit_id: "",
    user_id:"",
    image_path: null
  });

  // Carga inicial de subreddits
  useEffect(() => {
    fetchRequest(`${Url}reddit-home`).then(setReddits);
  }, []);

  // Manejador genérico de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejo de subida de imágenes
  const handleImageUpload = (e) => {
    const file = e.target.value;
    if (file) {
      setFormData((prev) => ({ ...prev, image_path: file }));
    }
  };

  // Enviar formulario
  const handleSubmit = async () => {
    // Agregar el user_id al estado del formulario
    setFormData((prev) => ({ ...prev, user_id: user.id }));
  
    // Imprimir en consola para verificar el contenido
    console.log("Datos enviados:", formData);
  
    try {
      // Enviar el formulario usando fetch
      const res = await fetchRequest(`${Url}posts`,"POST",formData);
   
      console.log("Respuesta del servidor:", res);
    } catch (err) {
      console.error("Error al enviar el post:", err);
    }
  };
  

  // Contenido de tabs
  const tabs = {
    Text: <TextContent setContent={(content) => handleChange({ target: { name: "content", value: content } })} />,
    "Images & Video": <FileUpload onUpload={handleImageUpload} image={formData.image} />,
    Link: <Input placeholder="Escribe tu link" />,
  };

  return (
    <div className="h-100 text-white p-4 max-w-3xl mx-auto">
      <header className="flex justify-between mb-6">
        <h1 className="text-xl font-medium">Create Post</h1>
      </header>
      <select
        name="subreddit_id"
        onChange={handleChange}
        value={formData.subreddit_id}
        className="w-full p-2 rounded bg-zinc-900 mb-6"
      >
        <option value="" disabled>
          Select Subreddit
        </option>
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
          name="title"
          value={formData.title}
          onChange={handleChange}
          maxLength={300}
          className="bg-transparent border-none text-lg mb-4"
        />
        {tabs[activeTab]}
        <footer className="flex justify-end gap-3 mt-4">
          <Button className="text-gray-400 border border-zinc-700" variant="ghost">
            Save Draft
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-500 text-white" variant="ghost">
            Post
          </Button>
        </footer>
      </div>
    </div>
  );
}

// Componente para contenido de texto
const TextContent = ({ setContent }) => (
  <div className="border border-zinc-800 rounded-lg">
    <div className="flex items-center gap-1 p-2 border-b">
      {[Bold, Italic, Strikethrough, Link2, List, ListOrdered].map((Icon, i) => (
        <button key={i} className="h-8 w-8 p-0">
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
    <Textarea
      placeholder="Body"
      onChange={(e) => setContent(e.target.value)}
      className="min-h-[200px] bg-transparent"
    />
  </div>
);

// Componente para subir imágenes
const FileUpload = ({ onUpload, image }) => (
  image ? (
    <div className="relative h-48">
      <img src={URL.createObjectURL(image)} alt="Preview" className="object-contain h-full w-full rounded-lg" />
      <button
        onClick={() => onUpload({ target: { files: [] } })}
        className="absolute top-2 right-2 bg-red-500 text-white p-1"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  ) : (
    <input type="text" onChange={onUpload} className="form-control" />
  )
);
