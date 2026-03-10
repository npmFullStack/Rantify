import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const Home = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-montserrat bg-bgColor text-white min-h-screen">
      <Header scrollToSection={scrollToSection} />

      <main>
        {/* HERO */}
        <section className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <span className="text-primary">Rantify</span>
          </h1>

          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            A safe place to release your thoughts. Write a letter, read stories,
            and let your emotions flow freely.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => navigate("/read-letter")}
              className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-full font-medium transition"
            >
              Read Letters
            </button>

            <button
              onClick={() => navigate("/write-letter")}
              className="bg-secondary hover:bg-secondary/90 px-8 py-3 rounded-full font-medium transition"
            >
              Write Letter
            </button>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="container mx-auto px-6 py-28 text-center border-t border-gray-800"
        >
          <h2 className="text-4xl font-bold text-primary mb-6">
            About Rantify
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Rantify is a platform where people can freely express their thoughts
            and emotions through letters. Whether it's something you want to
            confess, share, or simply release from your mind — this is your
            space to be heard.
          </p>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="container mx-auto px-6 py-28 text-center border-t border-gray-800"
        >
          <h2 className="text-4xl font-bold text-primary mb-6">Contact</h2>

          <p className="text-gray-300 mb-8">
            Have questions or suggestions? We'd love to hear from you.
          </p>

          <button className="bg-primary px-8 py-3 rounded-full hover:bg-primary/90 transition">
            Send Message
          </button>
        </section>
      </main>
    </div>
  );
};

export default Home;
