"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

// DEBUG MODE: Set to true for easy testing (only 2 pairs = 4 cards)
const DEBUG_MODE = true;

// 18 images
const images = [
  "/game-photos/1.avif",
  "/game-photos/2.avif",
  "/game-photos/3.avif",
  "/game-photos/4.avif",
  "/game-photos/5.avif",
  "/game-photos/6.avif",
  "/game-photos/7.avif",
  "/game-photos/8.avif",
  "/game-photos/9.avif",
  "/game-photos/10.avif",
  "/game-photos/11.avif",
  "/game-photos/12.avif",
  "/game-photos/13.avif",
  "/game-photos/14.avif",
  "/game-photos/15.avif",
  "/game-photos/16.avif",
  "/game-photos/17.avif",
  "/game-photos/18.avif",
];

// Create pairs: Debug mode = 2 pairs (4 cards), Normal = 18 pairs (36 cards)
const imagePairs = DEBUG_MODE
  ? images.slice(0, 2).flatMap((image) => [image, image])
  : images.flatMap((image) => [image, image]);

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Heart layout for full game (36 cards)
const fullHeartLayout = [
  [null, null, 0, 1, null, 2, 3, null, null],
  [null, 4, 5, 6, 7, 8, 9, 10, null],
  [11, 12, 13, 14, 15, 16, 17, 18, 19],
  [null, 20, 21, 22, 23, 24, 25, 26, null],
  [null, null, 27, 28, 29, 30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, null, 35, null, null, null, null],
];

// Simple layout for debug mode (4 cards)
const debugLayout = [
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, 0, 1, null, null, null],
  [null, null, null, null, 2, 3, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
];

const heartLayout = DEBUG_MODE ? debugLayout : fullHeartLayout;

type ValentinesProposalProps = {
  handleShowProposal: () => void;
};

export default function PhotoPairGame({
  handleShowProposal,
}: ValentinesProposalProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [incorrect, setIncorrect] = useState<number[]>([]);
  const [images, setImages] = useState<string[]>(imagePairs);
  const [mounted, setMounted] = useState(false);

  // Shuffle images only on client after mount to avoid hydration issues
  useEffect(() => {
    setImages(shuffleArray([...imagePairs]));
    setMounted(true);
  }, []);

  // DEBUG: Press 'W' key to auto-win
  useEffect(() => {
    if (!DEBUG_MODE) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "w") {
        console.log("🎉 DEBUG: Auto-winning game!");
        setMatched(Array.from({ length: imagePairs.length }, (_, i) => i));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleClick = async (index: number) => {
    // Prevent clicks until shuffled
    if (
      !mounted ||
      selected.length === 2 ||
      matched.includes(index) ||
      selected.includes(index)
    )
      return;

    if (selected.length === 1) {
      const firstIndex = selected[0];
      setSelected((prev) => [...prev, index]);

      if (images[firstIndex] === images[index]) {
        setMatched((prev) => [...prev, firstIndex, index]);
        setSelected([]);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Wait 0.5 seconds

        setIncorrect([firstIndex, index]);
        setTimeout(() => setIncorrect([]), 500); // Clear incorrect after 0.5 seconds
        setTimeout(() => setSelected([]), 500);
      }
    } else {
      setSelected([index]);
    }
  };

  // Check if game is won
  useEffect(() => {
    if (matched.length === imagePairs.length) {
      handleShowProposal();
    }
  }, [matched, handleShowProposal]);

  return (
    <div
      className="grid grid-cols-9 gap-1 lg:gap-2 max-w-[95vw] mx-auto place-items-center"
      style={{ opacity: mounted ? 1 : 0.5 }}
    >
      {/* DEBUG INFO */}
      {DEBUG_MODE && mounted && (
        <div className="fixed top-2 left-2 sm:top-4 sm:left-4 bg-black/80 text-white p-2 sm:p-4 rounded-lg z-50 text-xs sm:text-sm font-mono">
          <div className="font-bold text-green-400 mb-1 sm:mb-2">🐛 DEBUG</div>
          <div>
            Cards: {imagePairs.length} ({imagePairs.length / 2} pairs)
          </div>
          <div>
            Matched: {matched.length}/{imagePairs.length}
          </div>
          <div className="mt-1 sm:mt-2 text-yellow-300 hidden sm:block">
            Press 'W' to auto-win
          </div>
        </div>
      )}
      {/* Image preload */}
      <div className="hidden">
        {images.map((image, i) => (
          <Image
            key={i}
            src={image}
            alt={`Image ${i + 1}`}
            fill
            className="object-cover"
            priority
          />
        ))}
      </div>

      {heartLayout.flat().map((index, i) =>
        index !== null ? (
          <motion.div
            key={i}
            className="w-[11vh] h-[11vh] lg:w-20 lg:h-20 relative cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => handleClick(index)}
            style={{ perspective: "1000px" }} // Add perspective for 3D effect
          >
            {/* Back of the card */}
            {!selected.includes(index) && !matched.includes(index) && (
              <motion.div
                className="w-full h-full bg-gray-300 rounded-sm lg:rounded-md absolute z-10 flex items-center justify-center"
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY:
                    selected.includes(index) || matched.includes(index)
                      ? 180
                      : 0,
                }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: "hidden" }}
              >
                {/* DEBUG: Show image number on card back */}
                {DEBUG_MODE && mounted && (
                  <span className="text-xs text-gray-600 font-mono">
                    {images[index]?.match(/\/(\d+)\.avif$/)?.[1]}
                  </span>
                )}
              </motion.div>
            )}

            {/* Front of the card (image) */}
            {(selected.includes(index) || matched.includes(index)) && (
              <motion.div
                className="w-full h-full absolute"
                initial={{ rotateY: -180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: "hidden" }}
              >
                <Image
                  src={images[index]}
                  alt={`Imagen ${index + 1}`}
                  fill
                  className="rounded-sm lg:rounded-md object-cover"
                />
              </motion.div>
            )}

            {/* Incorrect animation */}
            {incorrect.includes(index) && (
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-full bg-red-500 rounded-sm lg:rounded-md"></div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div key={i} className="w-[11vh] h-[11vh] lg:w-20 lg:h-20" />
        ),
      )}
    </div>
  );
}
