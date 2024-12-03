import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Url } from "../../Url";
import { useAppContextInfo } from "../../PageContainer";
import { Message } from "../../Tools/Mensaje";


const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${className}`}
    {...props}
  />
));
Button.displayName = "Button";

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
));
Input.displayName = "Input";

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={`flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export default function CreateCommunityModal({ onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [step, setStep] = useState(0);
  const { user } = useAppContextInfo();

  const modalRef = useRef(null);
  const inputRef = useRef(null);

  // Manejar clics fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Enfocar el input al montar
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = async () => {
    const redditData = {
      name,
      description,
      photo,
      user_id: user.id,
    };
  
    console.log(redditData);
  
    try {
      const response = await fetch(`${Url}reddit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(redditData),
      });
  
      // Manejo de errores en el backend
      if (!response.ok) {
        const error = await response.text(); // Obtén el error como texto
        console.error("Error en la respuesta:", response.status, error);
        return;
      }
  
      // Manejo de la respuesta exitosa
      const result = await response.json();
      Message.successMessage(result.message)
      onClose();
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div ref={modalRef} className="relative bg-[#1a1a1b] rounded-lg max-w-2xl w-full">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-medium text-white mb-1">Tell us about your community</h2>
                <p className="text-sm text-gray-400">
                  A name and description help people understand what your community is all about.
                </p>
              </div>
              <Button className="text-gray-400 hover:text-white p-1" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <Input
                  ref={inputRef}
                  placeholder="Community name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={21}
                  className="bg-[#272729] text-white placeholder:text-gray-500 focus:border-[#343536]"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  {name.length}/21
                </div>
              </div>
              <div className="relative">
                <Input
                  ref={inputRef}
                  placeholder="Photo Url"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="bg-[#272729] text-white placeholder:text-gray-500 focus:border-[#343536]"
                />
                
              </div>
              <div className="relative">
                <Textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[160px] bg-[#272729] text-white placeholder:text-gray-500 focus:border-[#343536]"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-[240px] bg-[#272729] rounded-lg p-4">
            <div className="text-white mb-2">r/{name || 'communityname'}</div>
            <div className="flex gap-2 text-xs text-gray-400 mb-4">
              <span>1 member</span>
              <span>·</span>
              <span>1 online</span>
            </div>
            <div className="text-sm text-gray-400">
              {description || 'Your community description'}
            </div>
          </div>
        </div>
        <div className="border-t border-[#343536] p-4 flex items-center justify-between">
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((dot) => (
              <div
                key={dot}
                className={`w-2 h-2 rounded-full ${dot === step ? 'bg-white' : 'bg-gray-600'}`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <Button className="px-4 py-2 text-gray-400 hover:text-white" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={submit} className="px-4 py-2 bg-white text-black hover:bg-gray-200">
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
