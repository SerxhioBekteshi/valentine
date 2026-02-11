/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Heart } from "lucide-react";
import lopa from "./assets/lopa.png";
import yes from "./assets/yes.jpg";
import "./assets/globals.css";

function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_moveCount, setMoveCount] = useState(0);

  const [showDialog, setShowDialog] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [isNoButtonAbsolute, setIsNoButtonAbsolute] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<any>([]);
  const [text, setText] = useState<string>("Click Me!");
  const [numberOfClicks, setNumberOfClicks] = useState<number>(0);
  const [showPopup, setShowPopup] = useState(false);
  const [dialogCloseCount, setDialogCloseCount] = useState(0);

  const moveNoButton = () => {
    setIsNoButtonAbsolute(true);
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 80;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    setNoButtonPosition({ x: newX, y: newY });
    setMoveCount((prev) => {
      const newCount = prev + 1;
      if (newCount % 5 === 0) setShowDialog(true);
      return newCount;
    });
  };

  const handleYes = () => setAccepted(true);
  const closeDialog = () => setShowDialog(false);

  if (accepted) {
    return (
      <div className="flex flex-row gap-3 min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-100 items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center select-none">
          <div className="relative w-24 h-24 mx-auto mb-6">
            {/* Heart clicker */}
            <div
              className="relative w-24 h-24 mx-auto mb-6 cursor-pointer"
              onClick={(e) => {
                setText("Again");
                const newCount = numberOfClicks + 1;
                setNumberOfClicks(newCount);

                // Show muah popup after 10 clicks
                if (newCount > 10) {
                  setShowPopup(true);
                  setNumberOfClicks(0);
                  setTimeout(() => setShowPopup(false), 2000);
                }

                const rect = (
                  e.currentTarget.firstChild as SVGSVGElement
                ).getBoundingClientRect();
                const parentRect = e.currentTarget.getBoundingClientRect();
                const id = Date.now();

                setFloatingHearts((prev: any) => [
                  ...prev,
                  {
                    id,
                    left:
                      rect.left -
                      parentRect.left +
                      rect.width / 2 -
                      12 +
                      (Math.random() * 20 - 10),
                    top: rect.top - parentRect.top - 20,
                  },
                ]);

                setTimeout(
                  () =>
                    setFloatingHearts((prev: any) =>
                      prev.filter((h: any) => h.id !== id),
                    ),
                  2000,
                );
              }}
            >
              <Heart className="w-full h-full text-red-500" />
              <span
                className="absolute inset-0 flex items-center justify-center text-black font-bold pointer-events-none"
                style={{ fontSize: "10px" }}
              >
                {text}
              </span>

              {/* floating hearts */}
              {floatingHearts.map((heart: any) => (
                <Heart
                  key={heart.id}
                  className="w-10 h-10 text-red-500 absolute animate-float"
                  fill="currentColor"
                  style={{ left: heart.left, top: heart.top }}
                />
              ))}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-8 text-center">
            Hahaha tricked you 😂💕
          </h1>
          <p className="mt-8 text-2xl text-red-500 text-center font-semibold ">
            Happy Valentine's Day Lopa 🌹
          </p>
          <h3 className="mt-8 text-2xl text-red-500 text-center font-semibold">
            Love youuuuuuuu!!!!! ❤️ 💙
          </h3>
        </div>

        <div className="rounded-2xl shadow-2xl max-w-xs w-full h-full overflow-hidden">
          <img src={yes} alt="Romance" className="object-cover w-full h-full" />
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-pink-400 text-white text-4xl md:text-6xl font-bold px-8 py-4 rounded-full shadow-lg animate-bounce">
              Muuuuaah 💋
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-100 to-pink-200 flex items-center justify-center p-4 overflow-hidden">
      <div className="text-center">
        <Heart className="w-16 h-16 md:w-24 md:h-24 text-red-500 mx-auto mb-6 animate-pulse" />
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-12">
          Will you be my Valentine?
        </h1>

        <div className="flex gap-6 justify-center items-center relative">
          <button
            onClick={handleYes}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-xl md:text-2xl shadow-lg transform transition hover:scale-110"
          >
            Yes!!!!!!! 💝
          </button>

          <button
            onMouseEnter={moveNoButton}
            onTouchStart={(e) => {
              e.preventDefault();
              moveNoButton();
            }}
            onClick={moveNoButton}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full text-xl md:text-2xl shadow-lg transition"
            style={
              isNoButtonAbsolute
                ? {
                    position: "fixed",
                    left: `${noButtonPosition.x}px`,
                    top: `${noButtonPosition.y}px`,
                    zIndex: 50,
                  }
                : {}
            }
          >
            No
          </button>
        </div>
      </div>

      {/* Dialog */}
      {showDialog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleYes}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">
              Are you being serious right now lop? 😤
            </h2>
            <img
              src={lopa}
              className="w-full h-80 object-cover rounded-xl mb-4"
              alt="Lopa"
            />
            <button
              onClick={() => {
                const newCount = dialogCloseCount + 1;
                if (newCount >= 3) {
                  handleYes();
                  setDialogCloseCount(0);
                } else {
                  closeDialog();
                  setDialogCloseCount(newCount);
                }
              }}
              className="flex gap-2 justify-center items-center w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full text-xl"
            >
              SHTYP OK TA MBYLLESH!
              <img
                src="https://emojiisland.com/cdn/shop/products/Smiling_Devil_Emoji_large.png?v=1571606036"
                alt="Yes"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
