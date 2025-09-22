import { useState, useEffect } from "react";

const ChatAnimation = () => {
  const [showFirstMessage, setShowFirstMessage] = useState(false);
  const [showSecondMessage, setShowSecondMessage] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowFirstMessage(true);
    }, 1000);

    const timer2 = setTimeout(() => {
      setShowSecondMessage(true);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Reset animation every 8 seconds
  useEffect(() => {
    const resetTimer = setInterval(() => {
      setShowFirstMessage(false);
      setShowSecondMessage(false);
      setTimeout(() => setShowFirstMessage(true), 1000);
      setTimeout(() => setShowSecondMessage(true), 3000);
    }, 8000);

    return () => clearInterval(resetTimer);
  }, []);

  return (
    <div className="glass-card p-6 max-w-md w-full min-h-[400px] relative">
      {/* Chat header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">👩</span>
        </div>
        <div>
          <h3 className="text-white font-semibold">Sofia</h3>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="space-y-4">
        {/* First message - from user */}
        <div 
          className={`flex justify-end transition-all duration-500 ${
            showFirstMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-[80%] shadow-lg">
            <p className="text-sm">Perfetto, ci vediamo domani alle 20:00 in piazza Duomo?</p>
            <span className="text-xs opacity-80 block mt-1">19:42</span>
          </div>
        </div>

        {/* Second message - from girl */}
        <div 
          className={`flex justify-start transition-all duration-500 ${
            showSecondMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-white/10 backdrop-blur-sm text-white rounded-2xl rounded-bl-md px-4 py-3 max-w-[80%] shadow-lg border border-white/20">
            <p className="text-sm">Si, non vedo l'ora di vederti! 😊</p>
            <span className="text-xs opacity-80 block mt-1">19:43</span>
          </div>
        </div>

        {/* Typing indicator */}
        <div 
          className={`flex justify-start transition-all duration-300 ${
            showSecondMessage ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl rounded-bl-md px-4 py-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse animation-delay-200"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse animation-delay-400"></div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Generated badge */}
      <div className="absolute -bottom-4 -left-4 glass-card p-2">
        <span className="text-xs font-semibold gradient-text">AI Generated ✨</span>
      </div>

      {/* Success indicator */}
      <div className="absolute -top-4 -right-4 glass-card p-3 animate-pulse">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default ChatAnimation;