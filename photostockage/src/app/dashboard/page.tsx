"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Upload,
  Users,
  MessageSquare,
  User,
  LogOut,
  Heart,
  Download,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import AddPhotoForm from "../components/dashboard/user/AddPhotoForm";
import { MyPhotos } from "../components/dashboard/user/MyPhotos";
import { Downloads } from "../components/dashboard/user/Downloads";

const Photos = () => <div className="p-4">Photos Management</div>;
const Comments = () => <div className="p-4">Comments Management</div>;
const UsersManagement = () => <div className="p-4">Users Management</div>;
const MyFavorites = () => <div className="p-4">My Favorites</div>;
const MyAccount = () => <div className="p-4">My Account</div>;

// Menu configurations for different roles
const adminMenuOptions = [
  { id: "account", label: "My Account", icon: User, component: MyAccount },
  { id: "photos", label: "Photos", icon: Upload, component: Photos },
  {
    id: "comments",
    label: "Comments",
    icon: MessageSquare,
    component: Comments,
  },
  { id: "users", label: "Users", icon: Users, component: UsersManagement },
  { id: "logout", label: "Logout", icon: LogOut, component: null },
];

const userMenuOptions = [
  { id: "account", label: "My Account", icon: User, component: MyAccount },
  { id: "addPhoto", label: "Add Photo", icon: Plus, component: AddPhotoForm },
  { id: "myPhotos", label: "My Photos", icon: Upload, component: MyPhotos },
  {
    id: "myComment",
    label: "My Comments",
    icon: MessageSquare,
    component: Comments,
  },
  {
    id: "favorites",
    label: "My Favorites",
    icon: Heart,
    component: MyFavorites,
  },
  {
    id: "downloads",
    label: "My Downloads",
    icon: Download,
    component: Downloads,
  },
  { id: "logout", label: "Logout", icon: LogOut, component: null },
];

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "user" | null>(null);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const tokenExpires = localStorage.getItem("tokenExpires");
      const userId = localStorage.getItem("userId");
      const isAuthenticated =
        isLoggedIn && tokenExpires && Number(tokenExpires) > Date.now();

      if (!isAuthenticated || !userId) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/user/user/${userId}`,
          {
            credentials: "include",
            headers: { Accept: "application/json" },
          }
        );
        const data = await response.json();
        const user = data[0];
        const role = user.access_level ? "admin" : "user";
        setUserRole(role);

        const menuOptions =
          role === "admin" ? adminMenuOptions : userMenuOptions;
        setSelectedOption(menuOptions[0]);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login");
      }
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);
    window.addEventListener("logoutEvent", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("logoutEvent", checkAuth);
    };
  }, [router]);

  const handleOptionClick = (option: (typeof adminMenuOptions)[0]) => {
    if (option.id === "logout") {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("tokenExpires");
      router.push("/login");
      return;
    }

    // For direct menu clicks, just update component and reset URL
    router.push("/dashboard");
    setSelectedOption(option);
    setIsMenuOpen(false);
  };

  if (!userRole || !selectedOption) {
    return <div>Loading...</div>;
  }

  const menuOptions = userRole === "admin" ? adminMenuOptions : userMenuOptions;

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="lg:hidden fixed right-4 top-4 z-50 p-2 rounded-md hover:bg-gray-100"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay and Menu code stays the same */}

      <div className="flex">
        {/* Desktop Sidebar */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:block w-64 bg-white shadow-lg fixed top-0 left-0 z-50 overflow-y-auto lg:relative h-[100vh]`}
        >
          <nav className="mt-4">
            {menuOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors flex items-center gap-2
                  ${
                    selectedOption.id === option.id
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-700"
                  }
                `}
              >
                <option.icon className="w-5 h-5" />
                {option.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300
          ${isMenuOpen ? "blur-sm lg:blur-none" : ""} min-h-[100vh]`}
        >
          <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">
              {selectedOption.label}
            </h1>
            {selectedOption.component && <selectedOption.component />}
          </div>
        </main>
      </div>
    </div>
  );
}