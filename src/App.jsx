import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import IdeaForm from "./components/IdeaForm";
import IdeaTable from "./components/IdeaTable";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [ideas, setIdeas] = useState([]);
  const [loadingIdeas, setLoadingIdeas] = useState(true);

  // Fetch ideas from Laravel API
  const fetchIdeas = async () => {
    try {
      setLoadingIdeas(true);
      const res = await fetch(`${import.meta.env.VITE_LARAVEL_API}/ideas`);
      if (!res.ok) throw new Error("Failed to fetch ideas");
      const data = await res.json();
      setIdeas(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingIdeas(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  // After new idea is added → reload from DB
  const handleAdd = () => {
    fetchIdeas();
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-6 font-sans">
      <Preloader />
      <div className="max-w-7xl mx-auto py-8">
        {/* Responsive Layout Container */}
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Form Section */}
          <div className="flex-1 lg:sticky lg:top-8 lg:h-fit mb-8 lg:mb-0">
            <IdeaForm onAdd={handleAdd} />
          </div>

          {/* Data Table Section */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <IdeaTable ideas={ideas} loading={loadingIdeas} />
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
