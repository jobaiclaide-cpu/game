import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InfoBarCopy } from "../../components/InfoBar copy";
import { gameStateStorage, fishNetStorage, balanceStorage } from "../../utils/localStorage";

export function GameUi() {
  const navigate = useNavigate();

  const [isHoleCleared, setIsHoleCleared] = useState(true);
  const [isRoadCasted, setIsRoadCasted] = useState(false);
  const [showFishModal, setShowFishModal] = useState(false);
  const [caughtFish, setCaughtFish] = useState(null);
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isBiting, setIsBiting] = useState(false);
  const [balance, setBalance] = useState(0);
  const [fishNet, setFishNet] = useState([]);
  const [showNetModal, setShowNetModal] = useState(false);

  const tickIdRef = useRef(null);
  const biteTimerRef = useRef(null);
  const handledRef = useRef(false);

  // Load game state from localStorage on mount
  useEffect(() => {
    const savedState = gameStateStorage.get();
    const savedBalance = balanceStorage.get();
    const savedFishNet = fishNetStorage.get();

    setIsHoleCleared(savedState.isHoleCleared);
    setIsRoadCasted(savedState.isRoadCasted);
    setFillPercentage(savedState.fillPercentage);
    setIsBiting(savedState.isBiting);
    setBalance(savedBalance);
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

  // Шкала обморожения (замедлена до 2 секунд)
  useEffect(() => {
    tickIdRef.current = setInterval(() => {
      setFillPercentage(prev => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(tickIdRef.current);
          tickIdRef.current = null;
          return 100;
        }
        return next;
      });
    }, 2000);

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

  // Таймер поклёвки после заброса
  useEffect(() => {
    if (isRoadCasted && !isBiting) {
      biteTimerRef.current = setTimeout(() => {
        setIsBiting(true);
      }, 5000);
    }

    return () => {
      if (biteTimerRef.current) {
        clearTimeout(biteTimerRef.current);
        biteTimerRef.current = null;
      }
    };
  }, [isRoadCasted, isBiting]);

  const clearHole = () => {
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
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(tickIdRef.current);
          tickIdRef.current = null;
          return 100;
        }
        return next;
      });
    }, 2000);

    alert('Лунка очищена');
  };

  const fishTypes = [
    { name: 'Щука', weight: '2.200 грамм', price: 1000, image: '/FISH/1.png' },
    { name: 'Сазан', weight: '1.300 грамм', price: 1250, image: '/FISH/2.png' },
    { name: 'Карп', weight: '1.200 грамм', price: 1200, image: '/FISH/3.png' },
    { name: 'Лещ', weight: '3.200 грамм', price: 1500, image: '/FISH/4.png' },
  ];

  // Универсальная кнопка заброса/вытаскивания
  const handleFishing = () => {
    if (!isRoadCasted) {
      // Заброс
      if (!isHoleCleared) {
        alert('Сначала нужно очистить лунку');
        return;
      }
      setIsRoadCasted(true);
      setIsBiting(false);
      alert('Удочка заброшена. Ожидайте поклёвки');
    } else {
      // Вытаскивание
      if (!isBiting) {
        alert('Ещё нет поклёвки, подождите...');
        return;
      }

      const randomFish = fishTypes[Math.floor(Math.random() * fishTypes.length)];
      setCaughtFish(randomFish);
      setShowFishModal(true);
    }
  };

  const closeModal = () => {
    setShowFishModal(false);
    setCaughtFish(null);
    setIsRoadCasted(false);
    setIsBiting(false);

    if (biteTimerRef.current) {
      clearTimeout(biteTimerRef.current);
      biteTimerRef.current = null;
    }
  };

  const sellFish = () => {
    const newBalance = balanceStorage.add(caughtFish.price);
    setBalance(newBalance);
    alert(`Рыба продана за ${caughtFish.price}р!`);
    closeModal();
  };

  const grabFish = () => {
    const fishWithId = { ...caughtFish, id: Date.now() };
    const updatedNet = fishNetStorage.addFish(fishWithId);
    setFishNet(updatedNet);
    alert(`Рыба заброшена в садок!`);
    closeModal();
  };

  const cancelFish = () => {
    alert(`Вы отпустили рыбу. ${caughtFish.name} будет Вам благодарна....наверное`);
    closeModal();
  };

  return (
    <div
      style={{ backgroundImage: "url('/lunka.jpg')", width: '100%', height: '100vh' }}
      className="flex flex-col bg-cover overflow-hidden bg-center"
    >
      <InfoBarCopy />

      {/* Fish caught modal - responsive */}
      {showFishModal && caughtFish && (
        <div className="fixed inset-0 items-center justify-center flex z-50 p-2 sm:p-4">
          <div
            style={{ backgroundImage: `url(/43.png)` }}
            className="w-full max-w-2xl bg-cover bg-center rounded-2xl border-2 border-white flex flex-col justify-between p-4 sm:p-6 relative"
          >
            <div className="flex-row justify-between items-start flex gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
              <div className="flex flex-col justify-start items-start gap-2 sm:gap-4 md:gap-8">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black font-bold">{`Рыба: ${caughtFish.name}`}</p>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black font-bold">{`Вес: ${caughtFish.weight}`}</p>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black font-bold">{`Цена: ${caughtFish.price}P`}</p>
              </div>
              <div className="w-full sm:w-auto flex justify-center">
                <img
                  className="mr-2 pt-2 sm:pt-4 w-40 sm:w-52 md:w-60 lg:w-[260px]"
                  src={`${caughtFish.image}`}
                  alt={caughtFish.name}
                />
              </div>
            </div>

            <div className="bottom-6 justify-center flex gap-2 sm:gap-4 lg:gap-6 mt-4 flex-wrap">
              <button
                onClick={sellFish}
                className="border-2 border-black p-2 sm:p-3 md:p-4 items-center bg-white/70 hover:bg-white transition-colors"
              >
                <p className="text-black font-bold text-sm sm:text-lg md:text-2xl lg:text-3xl">Продать</p>
              </button>
              <button
                onClick={grabFish}
                className="border-2 border-black p-2 sm:p-3 md:p-4 items-center bg-white/70 hover:bg-white transition-colors"
              >
                <p className="text-black font-bold text-sm sm:text-lg md:text-2xl lg:text-3xl">В садок</p>
              </button>
              <button
                onClick={cancelFish}
                className="border-2 border-black p-2 sm:p-3 md:p-4 items-center bg-white/70 hover:bg-white transition-colors"
              >
                <p className="text-black font-bold text-sm sm:text-lg md:text-2xl lg:text-3xl">Отпустить</p>
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
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-cover bg-center"
        >
          <p className="font-bold text-black text-sm sm:text-base md:text-lg lg:text-xl">
            {isRoadCasted ? 'Вытащить' : 'Забросить'}
          </p>
        </button>
      </div>

      {/* Шкала обморожения - responsive positioning */}
      <div className="items-start justify-start flex absolute top-16 sm:top-20 lg:top-24 left-2 sm:left-4 z-10">
        <div className="flex flex-col items-center gap-2 sm:gap-4">
          <img src="/snow.png" width={40} height={40} alt="snow" className="w-8 sm:w-10" />
          <div className="bg-white border-2 border-black w-6 h-40 sm:w-8 sm:h-60 lg:w-10 lg:h-80 rounded-2xl relative overflow-hidden">
            <div
              style={{ height: `${fillPercentage}%` }}
              className="bg-blue-500 w-full rounded-2xl transition-all duration-300 absolute bottom-0"
            />
          </div>
          <button
            onClick={clearHole}
            style={{ backgroundImage: "url('/background/box.png')" }}
            className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-cover bg-center mt-2"
          >
            <p className="font-bold text-black text-[10px] sm:text-xs lg:text-base">Очистить</p>
          </button>
        </div>
      </div>

      {/* Кнопка "На базу" - responsive */}
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-40">
        <button
          onClick={() => navigate('/')}
          style={{ backgroundImage: "url('/background/box.png')" }}
          className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-cover bg-center"
        >
          <p className="font-bold text-black text-[10px] sm:text-xs md:text-sm lg:text-base">На базу</p>
        </button>
      </div>

      {/* Удочка - responsive positioning */}
      <div className="z-20 absolute right-10 sm:right-20 lg:right-40 bottom-12 sm:bottom-20 lg:bottom-32">
        {isBiting ? (
          <img
            className="w-40 sm:w-60 lg:w-90 rotate-300"
            src="video/a2.gif"
            alt="biting"
          />
        ) : (
          <img
            className="w-40 sm:w-60 lg:w-90 rotate-300"
            src="video/road.png"
            alt="rod"
          />
        )}
      </div>
    </div>
  );
}
