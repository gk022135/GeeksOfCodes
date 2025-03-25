import React from "react";

const Explore = () => {
    const exploreItems = [
        {
            title: "Web Development",
            description: "Learn about React, Next.js, Node.js, and more.",
            image: "https://www.google.com/imgres?q=computer%20science&imgurl=https%3A%2F%2Fwww.mtu.edu%2Fcs%2Fwhat%2Fimages%2Fwhat-is-computer-science-banner1600.jpg&imgrefurl=https%3A%2F%2Fwww.mtu.edu%2Fcs%2Fwhat%2F&docid=05qVFuCbBFajQM&tbnid=huGiYefA2ScbZM&vet=12ahUKEwjE2dXv06SMAxXW4TgGHd4uMy4QM3oECGMQAA..i&w=1600&h=720&hcb=2&ved=2ahUKEwjE2dXv06SMAxXW4TgGHd4uMy4QM3oECGMQAA",
        },
        {
            title: "Artificial Intelligence",
            description: "Explore AI, Machine Learning, and Deep Learning.",
            image: "https://source.unsplash.com/300x200/?ai,robot",
        },
        {
            title: "Cyber Security",
            description: "Stay updated on ethical hacking and security trends.",
            image: "https://source.unsplash.com/300x200/?cyber,security",
        },
        {
            title: "Cloud Computing",
            description: "Understand AWS, Azure, Google Cloud, and DevOps.",
            image: "https://source.unsplash.com/300x200/?cloud,server",
        },
        {
            title: "Blockchain",
            description: "Dive into the world of cryptocurrency and smart contracts.",
            image: "https://source.unsplash.com/300x200/?blockchain,crypto",
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Explore Topics</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {exploreItems.map((item, index) => (
                    <div key={index} className="bg-white/20 text-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                        <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{item.title}</h2>
                            <p className="text-white/50">{item.description}</p>
                            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Explore More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Explore;
