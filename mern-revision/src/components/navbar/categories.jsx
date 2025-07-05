import React from "react";

const categories = [
  "System Design",
  "Web Development",
  "AWS",
  "AWS S3",
  "Kubernetes",
  "Docker",
  "Redis",
  "RabbitMQ",
  "CI/CD",
  "PostgreSQL",
  "MongoDB",
  "Microservices",
];

export default function CategoryCards() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-50 antialiased">Explore Topics</h2>

      {/* Grid for first 6 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {categories.slice(0, 6).map((cat, idx) => (
          <div
            key={idx}
            className="bg-base-100 hover:border-blue-700 border border-gray-300/20 rounded-xl shadow-md p-4 transition-all cursor-pointer"
          >
            <h3 className="text-md font-medium text-white antialiased">{cat}</h3>
          </div>
        ))}
      </div>

      {/* Row for the rest */}
      <div className="space-y-3">
        {categories.slice(6).map((cat, idx) => (
          <div
            key={idx}
            className="bg-base-100 hover:border-blue-700 border border-gray-300/20 rounded-xl shadow-sm p-3 transition-all cursor-pointer flex items-center justify-between text-gray-200 antialiased"
          >
            <span className="text-gray-500">{cat}</span>
            <span className="text-sm text-blue-500">View Posts →</span>
          </div>
        ))}
      </div>
    </div>
  );
}
