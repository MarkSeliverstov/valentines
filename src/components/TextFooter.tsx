import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin", "cyrillic"],
});

export default function TextFooter() {
  return (
    <>
      {/* Left Text */}
      <h1
        className={`absolute left-2 sm:left-6 lg:left-10 bottom-3 sm:bottom-5 transform -translate-y-1/2 text-white text-sm sm:text-xl md:text-2xl lg:text-5xl font-bold leading-tight ${playfairDisplay.className}`}
      >
        <span className="text-gray-400">Собери</span> <br /> пары фотографий
      </h1>

      {/* Right Text */}
      <h1
        className={`absolute right-2 sm:right-6 lg:right-10 bottom-3 sm:bottom-5 transform -translate-y-1/2 text-white text-sm sm:text-xl md:text-2xl lg:text-5xl font-bold leading-tight text-right ${playfairDisplay.className}`}
      >
        чтобы увидеть <br /> <span className="text-gray-400">сюрприз</span>
      </h1>
    </>
  );
}
