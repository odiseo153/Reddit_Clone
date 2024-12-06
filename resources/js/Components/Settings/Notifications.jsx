
import { useState } from "react";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "../Button";


export default function Notifications() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="min-h-screen bg-[#1a1a1b] text-white">
      <div className="max-w-4xl mx-auto p-2">
      
        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-medium mb-6">General</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 hover:bg-[#272729] px-4 -mx-4 rounded cursor-pointer">
                <div>Email address</div>
                <div className="flex items-center text-gray-400">
                  <span>odiseorincon@gmail.com</span>
                  <ChevronRight className="h-5 w-5 ml-2" />
                </div>
              </div>
              <div className="flex items-center justify-between py-3 hover:bg-[#272729] px-4 -mx-4 rounded cursor-pointer">
                <div>Gender</div>
                <div className="flex items-center text-gray-400">
                  <span>Man</span>
                  <ChevronRight className="h-5 w-5 ml-2" />
                </div>
              </div>
              <div className="flex items-center justify-between py-3 hover:bg-[#272729] px-4 -mx-4 rounded cursor-pointer">
                <div>Location customization</div>
                <div className="flex items-center text-gray-400">
                  <span>Use approximate location (based on IP)</span>
                  <ChevronRight className="h-5 w-5 ml-2" />
                </div>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-medium mb-6">Account authorization</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div>
                  <div>Google</div>
                  <div className="text-sm text-gray-400">Connect to log in to Reddit with your Google account</div>
                </div>
                <Button className="bg-transparent border border-[#343536] text-white px-4 py-1.5 hover:border-white">
                  Disconnect
                </Button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div>Apple</div>
                  <div className="text-sm text-gray-400">Connect to log in to Reddit with your Apple account</div>
                </div>
                <Button className="bg-white text-black px-4 py-1.5 hover:bg-gray-200">
                  Connect
                </Button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div>Two-factor authentication</div>
                  <div className="text-sm text-gray-400">
                    Lost access to your authenticator app?{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Access your backup codes
                    </a>
                  </div>
                </div>
                <Button className="bg-transparent border border-[#343536] text-white px-4 py-1.5 hover:border-white flex items-center gap-2">
                  Enable
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-medium mb-6">Subscriptions</h2>
            <div className="flex items-center justify-between py-3 hover:bg-[#272729] px-4 -mx-4 rounded cursor-pointer">
              <div>Get Premium</div>
              <ExternalLink className="h-5 w-5 text-gray-400" />
            </div>
          </section>
          <section>
            <h2 className="text-xl font-medium mb-6">Advanced</h2>
            <div className="flex items-center justify-between py-3 hover:bg-[#272729] px-4 -mx-4 rounded cursor-pointer">
              <div className="text-red-500">Delete account</div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}