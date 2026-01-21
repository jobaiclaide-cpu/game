import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InfoBarCopy } from "../../components/InfoBar copy";

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
    { name: 'Щука', weight: '2.200 грамм', price: '1000P', image: '/FISH/1.png' },
    { name: 'Сазан', weight: '1.300 грамм', price: '1250P', image: '/FISH/2.png' },
    { name: 'Карп', weight: '1.200 грамм', price: '1200P', image: '/FISH/3.png' },
    { name: 'Лещ', weight: '3.200 грамм', price: '1500P', image: '/FISH/4.png' },
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
    alert(`Рыба продана за ${caughtFish.price}!`);
    closeModal();
  };

  const grabFish = () => {
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
      
      {showFishModal && caughtFish && (
        <div className="fixed inset-0 items-center justify-center flex z-50 p-4">
          <div 
            style={{ backgroundImage: `url(/43.png)` }}
            className="w-150 h-126 bg-cover bg-center rounder-2xl border-2 border-white flex flex-col justify-between p-6 relative"
          >
            <div className="flex-row justify-between items-start flex gap-4">
              <div className="flex flex-col justify-start items-start gap-8">
                <p className="text-4xl text-black">{`Рыба: ${caughtFish.name}`}</p>
                <p className="text-4xl text-black">{`Вес: ${caughtFish.weight}`}</p>
                <p className="text-4xl text-black">{`Цена: ${caughtFish.price}`}</p>
              </div>
              <div> 
                <img 
                  className="mr-2 pt-4"
                  src={`${caughtFish.image}`}
                  width={260}
                  alt={caughtFish.name}
                /> 
              </div>
            </div>

            <div className="bottom-6 justify-center flex gap-6">
              <button 
                onClick={sellFish}
                className="border-2 border-black p-4 items-center"
              >
                <p className="text-black font-bold text-3xl">Продать рыбу</p>
              </button>
              <button 
                onClick={grabFish}
                className="border-2 border-black p-4 items-center"
              >
                <p className="text-black font-bold text-3xl">В садок</p>
              </button>
              <button 
                onClick={cancelFish}
                className="border-2 border-black p-4 items-center"
              >
                <p className="text-black font-bold text-3xl">Отпустить</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Нижний интерфейс */}
      <div className="gap-5 flex flex-row justify-center items-center mt-auto z-40 pb-4">
        <button 
          onClick={handleFishing}
          style={{ backgroundImage: "url('/background/box.png')" }}
          className="lg:w-32 lg:h-32 sm:w-20 sm:h-20 bg-cover bg-center"
        >
          <p className="font-bold text-black lg:text-xl sm:text-base">
            {isRoadCasted ? 'Вытащить' : 'Забросить'}
          </p>
        </button>
      </div>
     
      {/* Шкала обморожения - слева сверху */}
      <div className="items-start justify-start flex absolute sm:top-20 lg:top-24 left-4 z-10">
        <div className="flex flex-col items-center gap-4">
          <img src="/snow.png" width={40} height={40} alt="snow" />
          <div className="bg-white border-2 border-black lg:w-10 lg:h-80 sm:w-8 sm:h-60 rounded-2xl relative overflow-hidden">
            <div 
              style={{ height: `${fillPercentage}%` }}
              className="bg-blue-500 w-full rounded-2xl transition-all duration-300 absolute bottom-0"
            />
          </div>
          <button 
            onClick={clearHole}
            style={{ backgroundImage: "url('/background/box.png')" }}
            className="lg:w-24 lg:h-24 sm:w-16 sm:h-16 bg-cover bg-center mt-2"
          >
            <p className="font-bold text-black lg:text-base sm:text-xs">Очистить</p>
          </button>
        </div>
      </div>

      {/* Кнопка "На базу" - справа снизу */}
      <div className="absolute bottom-4 right-4 z-40">
        <button 
          onClick={() => navigate('/')}
          style={{ backgroundImage: "url('/background/box.png')" }}
          className="lg:w-24 lg:h-24 sm:w-16 sm:h-16 bg-cover bg-center"
        >
          <p className="font-bold text-black lg:text-base sm:text-sm">На базу</p>
        </button>
      </div>
      
      {/* Удочка */}
      <div className="z-20 absolute sm:right-20 lg:right-40 sm:bottom-20 lg:bottom-32">
        {isBiting ? (
          <img 
            className="lg:w-90 sm:w-60 rotate-300"
            src="video/a2.gif"
            alt="biting"
          />
        ) : (
          <img 
            className="lg:w-90 sm:w-60 rotate-300"
            src="video/road.png"
            alt="rod"
          />
        )}
      </div>
    </div>
  );
}