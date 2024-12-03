import { useState } from "react";
import Account from "../Components/Settings/Account";
import Profile from "../Components/Settings/Profile";
import Notifications from "../Components/Settings/Notifications";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Account");

  const tabs = [
    { label: "Account", component: <Account /> },
    { label: "Profile", component: <Profile /> },
    { label: "Notifications", component: <Notifications /> },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1b] text-white">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-medium mb-6">Settings</h1>
        {/* Navigation Tabs */}
        <div className="border-b border-[#343536] mb-8">
          <nav className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                className={`pb-4 text-sm ${
                  activeTab === tab.label
                    ? "border-b-2 border-white text-white"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab(tab.label)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Active Tab Content */}
        <div>{tabs.find((tab) => tab.label === activeTab)?.component}</div>
      </div>
    </div>
  );
}
