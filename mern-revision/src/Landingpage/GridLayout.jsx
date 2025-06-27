import { useEffect } from "react";

export default function GridCards() {

  const cards = [
    {
      title: "Know how Qr works",
      description: "Boost your DSA skills with our handy cheat sheets.",
      icon: "📄",
      url: "/Qr-working-docs",
    },
    {
      title: "Attendance Marking Student",
      description:
        "Students can mark their attendance and keep track of their attendance percentage in each subject.",
      icon: "🏗️",
      url: "/attendace-marking-docs",
    },
    {
      title: "Class Create Teacher",
      description:
        "For faculty to easily take attendance and manage classrooms. Teachers can create classes.",
      icon: "✍️",
      url: "/class-creating-docs",
    },
    {
      title: "GatePass Working",
      description: "Understand how the Entry-Exit system works at the gate.",
      icon: "▶️",
      url: "/gatepss-working-docs",
    },
    {
      title: "Code Collaborator",
      description:
        "Upcoming feature to collaboratively write and manage code.",
      icon: "💻",
      url: "",
    },
    {
      title: "Advanced Todo",
      description: "Get an overview of our advanced Todo app.",
      icon: "⏳",
      url: "",
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const particles = document.querySelectorAll(".particle");
      particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.02;
        const x = e.clientX * speed;
        const y = e.clientY * speed;
        particle.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className=" flex items-center justify-center bg-base-100 px-6 py-10">


      <style jsx>{`
        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 40px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(124, 58, 237, 0.2);
          border-color: rgba(124, 58, 237, 0.3);
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: left 0.5s ease;
        }

        .feature-card:hover::before {
          left: 100%;
        }
      `}</style>

      <div className="feature grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        {cards.map((card, index) => (
          <div key={index} className="feature-card text-white">
            <div className="text-4xl p-3 rounded-lg">
              {card.icon}
            </div>
            <h2 className="text-lg font-semibold mt-4">{card.title}</h2>
            <p className="text-gray-300 text-sm mt-2">{card.description}</p>
            <button
              disabled={!card.url}
              onClick={() => window.open(card.url, "_blank")}
              className="mt-4 border border-white px-4 py-2 rounded-lg text-white hover:bg-white hover:text-black transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {card.url ? "Try it free →" : "Coming Soon"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
