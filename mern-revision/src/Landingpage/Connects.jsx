import X from '../assets/X.png';
import Git from '../assets/Github.png';
import Linked from '../assets/InkedIn.png';
import Insta from '../assets/Instagram.jpeg';

function Connects() {
  return (
    <div className="w-full bg-base-100 text-white py-16 px-4 flex flex-col items-center">
      <h1 className="text-3xl md:text-5xl font-semibold text-gray-200 text-center mb-12">
        Connect With Our Community 🚀
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
        {/* X (Twitter) */}
        <a
          href="#"
          className="flex flex-col items-center justify-center p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 shadow-md"
        >
          <img src={X} alt="X" className="w-12 h-12 mb-3 rounded-full" />
          <span className="text-sm font-medium text-gray-200">Twitter</span>
        </a>

        {/* GitHub */}
        <a
          href="#"
          className="flex flex-col items-center justify-center p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 shadow-md"
        >
          <img src={Git} alt="GitHub" className="w-12 h-12 mb-3 rounded-full" />
          <span className="text-sm font-medium text-gray-200">GitHub</span>
        </a>

        {/* LinkedIn */}
        <a
          href="#"
          className="flex flex-col items-center justify-center p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 shadow-md"
        >
          <img src={Linked} alt="LinkedIn" className="w-12 h-12 mb-3 rounded-full" />
          <span className="text-sm font-medium text-gray-200">LinkedIn</span>
        </a>

        {/* Instagram */}
        <a
          href="#"
          className="flex flex-col items-center justify-center p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 shadow-md"
        >
          <img src={Insta} alt="Instagram" className="w-12 h-12 mb-3 rounded-full" />
          <span className="text-sm font-medium text-gray-200">Instagram</span>
        </a>
      </div>
    </div>
  );
}

export default Connects;
