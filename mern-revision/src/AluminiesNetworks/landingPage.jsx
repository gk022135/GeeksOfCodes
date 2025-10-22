import React from "react";
import { Users, Briefcase, Calendar, MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPageAlumni() {
  return (
    <div className="min-h-screen w-full bg-[#0e0f12] text-gray-100 flex flex-col">
      {/* --- Hero Section --- */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-[#121318] to-[#0e0f12]">
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
          Connect. Collaborate. <span className="text-blue-500">Grow Together.</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-8">
          Welcome to <span className="text-blue-400 font-semibold">Alumni Network</span> —
          a platform for graduates, students, and faculty to share opportunities,
          build mentorships, and stay connected beyond campus.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Join the Network
          </Link>
          <Link
            to="/login"
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-6 py-3 rounded-xl font-medium transition"
          >
            Log In
          </Link>
        </div>
      </section>

      {/* --- Why Join Section --- */}
      <section className="py-20 px-6 bg-[#101217]">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Why Join Our Alumni Network?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Users className="text-blue-500" size={36} />}
            title="Reconnect"
            text="Find and reconnect with your batchmates and professors easily."
          />
          <FeatureCard
            icon={<Briefcase className="text-blue-500" size={36} />}
            title="Career Growth"
            text="Discover job opportunities and mentorship programs from alumni leaders."
          />
          <FeatureCard
            icon={<Calendar className="text-blue-500" size={36} />}
            title="Events & Meetups"
            text="Join reunions, webinars, and alumni conferences around the globe."
          />
          <FeatureCard
            icon={<MessageSquare className="text-blue-500" size={36} />}
            title="Community"
            text="Engage in discussions, share updates, and build lifelong networks."
          />
        </div>
      </section>

      {/* --- Success Stories --- */}
      <section className="py-20 px-6 bg-[#0e0f12] border-t border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Alumni Success Stories
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <StoryCard
            name="Aarav Mehta"
            title="Product Manager at Google"
            quote="The alumni network helped me find my first mentor and grow into my dream role."
            image="https://randomuser.me/api/portraits/men/32.jpg"
          />
          <StoryCard
            name="Priya Sharma"
            title="Data Scientist at Microsoft"
            quote="Connecting with seniors opened doors to internships and global opportunities."
            image="https://randomuser.me/api/portraits/women/45.jpg"
          />
          <StoryCard
            name="Rahul Verma"
            title="Founder, EduConnect"
            quote="The community inspired me to start my own EdTech venture and give back."
            image="https://randomuser.me/api/portraits/men/65.jpg"
          />
        </div>
      </section>

      {/* --- Upcoming Events --- */}
      <section className="py-20 px-6 bg-[#101217] border-t border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Upcoming Events
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          <EventCard
            date="Nov 5, 2025"
            title="Global Alumni Summit 2025"
            description="Reconnect with your batchmates, join leadership talks, and celebrate success stories."
          />
          <EventCard
            date="Dec 15, 2025"
            title="Career Networking Webinar"
            description="Join top industry experts and alumni leaders for an inspiring discussion on career paths."
          />
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#0b0c0e] text-center py-10 border-t border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4">Stay Connected</h3>
        <p className="text-gray-400 mb-6">
          Join the Alumni Network today and be part of a growing community of achievers.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          Join Now <ArrowRight size={18} />
        </Link>

        <p className="text-gray-600 text-sm mt-8">© 2025 Alumni Network. All rights reserved.</p>
      </footer>
    </div>
  );
}

/* --- Subcomponents --- */
function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-[#1a1c22] p-6 rounded-xl border border-gray-800 hover:border-blue-500 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  );
}

function StoryCard({ name, title, quote, image }) {
  return (
    <div className="bg-[#1a1c22] p-6 rounded-xl border border-gray-800 hover:border-blue-500 transition">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-full mb-4 object-cover border border-gray-700"
      />
      <p className="text-gray-300 italic mb-3">“{quote}”</p>
      <h4 className="text-white font-semibold">{name}</h4>
      <p className="text-gray-500 text-sm">{title}</p>
    </div>
  );
}

function EventCard({ date, title, description }) {
  return (
    <div className="bg-[#1a1c22] p-6 rounded-xl border border-gray-800 hover:border-blue-500 transition">
      <p className="text-blue-400 text-sm font-medium mb-1">{date}</p>
      <h4 className="text-white text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
