import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function IdeaForm({ onAdd }) {
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Custom dark theme swal
  const getCustomSwal = () => {
    return Swal.mixin({
      background: "#1a1a1a",
      color: "#fff",
      confirmButtonColor: "#00FF85",
      cancelButtonColor: "#555",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !idea) {
      toast.error("Please complete all required fields before submitting.");
      return;
    }

    const MySwal = getCustomSwal();

    // Confirmation dialog
    const confirm = await MySwal.fire({
      title: "Confirm Submission",
      text: "Do you want to submit your idea? Once submitted, it will be shared with the community.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
      cancelButtonText: "Cancel",
      backdrop: true,
      backdrop: `
          rgba(0,0,0,0.7)
          url("/images/loading.gif")
          center top
          no-repeat
        `,
      didOpen: () => {
        document.body.style.overflow = "auto";
      },
      willClose: () => {
        document.body.style.overflow = "";
      },
    });

    if (!confirm.isConfirmed) return;

    try {
      setSubmitting(true);

      // Show saving state in Swal
      MySwal.fire({
        title: "Submitting...",
        text: "Please wait while we save your idea.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
        backdrop: true,
        backdrop: `
          rgba(0,0,0,0.7)
          url("/images/loading.gif")  
          center top
          no-repeat
        `,
        willClose: () => {
          document.body.style.overflow = "";
        },
      });

      const res = await fetch(`${import.meta.env.VITE_LARAVEL_API}/ideas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, idea }),
      });

      if (!res.ok) throw new Error("Failed to add idea");

      const data = await res.json();
      onAdd(data);

      setName("");
      setIdea("");

      Swal.close(); // Close the saving state
      toast.success(
        "Your idea has been submitted successfully. Thank you for contributing!"
      );
    } catch (err) {
      console.error(err);
      Swal.close();
      toast.error(
        "An error occurred while submitting your idea. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="bg-[#1a1a1a] p-8 rounded-3xl shadow-lg border border-[#00FF85]/20"
    >
      <h2 className="text-3xl font-bold mb-4 text-white">
        Share Your Ideas & Solutions
      </h2>
      <p className="text-md text-gray-400 mb-6">
        What challenges are you facing that technology could help solve? Whether
        it’s a website, app, automation tool, or AI-driven solution — share your
        idea with us!
      </p>

      <div className="grid gap-6">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#0D0D0D] text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00FF85] transition-all duration-300 placeholder-gray-500"
        />
        <textarea
          placeholder="Your Idea or Solution"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          rows="5"
          className="bg-[#0D0D0D] text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00FF85] transition-all duration-300 placeholder-gray-500 resize-none"
        />
        <motion.button
          type="submit"
          disabled={submitting}
          className="bg-[#00FF85] hover:bg-green-400 text-[#0D0D0D] font-bold py-3 rounded-xl shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50"
        >
          {submitting ? "Processing..." : "Submit"}
        </motion.button>
      </div>
    </motion.form>
  );
}
