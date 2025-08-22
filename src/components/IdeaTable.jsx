import { motion } from "framer-motion";

export default function IdeaTable({ ideas, loading }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="bg-[#1a1a1a] p-8 rounded-3xl shadow-lg border border-[#00FF85]/20"
    >
      <h2 className="text-3xl font-bold mb-6 text-white">
        Submitted Solutions
      </h2>
      <div className="h-[40vh] md:h-[53vh] overflow-y-auto custom-scrollbar"> 
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead>
              <tr className="bg-gray-800 text-[#00FF85] sticky top-0">
                <th className="p-4 font-semibold rounded-tl-xl w-16">#</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Idea / Solution</th>
                <th className="p-4 font-semibold rounded-tr-xl">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="border-t border-gray-800">
                  <td colSpan="4" className="text-center py-6 text-gray-400 italic">
                    Fetching records from the database. Please wait…
                  </td>
                </tr>
              ) : ideas.length === 0 ? (
                <tr className="border-t border-gray-800">
                  <td colSpan="4" className="text-center py-6 text-gray-400 italic">
                    No ideas submitted yet. Be the first to share your solution
                  </td>
                </tr>
              ) : (
                ideas.map((idea, index) => (
                  <motion.tr
                    key={idea.id}
                    variants={itemVariants}
                    className="border-t border-gray-800 transition-colors duration-300 hover:bg-[#00FF85]/10"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{idea.name}</td>
                    <td className="p-4">{idea.idea}</td>
                    <td className="p-4">
                      {new Date(idea.created_at).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
