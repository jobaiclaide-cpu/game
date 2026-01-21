import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function SettingMenu() {
    // Состояния для громкости и музыки
    const navigate = useNavigate();
    const [volume, setVolume] = useState(50);
    const [music, setMusic] = useState(70);
    const volumeSliderRef = useRef(null);
    const musicSliderRef = useRef(null);
    const [activeSlider, setActiveSlider] = useState(null);

    // Функция для обработки изменения положения шарика
    const handleSliderChange = (clientX, sliderRef, setValue) => {
        if (!sliderRef.current) return;

        const slider = sliderRef.current;
        const rect = slider.getBoundingClientRect();
        const position = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const newValue = Math.round((position / rect.width) * 100);
        
        setValue(newValue);
    };

    // Обработчики для мыши/тача
    const handleMouseDown = (e, sliderRef, setValue, sliderType) => {
        setActiveSlider(sliderType);
        handleSliderChange(e.clientX, sliderRef, setValue);
    };

    const handleMouseMove = (e) => {
        if (activeSlider === 'volume') {
            handleSliderChange(e.clientX, volumeSliderRef, setVolume);
        } else if (activeSlider === 'music') {
            handleSliderChange(e.clientX, musicSliderRef, setMusic);
        }
    };

    const handleMouseUp = () => {
        setActiveSlider(null);
    };

    // Обработчики для touch событий
    const handleTouchStart = (e, sliderRef, setValue, sliderType) => {
        setActiveSlider(sliderType);
        handleSliderChange(e.touches[0].clientX, sliderRef, setValue);
    };

    const handleTouchMove = (e) => {
        if (activeSlider === 'volume') {
            handleSliderChange(e.touches[0].clientX, volumeSliderRef, setVolume);
        } else if (activeSlider === 'music') {
            handleSliderChange(e.touches[0].clientX, musicSliderRef, setMusic);
        }
    };

    // Глобальные обработчики
    useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (activeSlider) {
                setActiveSlider(null);
            }
        };

        const handleGlobalMouseMove = (e) => {
            if (activeSlider) {
                handleMouseMove(e);
            }
        };

        const handleGlobalTouchMove = (e) => {
            if (activeSlider) {
                handleTouchMove(e);
            }
        };

        const handleGlobalTouchEnd = () => {
            if (activeSlider) {
                setActiveSlider(null);
            }
        };

        document.addEventListener('mousemove', handleGlobalMouseMove);
        document.addEventListener('mouseup', handleGlobalMouseUp);
        document.addEventListener('touchmove', handleGlobalTouchMove);
        document.addEventListener('touchend', handleGlobalTouchEnd);

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
            document.removeEventListener('touchmove', handleGlobalTouchMove);
            document.removeEventListener('touchend', handleGlobalTouchEnd);
        };
    }, [activeSlider]);

    return (
        <div className="relative">
            <img 
                className="h-full"
                src="background/mbg.jpg" 
                alt="background"
            />

            {/* Верхние кнопки */}
            <button 
                onClick={() => navigate('/userset')}
                className="flex rounded-sm justify-start items-center absolute top-1 left-1 gap-2 bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC] w-50 h-11">
                <img
                    className="pl-2"
                    src="vite.svg" 
                    width={40}
                    height={40}
                />
                <p className="">Player #200</p>
            </button>
                    
            <div className="flex">
                <button className="absolute rounded-sm top-1 right-1 bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC] w-40 h-11">1000 P</button>
            </div>

            {/* Левая панель кнопок */}
            <div className="absolute left-4 top-16 flex flex-col gap-3">
                <button className="rounded-sm bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC] w-40 h-11"></button>
                <button className="rounded-sm bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC] w-40 h-11"></button>
                <button className="rounded-sm bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC] w-40 h-11"></button>
            </div>

            {/* Центральный блок с квадратами и ползунками */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* Верхний квадрат и ползунок громкости */}
                <div className="flex items-center justify-center mb-8 lg:mb-12">
                    <div className="rounded-sm bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC] w-14 h-14"></div>
                    
                    <div className="w-50 lg:w-60 flex items-center ml-4 lg:ml-6">
                        <div 
                            ref={volumeSliderRef}
                            className="relative rounded-xl bg-gray-400 border-2 border-white h-6 w-full flex items-center cursor-pointer"
                            onMouseDown={(e) => handleMouseDown(e, volumeSliderRef, setVolume, 'volume')}
                            onTouchStart={(e) => handleTouchStart(e, volumeSliderRef, setVolume, 'volume')}
                        >
                            <div className="absolute left-0 right-0 mx-auto h-1 bg-black w-[95%]"></div>
                            
                            <div 
                                className="absolute bg-blue-800 rounded-full h-7 w-7 -ml-3.5 cursor-pointer transition-transform duration-100 hover:scale-110 active:scale-95"
                                style={{ left: `${volume}%` }}
                                onMouseDown={(e) => handleMouseDown(e, volumeSliderRef, setVolume, 'volume')}
                                onTouchStart={(e) => handleTouchStart(e, volumeSliderRef, setVolume, 'volume')}
                            ></div>
                        </div>
                        
                        <span className="ml-3 text-white font-bold text-sm min-w-8">
                            {volume}%
                        </span>
                    </div>
                </div>

                {/* Нижний квадрат и ползунок музыки */}
                <div className="flex items-center justify-center">
                    <div className="rounded-sm bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC] w-14 h-14"></div>
                    
                    <div className="w-50 lg:w-60 flex items-center ml-4 lg:ml-6">
                        <div 
                            ref={musicSliderRef}
                            className="relative rounded-xl bg-gray-400 border-2 border-white h-6 w-full flex items-center cursor-pointer"
                            onMouseDown={(e) => handleMouseDown(e, musicSliderRef, setMusic, 'music')}
                            onTouchStart={(e) => handleTouchStart(e, musicSliderRef, setMusic, 'music')}
                        >
                            <div className="absolute left-0 right-0 mx-auto h-1 bg-black w-[95%]"></div>
                            
                            <div 
                                className="absolute bg-blue-800 rounded-full h-7 w-7 -ml-3.5 cursor-pointer transition-transform duration-100 hover:scale-110 active:scale-95"
                                style={{ left: `${music}%` }}
                                onMouseDown={(e) => handleMouseDown(e, musicSliderRef, setMusic, 'music')}
                                onTouchStart={(e) => handleTouchStart(e, musicSliderRef, setMusic, 'music')}
                            ></div>
                        </div>
                        
                        <span className="ml-3 text-white font-bold text-sm min-w-8">
                            {music}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Нижняя кнопка */}
            <button 
                onClick={() => navigate('/')}
                className="absolute bottom-2 left-4 rounded-4xl bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC] w-12 h-12">
                {/* Иконка стрелочки */}
            </button>
        </div>
    );
}