export default function GridCards() {
    const cards = [
      {
        title: "Know how Qr works",
        description: "Boost your DSA skills with our handy cheat sheets.",
        icon: "📄",
      },
      {
        title: "Attendace Marking Student",
        description: "student will able to mark their attendance and keep track of percentage of attendance they have in each subject",
        icon: "🏗️",
      },
      {
        title: "Class Create Teacher",
        description: "For faculty ame easy for Attendance taking and managing a class room, teacher can create class.",
        icon: "✍️",
      },
      {
        title: "GatePass Working",
        description: "How Entry exit system works at Gate.",
        icon: "▶️",
      },
      {
        title: "Code Collabrotor",
        description: "Up coming feature for make code in collabrative mamnner.",
        icon: "💻",
      },
      {
        title: "Advanced Todo",
        description: "Take A overview of our advacned Todo",
        icon: "⏳",
      },
    ];
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {cards.map((card, index) => (
            <div key={index} className="bg-gray-900 text-white p-6 rounded-xl shadow-lg flex flex-col items-start">
              <div className="text-4xl bg-gray-800 p-3 rounded-lg">{card.icon}</div>
              <h2 className="text-lg font-semibold mt-4">{card.title}</h2>
              <p className="text-gray-400 text-sm mt-2">{card.description}</p>
              <button className="mt-4 border border-white px-4 py-2 rounded-lg text-white hover:bg-white hover:text-black transition">
                Try it free →
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  