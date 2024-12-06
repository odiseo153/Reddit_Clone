
import { useState } from "react";
import { ChevronRight, ExternalLink, X } from "lucide-react";
import { Modal } from "./Modal";
import { useAppContextInfo } from "../../PageContainer";
import { Message } from "../../Tools/Mensaje";
import LoadingSpinner from "../Loading";
import { fetchRequest } from "../../Tools/FetchBody";
import { Url } from "../../Url";


export default function Account() {
  const [activeTab, setActiveTab] = useState("account");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    description: "",
    photo: "",
    banner: "",
  });
  const { user, setUser } = useAppContextInfo();

  const userId = user?.id; // Reemplaza esto con el ID real del usuario

  const handleOpenModal = (modalType) => {
    setActiveTab(modalType);
    setFormData(user);
  };

  const handleCloseModal = () => setActiveTab("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const DestroyAccount = async () => {
    if(window.confirm("¿Estas seguro de que quieres eliminar tu cuenta?")){
      try {
        const response = await fetchRequest(`${Url}users/${userId}`, 'DELETE', formData);
        Message.successMessage(response.message);
        setLoading(false);
        handleCloseModal();
        setUser(null);
        await fetchRequest(`${Url}logout`, 'POST');
        window.location.href = "/";
      } catch (error) {
        console.error("Error updating profile:", error);
        Message.errorMessage("Hubo un error ")
      }
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetchRequest(`${Url}users/${userId}`, 'PUT', formData);
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
    { label: "Email address", key: "email" },
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

          {menuItems.map((item) => (
            <div>
              {!loading ?
                <Modal
                  key={item.key}
                  isOpen={activeTab === item.key}
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


          <section>
            <h2 className="text-xl font-medium mb-6">Advanced</h2>
            <div onClick={DestroyAccount} className="flex items-center justify-between py-3 hover:bg-[#272729] px-4 -mx-4 rounded cursor-pointer">
              <div onClick={DestroyAccount} className="text-red-500">Delete account</div>
              <ChevronRight  className="h-5 w-5 text-gray-400" />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}