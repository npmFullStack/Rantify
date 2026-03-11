import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PenLine, BookOpen, Heart, MessageCircle, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  useEffect(() => {
    // Check if we need to scroll to a section
    if (location.state?.scrollTo) {
      scrollToSection(location.state.scrollTo);
      // Clear the state to prevent scrolling on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Add scroll event listener for active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-bgColor text-white">
      <Header scrollToSection={scrollToSection} />

      <main className="pt-16">
        {" "}
        {/* Added padding-top to account for fixed header */}
        {/* HERO SECTION - min-h-screen */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

          {/* Animated circles */}
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />

          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
            }}
          />

          <motion.div
            className="container mx-auto text-center relative z-10"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              variants={fadeInUp}
            >
              Welcome to{" "}
              <span className="text-primary relative inline-block">
                Rantify
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              A safe place to release your thoughts. Write a letter, read
              stories, and let your emotions flow freely in a judgment-free
              space.
            </motion.p>

            <motion.div
              className="flex justify-center gap-4 md:gap-6 flex-wrap"
              variants={fadeInUp}
            >
              <motion.button
                onClick={() => navigate("/read-letter")}
                className="btn-primary flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen
                  size={20}
                  className="group-hover:rotate-12 transition"
                />
                Read Letters
              </motion.button>

              <motion.button
                onClick={() => navigate("/write-letter")}
                className="btn-secondary flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PenLine
                  size={20}
                  className="group-hover:rotate-12 transition"
                />
                Write Letter
              </motion.button>
            </motion.div>
          </motion.div>
        </section>
        {/* ABOUT SECTION - min-h-screen */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center px-6 py-20 border-t border-gray-800 relative"
        >
          <div className="container mx-auto">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Left side - Text content */}
              <div>
                <motion.h2
                  className="section-title text-primary"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  About Rantify
                </motion.h2>

                <motion.p
                  className="text-gray-300 text-lg leading-relaxed mb-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Rantify is more than just a platform — it's a community where
                  people can freely express their thoughts and emotions through
                  letters. Whether it's something you want to confess, share, or
                  simply release from your mind, this is your space to be heard
                  without judgment.
                </motion.p>

                <motion.div
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <Heart className="text-primary mb-2" size={24} />
                    <h3 className="font-semibold mb-1">Safe Space</h3>
                    <p className="text-sm text-gray-400">
                      Anonymous and judgment-free
                    </p>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <MessageCircle className="text-secondary mb-2" size={24} />
                    <h3 className="font-semibold mb-1">Express Freely</h3>
                    <p className="text-sm text-gray-400">Share without fear</p>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <Users className="text-primary mb-2" size={24} />
                    <h3 className="font-semibold mb-1">Community</h3>
                    <p className="text-sm text-gray-400">Connect with others</p>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <BookOpen className="text-secondary mb-2" size={24} />
                    <h3 className="font-semibold mb-1">Read & Write</h3>
                    <p className="text-sm text-gray-400">Share your story</p>
                  </div>
                </motion.div>
              </div>

              {/* Right side - Stats/Image */}
              <motion.div
                className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-2xl backdrop-blur-sm"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold mb-6">Our Impact</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">Letters Written</span>
                      <span className="text-primary font-bold">10,000+</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 1 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">Active Readers</span>
                      <span className="text-secondary font-bold">5,000+</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-secondary h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "70%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, duration: 1 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">Community Stories</span>
                      <span className="text-primary font-bold">3,500+</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "60%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 1 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        {/* CONTACT SECTION - min-h-screen */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center px-6 py-20 border-t border-gray-800"
        >
          <div className="container mx-auto max-w-4xl">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title text-primary">Contact</h2>
              <p className="text-gray-300 text-lg">
                Have questions or suggestions? We'd love to hear from you.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-900/50 rounded-2xl p-8 backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-bgColor border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-bgColor border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-bgColor border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-primary w-full md:w-auto px-12"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
