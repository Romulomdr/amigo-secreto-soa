import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Confetti from "react-confetti";

export default function Home() {
  const [showPlay, setShowPlay] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showRevealAnimation, setShowRevealAnimation] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [token, setToken] = useState("");
  const [result, setResult] = useState<{ nome: string; email: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const startAnimation = () => {
    setShowPlay(false);
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setShowInput(true);
    }, 3000);
  };

  const revelar = async () => {
    setShowInput(false);
    setShowRevealAnimation(true);
    setLoading(true);

    const res = await fetch("https://revelar-tb5kv6xt6a-uc.a.run.app/revelar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);

    setTimeout(() => {
      setShowRevealAnimation(false);
      setShowResult(true);
    }, 3000);
  };

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center text-white relative overflow-hidden">

      {showResult && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <AnimatePresence>
        {showPlay && (
          <motion.div
            key="play"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="cursor-pointer"
            onClick={startAnimation}
          >
            <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAnimation && (
          <motion.div
            key="startLottie"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center w-full h-full"
          >
            <DotLottieReact
              src="https://lottie.host/1fa21960-1e00-47fd-ad4e-0fed5f80cf85/hbBksohsTt.lottie"
              autoplay
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInput && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4 w-80 text-center"
          >
            <input
              className="bg-black border border-white px-4 py-2 text-white text-center"
              placeholder="Digite seu token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />

            <button
              onClick={revelar}
              className="border border-white px-4 py-2 hover:bg-white hover:text-black transition"
            >
              Revelar Amigo Secreto
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRevealAnimation && (
          <motion.div
            key="revealLottie"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center h-full w-full"
          >
            <DotLottieReact
              src="https://lottie.host/8d7c3a18-b1b7-45ec-aea8-0ad3971164a5/XbS03d9zeN.lottie"
              autoplay
            />
          </motion.div>
        )}
      </AnimatePresence>

        <AnimatePresence>
        {showResult && result && (
            <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center w-full h-1/2"
            >
            <motion.div
                animate={{ 
                textShadow: [
                    "0 0 10px #fff",
                    "0 0 20px #fff",
                    "0 0 30px #312cff",
                    "0 0 40px #312cff",
                    "0 0 20px #fff",
                    "0 0 10px #fff"
                ] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[8vw] font-extrabold leading-tight"
            >
                {result.nome}
            </motion.div>

            <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[4vw] opacity-90"
            >
                {result.email}
            </motion.div>
            </motion.div>
        )}
        </AnimatePresence>
    </div>
  );
}
