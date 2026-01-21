import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InfoBarCopy } from "../../components/InfoBar copy";
import { gameStateStorage, fishNetStorage, balanceStorage, pointsStorage } from "../../utils/localStorage";

export function GameUi() {
  const navigate = useNavigate();

  const [isHoleCleared, setIsHoleCleared] = useState(true);
  const [isRoadCasted, setIsRoadCasted] = useState(false);
  const [showFishModal, setShowFishModal] = useState(false);
  const [caughtFish, setCaughtFish] = useState(null);
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isBiting, setIsBiting] = useState(false);
  const [balance, setBalance] = useState(0);
  const [points, setPoints] = useState(0);
  const [fishNet, setFishNet] = useState([]);

  // Drag and drop states
  const [scoopPosition, setScoopPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Animation states
  const [rodAnimation, setRodAnimation] = useState('idle');
  const [waterRipples, setWaterRipples] = useState(false);
  const [fishingDepth, setFishingDepth] = useState(0);

  const tickIdRef = useRef(null);
  const biteTimerRef = useRef(null);
  const handledRef = useRef(false);

  // Load game state from localStorage on mount
  useEffect(() => {
    const savedState = gameStateStorage.get();
    const savedBalance = balanceStorage.get();
    const savedPoints = pointsStorage.get();
    const savedFishNet = fishNetStorage.get();

    setIsHoleCleared(savedState.isHoleCleared);
    setIsRoadCasted(savedState.isRoadCasted);
    setFillPercentage(savedState.fillPercentage);
    setIsBiting(savedState.isBiting);
    setBalance(savedBalance);
    setPoints(savedPoints);
    setFishNet(savedFishNet);
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    gameStateStorage.set({
      isHoleCleared,
      isRoadCasted,
      fillPercentage,
      isBiting,
    });
  }, [isHoleCleared, isRoadCasted, fillPercentage, isBiting]);

  // Шкала обморожения
  useEffect(() => {
    tickIdRef.current = setInterval(() => {
      setFillPercentage(prev => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(tickIdRef.current);
          tickIdRef.current = null;
          return 100;
        }
        return next;
      });
    }, 3000);

    return () => {
      if (tickIdRef.current) {
        clearInterval(tickIdRef.current);
      }
    };
  }, []);

  // Обработка достижения 100%
  useEffect(() => {
    if (!handledRef.current && fillPercentage >= 100) {
      handledRef.current = true;
      setIsHoleCleared(false);
    }
  }, [fillPercentage]);

  // Динамический таймер поклёвки (случайное время 3-8 секунд)
  useEffect(() => {
    if (isRoadCasted && !isBiting) {
      const randomTime = Math.random() * 5000 + 3000; // 3-8 seconds
      biteTimerRef.current = setTimeout(() => {
        setIsBiting(true);
        setWaterRipples(true);
        setRodAnimation('biting');
      }, randomTime);
    }

    return () => {
      if (biteTimerRef.current) {
        clearTimeout(biteTimerRef.current);
        biteTimerRef.current = null;
      }
    };
  }, [isRoadCasted, isBiting]);

  // Drag and drop handlers
  const handleScoopMouseDown = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);
  };

  const handleScoopTouchStart = (e) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;
    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        setScoopPosition({ x: newX, y: newY });

        // Check if scoop is over the hole (center-left area)
        if (newX > 100 && newX < 300 && newY > 200 && newY < 500) {
          // Visual feedback that we're over the hole
        }
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging) {
        const touch = e.touches[0];
        const newX = touch.clientX - dragOffset.x;
        const newY = touch.clientY - dragOffset.y;
        setScoopPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = (e) => {
      if (isDragging) {
        setIsDragging(false);
        const x = e.clientX - dragOffset.x;
        const y = e.clientY - dragOffset.y;

        // Check if dropped on the hole
        if (x > 100 && x < 300 && y > 200 && y < 500) {
          clearHoleWithScoop();
        }

        // Reset scoop position
        setTimeout(() => {
          setScoopPosition({ x: 50, y: 50 });
        }, 300);
      }
    };

    const handleTouchEnd = (e) => {
      if (isDragging) {
        setIsDragging(false);
        const touch = e.changedTouches[0];
        const x = touch.clientX - dragOffset.x;
        const y = touch.clientY - dragOffset.y;

        if (x > 100 && x < 300 && y > 200 && y < 500) {
          clearHoleWithScoop();
        }

        setTimeout(() => {
          setScoopPosition({ x: 50, y: 50 });
        }, 300);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragOffset]);

  const clearHoleWithScoop = () => {
    if (isRoadCasted) {
      alert('Сначала вытащите удочку!');
      return;
    }

    handledRef.current = false;
    setIsHoleCleared(true);
    setFillPercentage(0);

    if (tickIdRef.current) {
      clearInterval(tickIdRef.current);
    }

    tickIdRef.current = setInterval(() => {
      setFillPercentage(prev => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(tickIdRef.current);
          tickIdRef.current = null;
          return 100;
        }
        return next;
      });
    }, 3000);

    alert('✨ Лунка очищена шумовкой!');
  };

  const fishTypes = [
    { name: 'Щука', weight: '2.200 грамм', price: 1000, image: '/FISH/1.png', points: 50 },
    { name: 'Сазан', weight: '1.300 грамм', price: 1250, image: '/FISH/2.png', points: 60 },
    { name: 'Карп', weight: '1.200 грамм', price: 1200, image: '/FISH/3.png', points: 55 },
    { name: 'Лещ', weight: '3.200 грамм', price: 1500, image: '/FISH/4.png', points: 75 },
  ];

  // Универсальная кнопка заброса/вытаскивания
  const handleFishing = () => {
    if (!isRoadCasted) {
      // Заброс
      if (!isHoleCleared) {
        alert('Сначала нужно очистить лунку шумовкой!');
        return;
      }
      setIsRoadCasted(true);
      setIsBiting(false);
      setRodAnimation('casting');
      setFishingDepth(0);

      // Анимация погружения
      const depthInterval = setInterval(() => {
        setFishingDepth(prev => {
          if (prev >= 100) {
            clearInterval(depthInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      alert('🎣 Удочка заброшена. Ожидайте поклёвки...');
    } else {
      // Вытаскивание
      if (!isBiting) {
        alert('⏳ Ещё нет поклёвки, подождите...');
        return;
      }

      setRodAnimation('pulling');
      const randomFish = fishTypes[Math.floor(Math.random() * fishTypes.length)];

      setTimeout(() => {
        setCaughtFish(randomFish);
        setShowFishModal(true);
        setWaterRipples(false);
      }, 500);
    }
  };

  const closeModal = () => {
    setShowFishModal(false);
    setCaughtFish(null);
    setIsRoadCasted(false);
    setIsBiting(false);
    setRodAnimation('idle');
    setFishingDepth(0);

    if (biteTimerRef.current) {
      clearTimeout(biteTimerRef.current);
      biteTimerRef.current = null;
    }
  };

  const sellFish = () => {
    const newBalance = balanceStorage.add(caughtFish.price);
    const newPoints = pointsStorage.add(caughtFish.points);
    setBalance(newBalance);
    setPoints(newPoints);
    alert(`💰 Рыба продана за ${caughtFish.price}р! (+${caughtFish.points} очков)`);
    closeModal();
  };

  const grabFish = () => {
    const fishWithId = { ...caughtFish, id: Date.now() };
    const updatedNet = fishNetStorage.addFish(fishWithId);
    setFishNet(updatedNet);
    const newPoints = pointsStorage.add(Math.floor(caughtFish.points / 2));
    setPoints(newPoints);
    alert(`🎣 Рыба заброшена в садок! (+${Math.floor(caughtFish.points / 2)} очков)`);
    closeModal();
  };

  const cancelFish = () => {
    alert(`🐟 Вы отпустили рыбу. ${caughtFish.name} будет Вам благодарна...`);
    closeModal();
  };

  return (
    <div
      style={{ backgroundImage: "url('/lunka.jpg')", width: '100%', height: '100vh' }}
      className="flex flex-col bg-cover overflow-hidden bg-center relative"
    >
      <InfoBarCopy />

      {/* Points display */}
      <div className="absolute top-12 sm:top-14 right-2 sm:right-4 bg-purple-600/90 px-3 py-1 rounded-lg z-50">
        <p className="text-white font-bold text-xs sm:text-sm">⭐ {points} очков</p>
      </div>

      {/* Draggable Ice Scoop */}
      {!isHoleCleared && (
        <div
          style={{
            position: 'fixed',
            left: `${scoopPosition.x}px`,
            top: `${scoopPosition.y}px`,
            cursor: isDragging ? 'grabbing' : 'grab',
            zIndex: 100,
            transition: isDragging ? 'none' : 'all 0.3s ease',
          }}
          onMouseDown={handleScoopMouseDown}
          onTouchStart={handleScoopTouchStart}
          className="select-none"
        >
          <div className="relative">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full border-4 border-gray-600 flex items-center justify-center shadow-2xl ${isDragging ? 'scale-110' : 'scale-100'} transition-transform`}>
              <span className="text-2xl sm:text-3xl">🥄</span>
            </div>
            {!isDragging && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-bounce">
                Перетащи на лунку!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fish caught modal - responsive */}
      {showFishModal && caughtFish && (
        <div className="fixed inset-0 items-center justify-center flex z-50 p-2 sm:p-4 bg-black/50">
          <div
            style={{ backgroundImage: `url(/43.png)` }}
            className="w-full max-w-2xl bg-cover bg-center rounded-2xl border-2 border-white flex flex-col justify-between p-4 sm:p-6 relative animate-fadeIn"
          >
            <div className="flex-row justify-between items-start flex gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
              <div className="flex flex-col justify-start items-start gap-2 sm:gap-4 md:gap-8">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black font-bold">{`🐟 ${caughtFish.name}`}</p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 font-bold">{`⚖️ ${caughtFish.weight}`}</p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-green-700 font-bold">{`💰 ${caughtFish.price}₽`}</p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-700 font-bold">{`⭐ +${caughtFish.points} очков`}</p>
              </div>
              <div className="w-full sm:w-auto flex justify-center">
                <img
                  className="mr-2 pt-2 sm:pt-4 w-40 sm:w-52 md:w-60 lg:w-[260px] animate-bounce"
                  src={`${caughtFish.image}`}
                  alt={caughtFish.name}
                />
              </div>
            </div>

            <div className="bottom-6 justify-center flex gap-2 sm:gap-4 lg:gap-6 mt-4 flex-wrap">
              <button
                onClick={sellFish}
                className="border-2 border-black p-2 sm:p-3 md:p-4 items-center bg-green-500/70 hover:bg-green-600 transition-colors rounded-lg"
              >
                <p className="text-white font-bold text-sm sm:text-lg md:text-2xl lg:text-3xl">💰 Продать</p>
              </button>
              <button
                onClick={grabFish}
                className="border-2 border-black p-2 sm:p-3 md:p-4 items-center bg-blue-500/70 hover:bg-blue-600 transition-colors rounded-lg"
              >
                <p className="text-white font-bold text-sm sm:text-lg md:text-2xl lg:text-3xl">🎣 В садок</p>
              </button>
              <button
                onClick={cancelFish}
                className="border-2 border-black p-2 sm:p-3 md:p-4 items-center bg-gray-500/70 hover:bg-gray-600 transition-colors rounded-lg"
              >
                <p className="text-white font-bold text-sm sm:text-lg md:text-2xl lg:text-3xl">🐟 Отпустить</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Нижний интерфейс - responsive */}
      <div className="gap-2 sm:gap-5 flex flex-row justify-center items-center mt-auto z-40 pb-2 sm:pb-4">
        <button
          onClick={handleFishing}
          style={{ backgroundImage: "url('/background/box.png')" }}
          className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-cover bg-center hover:scale-110 transition-transform ${isBiting ? 'animate-pulse' : ''}`}
        >
          <p className="font-bold text-black text-sm sm:text-base md:text-lg lg:text-xl">
            {isRoadCasted ? (isBiting ? '🎣 Тянуть!' : '⏳ Ждать...') : '🎣 Забросить'}
          </p>
        </button>
      </div>

      {/* Шкала обморожения - responsive positioning */}
      <div className="items-start justify-start flex absolute top-16 sm:top-20 lg:top-24 left-2 sm:left-4 z-10">
        <div className="flex flex-col items-center gap-2 sm:gap-4">
          <img src="/snow.png" width={40} height={40} alt="snow" className="w-8 sm:w-10 animate-pulse" />
          <div className="bg-white border-2 border-black w-6 h-40 sm:w-8 sm:h-60 lg:w-10 lg:h-80 rounded-2xl relative overflow-hidden shadow-lg">
            <div
              style={{ height: `${fillPercentage}%` }}
              className={`w-full rounded-2xl transition-all duration-300 absolute bottom-0 ${
                fillPercentage > 70 ? 'bg-red-500' : fillPercentage > 40 ? 'bg-yellow-500' : 'bg-blue-500'
              }`}
            />
          </div>
          <div className="text-white bg-black/70 px-2 py-1 rounded text-xs font-bold">
            {fillPercentage}%
          </div>
        </div>
      </div>

      {/* Кнопка "На базу" - responsive */}
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-40">
        <button
          onClick={() => navigate('/')}
          style={{ backgroundImage: "url('/background/box.png')" }}
          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-cover bg-center hover:scale-110 transition-transform"
        >
          <p className="font-bold text-black text-[10px] sm:text-xs md:text-sm lg:text-base">🏠 На базу</p>
        </button>
      </div>

      {/* Water ripples effect */}
      {waterRipples && (
        <div className="absolute left-1/3 top-1/2 z-10">
          <div className="relative">
            <div className="absolute w-12 h-12 bg-blue-400/30 rounded-full animate-ping"></div>
            <div className="absolute w-8 h-8 bg-blue-500/30 rounded-full animate-ping animation-delay-100"></div>
          </div>
        </div>
      )}

      {/* Удочка - responsive positioning with animation */}
      <div className="z-20 absolute right-10 sm:right-20 lg:right-40 bottom-12 sm:bottom-20 lg:bottom-32">
        {rodAnimation === 'biting' ? (
          <img
            className={`w-40 sm:w-60 lg:w-90 rotate-300 ${isBiting ? 'animate-shake' : ''}`}
            src="video/a2.gif"
            alt="biting"
          />
        ) : (
          <img
            className={`w-40 sm:w-60 lg:w-90 rotate-300 transition-transform ${
              rodAnimation === 'casting' ? 'translate-y-4' : rodAnimation === 'pulling' ? '-translate-y-4' : ''
            }`}
            src="video/road.png"
            alt="rod"
          />
        )}

        {/* Fishing depth indicator */}
        {isRoadCasted && (
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
            <div className="w-2 h-32 bg-gray-300/50 rounded-full relative overflow-hidden">
              <div
                style={{ height: `${fishingDepth}%` }}
                className="w-full bg-blue-500 absolute bottom-0 transition-all duration-200"
              />
            </div>
            <p className="text-white text-xs mt-1 bg-black/50 px-1 rounded">Глубина</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes shake {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-shake {
          animation: shake 0.2s ease-in-out infinite;
        }

        .animation-delay-100 {
          animation-delay: 100ms;
        }
      `}</style>
    </div>
  );
}
