import type { MetaFunction } from "@remix-run/node";
import { motion, AnimatePresence } from "framer-motion";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Bulldogs on Chain - X-NFT Series 3" },
    { name: "description", content: "3,000 Unique Frenchies. Yours to Shuffle." },
  ];
};

const DAPP_URL = "https://app.compx.io/x-nft/shuffle/?shuffleId=2293404982";
const TOTAL_SUPPLY = 3000;
const CURRENT_MINTED = 1058; // This would come from your API
const CDN_BASE = "https://x-nft.lon1.cdn.digitaloceanspaces.com/lg";

// Function to generate n unique random numbers between 1 and TOTAL_SUPPLY
const getRandomBulldogs = (count: number) => {
  const numbers = new Set<number>();
  while (numbers.size < count) {
    const num = Math.floor(Math.random() * TOTAL_SUPPLY) + 1;
    numbers.add(num);
  }
  return Array.from(numbers).map(num => `${CDN_BASE}/${num}.png`);
};

const STEPS = [
  {
    title: "Pay 1 X-NFT",
    description: "Connect your wallet and pay 1 X-NFT to start shuffling",
    icon: "💰",
    bgColor: "bg-pink-500",
  },
  {
    title: "Shuffle a Bulldog",
    description: "Get a randomly generated unique bulldog NFT",
    icon: "🎲",
    bgColor: "bg-emerald-500",
  },
  {
    title: "Keep or Burn",
    description: "Keep your bulldog or burn it to get 0.5 X-NFT back",
    icon: "🔥",
    bgColor: "bg-orange-500",
  },
];

const FAQS = [
  {
    question: "What is X-NFT?",
    answer: "X-NFT is a revolutionary NFT platform that allows for dynamic NFT minting and burning. Each NFT can only be aquired via shuffling using 1 X-NFT ASA token.",
  },
  {
    question: "How were the bulldogs created?",
    answer: "The bulldogs have been create by Kimchi of the Bambino Project",
  },
];

export default function Index() {
  const [bulldogImages, setBulldogImages] = useState(() => getRandomBulldogs(4));
  
  const handleShuffle = () => {
    setBulldogImages(getRandomBulldogs(4));
  };

  return (
    <main className="bg-gradient-to-b from-pink-500 via-purple-500 to-emerald-500 font-baloo">
      {/* Hero Section */}
      <section className="section relative overflow-hidden py-20">
        <div className="container">
          <div className="text-center">
            <motion.h1 
              className="text-6xl font-bungee tracking-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              🐶 Bulldogs on Chain
            </motion.h1>
            <motion.p 
              className="mt-4 text-2xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              3,000 Unique Frenchies. Yours to Shuffle.
            </motion.p>
            <motion.p 
              className="mt-6 text-xl text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Use X-NFT to mint a random bulldog. Burn it anytime for 0.5 X-NFT.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
               <a 
                href={DAPP_URL} 
                className="inline-block px-8 py-4 text-xl font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transform hover:scale-105 transition-all shadow-lg"
              >
                🎲 Shuffle Now
              </a>
            </motion.div> 
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="section bg-white/10 backdrop-blur-lg py-20">
        <div className="container">
          <div className="flex flex-col items-center">
            <button 
              onClick={handleShuffle}
              className="mb-12 flex items-center gap-2 px-6 py-3 text-white bg-emerald-500 rounded-full hover:bg-emerald-600 transform hover:scale-105 transition-all shadow-lg"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Shuffle Preview
            </button>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
              <AnimatePresence mode="popLayout">
                {bulldogImages.map((src, index) => (
                  <motion.div
                    key={src}
                    className="relative aspect-square rounded-2xl overflow-hidden shadow-xl"
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                  >
                    <img 
                      src={src} 
                      alt={`Bulldog ${index + 1}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `${CDN_BASE}/${Math.floor(Math.random() * TOTAL_SUPPLY) + 1}.png`;
                      }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section py-20">
        <div className="container">
          <h2 className="text-4xl font-bungee text-center mb-16 text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {STEPS.map((step, index) => (
              <motion.div
                key={index}
                className={`text-center p-8 rounded-2xl shadow-xl ${step.bgColor}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-2xl font-bungee mb-4 text-white">{step.title}</h3>
                <p className="text-white/90">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-white/10 backdrop-blur-lg py-20">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl font-bungee mb-8 text-white">About</h2>
          <p className="text-xl text-white/90 mb-6">
            Bulldogs on Chain leverages X-NFT&apos;s innovative platform to bring you a unique 
            collection of French Bulldogs. Each Bulldog has a unique background, body, and accessories.
            
          </p>
          
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section py-20">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bungee text-center mb-12 text-white">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
                    <Disclosure.Button className="w-full px-6 py-4 text-left flex justify-between items-center text-white">
                      <span className="text-lg font-bungee">{faq.question}</span>
                      <ChevronDownIcon 
                        className={`w-5 h-5 transition-transform ${open ? 'transform rotate-180' : ''}`} 
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-6 py-4 text-white/90 bg-white/10">
                      {faq.answer}
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-lg text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bungee mb-4">Bulldogs on Chain</h3>
              <p className="text-white/80">
                Powered by CompX
              </p>
            </div>
            <div className="flex justify-end space-x-6">
              <a href="https://app.compx.io/x-nft" className="text-white/80 hover:text-white hover:scale-105 transition-all">
                X-NFT
              </a>
              <a href="https://x.com/compxlabs" className="text-white/80 hover:text-white hover:scale-105 transition-all">
                Twitter
              </a>
              <a href="https://discord.gg/pSG93C6UN8" className="text-white/80 hover:text-white hover:scale-105 transition-all">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
