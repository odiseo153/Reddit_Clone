import { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { useAppContextInfo } from "../../PageContainer";
import { Url } from "../../Url";
import { fetchRequest } from "../../Tools/FetchBody";
import { Message } from "../../Tools/Mensaje";
import LoadingSpinner from "../Loading";
import { Modal } from "./Modal";


export default function Profile() {
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    description: "",
    photo: "",
    banner: "",
  });
  const {user,setUser} = useAppContextInfo();

  const userId = user.id; // Reemplaza esto con el ID real del usuario

  const handleOpenModal = (modalType) => {
    setActiveModal(modalType);
    setFormData(user);
  };

  const handleCloseModal = () => setActiveModal("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetchRequest(`${Url}users/${userId}`,'PUT',formData);
      Message.successMessage("Informacion actualizada correctamente");
      setUser(response);
      setLoading(false);
      handleCloseModal();
    } catch (error) {
      console.error("Error updating profile:", error);
      Message.errorMessage("Hubo un error ")
    }
  };

  const menuItems = [
    { label: "Display Name", key: "username", description: "Change your username" },
    { label: "About Description", key: "description", description: "Update your description" },
    { label: "Avatar", key: "photo", description: "Upload your avatar" },
  ];



  return (
    <div className="min-h-screen bg-[#1a1a1b] text-white">
      <div className="max-w-4xl mx-auto p-2">
        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-medium mb-6">General</h2>
            <div className="space-y-4">
              {menuItems.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleOpenModal(item.key)}
                  className="flex items-center justify-between py-3 hover:bg-[#272729] px-4 -mx-4 rounded cursor-pointer"
                >
                  <div>
                    <p>{item.label}</p>
                    {item.description && (
                      <span className="text-gray-400">{item.description}</span>
                    )}
                  </div>
                  <ChevronRight className="h-5 w-5 ml-2" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Modals */}
      {menuItems.map((item) => (
        <div>
        {!loading ? 
        <Modal
        key={item.key}
          isOpen={activeModal === item.key}
          onClose={handleCloseModal}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Edit {item.label}</h2>
            <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-200">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="mb-4 text-gray-400">{item.description}</p>
          <input
            type={item.key === "photo" ? "url" : "text"}
            value={formData[item.key]}
            onChange={(e) => handleInputChange(item.key, e.target.value)}
            placeholder={`Enter your ${item.label.toLowerCase()}`}
            className="w-full px-4 py-2 rounded bg-[#2b2b2d] text-white mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-500"
              >
              Save
            </button>
          </div>
        </Modal>
        :
        <LoadingSpinner />
        }
      </div>
      ))}
    </div>
  );
}


