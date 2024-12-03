import { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import axios from "axios";
import { useAppContextInfo } from "../../PageContainer";
import { Url } from "../../Url";

export default function Profile() {
  const [activeModal, setActiveModal] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    description: "",
    photo: "",
  });
  const {user} = useAppContextInfo();

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
    try {
      await axios.put(`${Url}user/${userId}`, formData);
      alert("Profile updated successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const menuItems = [
    { label: "Display Name", key: "username", description: "Change your username" },
    { label: "About Description", key: "description", description: "Update your bio" },
    { label: "Avatar", key: "photo", description: "Upload your avatar" },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1b] text-white">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-medium mb-6">Profile</h1>

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
      ))}
    </div>
  );
}

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1a1a1b] rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
        {children}
      </div>
    </div>
  );
}
