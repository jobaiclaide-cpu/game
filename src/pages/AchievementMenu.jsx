import { useState } from "react";
import { InfoBar } from "../components/InfoBar";
import { useNavigate } from "react-router-dom";

export function AchievementMenu() {
    const [selectedCategory, setSelectedCategory] = useState('global');
    const navigate = useNavigate();

    // Данные достижений по категориям
    const achievementCategories = {
        global: {
            title: "Глобальные достижения",
            achievements: [
                {
                    id: 1,
                    name: "Первый улов",
                    description: "Поймайте первую рыбу",
                    progress: 1,
                    maxProgress: 1,
                    reward: "Значок новичка",
                    completed: true,
                    icon: "icon/9.png",
                    rarity: "common"
                },
                {
                    id: 2,
                    name: "Коллекционер",
                    description: "Поймайте 50 разных видов рыб",
                    progress: 23,
                    maxProgress: 50,
                    reward: "Золотой значок + 500 руб",
                    completed: false,
                    icon: "icon/4.png",
                    rarity: "epic"
                },
                {
                    id: 3,
                    name: "Рыбак-легенда",
                    description: "Поймайте 1000 рыб",
                    progress: 456,
                    maxProgress: 1000,
                    reward: "Легендарная удочка",
                    completed: false,
                    icon: "icon/9.png",
                    rarity: "legendary"
                },
                {
                    id: 4,
                    name: "Торговец",
                    description: "Потратьте 10000 рублей в магазине",
                    progress: 3450,
                    maxProgress: 10000,
                    reward: "Скидка 20% навсегда",
                    completed: false,
                    icon: "icon/2.png",
                    rarity: "rare"
                },
                {
                    id: 5,
                    name: "Исследователь",
                    description: "Посетите все локации",
                    progress: 8,
                    maxProgress: 12,
                    reward: "Карта сокровищ",
                    completed: false,
                    icon: "icon/2.png",
                    rarity: "epic"
                }
            ]
        },
        local: {
            title: "Локальные достижения",
            achievements: [
                {
                    id: 1,
                    name: "Хозяин пруда",
                    description: "Поймайте 100 рыб в городском пруду",
                    progress: 100,
                    maxProgress: 100,
                    reward: "Ключ от пруда",
                    completed: true,
                    icon: "icon/9.png",
                    rarity: "rare"
                },
                {
                    id: 2,
                    name: "Покоритель реки",
                    description: "Поймайте крупную рыбу в реке",
                    progress: 3,
                    maxProgress: 5,
                    reward: "Речная удочка",
                    completed: false,
                    icon: "icon/5.png",
                    rarity: "common"
                },
                {
                    id: 3,
                    name: "Морской волк",
                    description: "Поймайте редкую морскую рыбу",
                    progress: 0,
                    maxProgress: 1,
                    reward: "Морская леска + 1000 руб",
                    completed: false,
                    icon: "icon/7.png",
                    rarity: "legendary"
                },
                {
                    id: 4,
                    name: "Озерный мастер",
                    description: "Поймайте 25 рыб в горном озере",
                    progress: 18,
                    maxProgress: 25,
                    reward: "Горные крючки",
                    completed: false,
                    icon: "icon/4.png",
                    rarity: "rare"
                },
                {
                    id: 5,
                    name: "Ночной охотник",
                    description: "Поймайте рыбу ночью в болоте",
                    progress: 1,
                    maxProgress: 10,
                    reward: "Ночная наживка",
                    completed: false,
                    icon: "icon/2.png",
                    rarity: "epic"
                }
            ]
        }
    };

    const getRarityColor = (rarity) => {
        switch (rarity) {
            case 'common': return 'bg-gray-100/60 border-gray-400';
            case 'rare': return 'bg-blue-100/60 border-blue-500';
            case 'epic': return 'bg-purple-100/60 border-purple-500';
            case 'legendary': return 'bg-yellow-100/60 border-yellow-500';
            default: return 'bg-white/40 border-gray-400';
        }
    };

    const getRarityText = (rarity) => {
        switch (rarity) {
            case 'common': return 'Обычное';
            case 'rare': return 'Редкое';
            case 'epic': return 'Эпическое';
            case 'legendary': return 'Легендарное';
            default: return 'Неизвестное';
        }
    };

    const handleCategorySelect = (categoryKey) => {
        setSelectedCategory(categoryKey);
    };

    const handleClaimAchievement = (achievement) => {
        if (achievement.completed) {
            alert(`Получена награда: ${achievement.reward}`);
        } else {
            alert("Достижение ещё не получено!");
        }
    };

    return (
        <div className="relative ">
            {/* Фон */}
            <InfoBar />

            {/* Кнопки категорий слева */}
            <div className="absolute bottom-30 left-10 z-10 flex flex-col gap-2">
                <div 
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategorySelect('global')}
                >
                    <img className="object-cover" src="background/boll.png" width={90} height={80} />
                    <img 
                    src='mainmenu/crown.webp'
                    width={50}
                    className="absolute top-4 text-2xl" />
                    <p className="absolute bottom-[30%] text-white text-[14px] font-bold text-center">Глобальные</p>
                </div>

                <div 
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategorySelect('local')}
                >
                    <img className="object-cover" src="background/boll.png" width={90} height={80} />
                    <img 
                    src='mainmenu/crown.webp'
                    width={50}
                    className="absolute top-4 text-2xl" />
                    <p className="absolute bottom-[30%] text-white text-[14px] font-bold text-center">Локальные</p>
                </div>

                <div 
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <img className="object-cover" src="background/boll.png" width={90} height={80} />
                    <img className="absolute top-2" src="иконки/back.png" width={50} />
                    <p className="absolute bottom-[30%] text-white text-[14px] font-bold">На базу</p>
                </div>
            </div>

            {/* Главное окно достижений */}
            <div className="absolute top-20 right-20 z-10">
                <div className="relative">
                    <img src="43.png" width={650} alt="achievements window" />
                    
                    <div className="absolute top-12 left-8 right-8 bottom-12">
                        <div className="h-full overflow-y-auto">
                            <div className="flex justify-center items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    🏆 {achievementCategories[selectedCategory]?.title}
                                </h2>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-3 max-h-[450px] overflow-y-auto pr-2">
                                {achievementCategories[selectedCategory]?.achievements.map((achievement) => (
                                    <div 
                                        key={achievement.id} 
                                        className={`rounded-lg p-4 shadow border-2 ${getRarityColor(achievement.rarity)} ${
                                            achievement.completed ? 'opacity-100' : 'opacity-75'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <img 
                                            src={achievement.icon}
                                            className="w-16 h-16 border-2 rounded-lg flex items-center justify-center flex-shrink-0 bg-white text-2xl" />
                                                
                                            
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-bold text-gray-800 text-base">
                                                            {achievement.name}
                                                            {achievement.completed && (
                                                                <span className="ml-2 text-green-600 text-sm">✓ Получено</span>
                                                            )}
                                                        </h3>
                                                        <span className={`text-xs px-2 py-1 rounded ${
                                                            achievement.rarity === 'legendary' ? 'bg-yellow-200 text-yellow-800' :
                                                            achievement.rarity === 'epic' ? 'bg-purple-200 text-purple-800' :
                                                            achievement.rarity === 'rare' ? 'bg-blue-200 text-blue-800' :
                                                            'bg-gray-200 text-gray-800'
                                                        }`}>
                                                            {getRarityText(achievement.rarity)}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-sm text-gray-600 mb-3">
                                                    {achievement.description}
                                                </p>
                                                
                                                {/* Прогресс бар */}
                                                <div className="mb-3">
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>Прогресс:</span>
                                                        <span className="font-bold">{achievement.progress}/{achievement.maxProgress}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className={`h-2 rounded-full ${
                                                                achievement.completed ? 'bg-green-500' : 
                                                                achievement.rarity === 'legendary' ? 'bg-yellow-500' :
                                                                achievement.rarity === 'epic' ? 'bg-purple-500' :
                                                                achievement.rarity === 'rare' ? 'bg-blue-500' :
                                                                'bg-gray-500'
                                                            }`}
                                                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                
                                                <div className="bg-orange-100 font-bold px-3 py-2 rounded-lg text-orange-800 text-sm mb-3 inline-block">
                                                    🎁 {achievement.reward}
                                                </div>
                                                
                                                <button 
                                                    onClick={() => handleClaimAchievement(achievement)}
                                                    disabled={!achievement.completed}
                                                    className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                                                        achievement.completed
                                                            ? 'bg-green-500 hover:bg-green-600 text-white'
                                                            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                                    }`}
                                                >
                                                    {achievement.completed 
                                                        ? '🏆 Забрать награду' 
                                                        : `⏳ ${Math.round((achievement.progress / achievement.maxProgress) * 100)}%`
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
