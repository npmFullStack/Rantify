import React, { useState } from "react";
import Header from "@/components/Header";
import { Send } from "lucide-react";

const WriteLetter = () => {
  const [title, setTitle] = useState("");
  const [letter, setLetter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      title,
      letter,
    });

    alert("Letter submitted!");

    setTitle("");
    setLetter("");
  };

  return (
    <div className="bg-bgColor min-h-screen text-white">
      <Header />

      <main className="container mx-auto px-6 py-16 max-w-2xl">
        <h1 className="text-4xl font-bold text-primary mb-10 text-center">
          Write a Letter
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-black/30 border border-gray-800 p-8 rounded-xl space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block mb-2 text-gray-300">Title</label>
            <input
              type="text"
              placeholder="Your letter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:outline-none focus:border-primary"
              required
            />
          </div>

          {/* Letter */}
          <div>
            <label className="block mb-2 text-gray-300">Your Letter</label>
            <textarea
              rows="6"
              placeholder="Write what you feel..."
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 focus:outline-none focus:border-primary"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 px-6 py-3 rounded-full w-full font-medium transition"
          >
            <Send size={18} />
            Send Letter
          </button>
        </form>
      </main>
    </div>
  );
};

export default WriteLetter;
