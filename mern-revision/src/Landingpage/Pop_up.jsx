import { motion } from "framer-motion";

function Pop_up({ close }) {
  return (
    <div className="fixed inset-0 bg-base-100/50 50 bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          🎉 Hello ji, it’s working!
        </h2>
        <p className="text-gray-600 mb-6">
          Please log in to unlock some cool new features 🔓✨
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={close}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
          >
            Close
          </button>
          <a href="/signup"
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Sign up / Login
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default Pop_up;
