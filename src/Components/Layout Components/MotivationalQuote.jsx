import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = [
  "The", "🌎 world", "is", "a", "📖 book, ", "and", "those", "who", "do", "not", "🧳✈️ travel", "read", "only", "one", "page"
]; // The world is a book, and those who do not travel read only one page.

const MotivationalQuote = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("quote");
      const rect = section.getBoundingClientRect();
      // Trigger when section is in middle of viewport
      if (rect.top < window.innerHeight / 1.2 && rect.bottom > 0) {
        setInView(true);
      } else {
        setInView(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
  id="quote"
  className="w-screen h-screen bg-black flex justify-center items-center px-6"
>
  <div className="flex flex-wrap gap-4 text-4xl md:text-6xl lg:text-7xl font-bold justify-center max-w-6xl text-center leading-tight">
    {words.map((word, index) => (
      <motion.span
        key={index}
        initial={{ color: "#6b7280" }} // gray-500
        animate={{ color: inView ? "#ffffff" : "#6b7280" }}
        transition={{ delay: index * 0.15, duration: 0.5 }}
      >
        {word}
      </motion.span>
    ))}
  </div>
</section>
  );
};

export default MotivationalQuote;
