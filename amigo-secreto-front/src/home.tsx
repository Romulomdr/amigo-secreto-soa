import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showInput, setShowInput] = useState(false);
  const [token, setToken] = useState("");
  const [result, setResult] = useState<{ nome: string; email: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const revelar = async () => {
    setLoading(true);
    setResult(null);
    const res = await fetch("https://revelar-tb5kv6xt6a-uc.a.run.app/revelar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });
    const data = await res.json();
    setLoading(false);
    setResult(data);
  };

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center text-white">
      <AnimatePresence>
        {!showInput && (
          <motion.div
            key="play"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="cursor-pointer"
            onClick={() => setShowInput(true)}
          >
            <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
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

            {loading && <div className="text-sm opacity-70">Carregando...</div>}

            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4"
              >
                <div className="text-xl font-bold">{result.nome}</div>
                <div className="opacity-70">{result.email}</div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
