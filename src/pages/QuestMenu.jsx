import { useState } from "react";
import { InfoBar } from "../components/InfoBar";
import { useNavigate } from "react-router-dom";

export function QuestMenu() {
    const [selectedCategory, setSelectedCategory] = useState('daily');
    const navigate = useNavigate();

    // Данные квестов по категориям
    const questCategories = {
        daily: {
            title: "Ежедневные квесты",
            quests: [
                {
                    id: 1,
                    name: "Выловить рыбу",
                    description: "Поймайте любую рыбу",
                    progress: 10,
                    maxProgress: 10,
                    reward: "50 руб + опыт",
                    completed: true,
                    icon: "🎣"
                },
                {
                    id: 2,
                    name: "Ремонт снастей",
                    description: "Отремонтируйте снасти",
                    progress: 1,
                    maxProgress: 3,
                    reward: "25 руб",
                    completed: false,
                    icon: "🔧"
                },
                {
                    id: 3,
                    name: "Участвовать в турнире",
                    description: "Примите участие в любом турнире",
                    progress: 1,
                    maxProgress: 3,
                    reward: "100 руб + крючки",
                    completed: false,
                    icon: "🏆"
                },
                {
                    id: 4,
                    name: "Совершить покупку",
                    description: "Купите что-нибудь в магазине",
                    progress: 1,
                    maxProgress: 1,
                    reward: "30 руб",
                    completed: true,
                    icon: "🛒"
                }
            ]
        },
        weekly: {
            title: "Еженедельные квесты",
            quests: [
                {
                    id: 1,
                    name: "Наполнить садок",
                    description: "Поймайте 25 рыб за неделю",
                    progress: 11,
                    maxProgress: 25,
                    reward: "200 руб + наживка",
                    completed: false,
                    icon: "🐟"
                },
                {
                    id: 2,
                    name: "Поделиться уловом",
                    description: "Поделитесь фото улова в соцсетях",
                    progress: 1,
                    maxProgress: 3,
                    reward: "150 руб",
                    completed: false,
                    icon: "📸"
                },
                {
                    id: 3,
                    name: "Исследовать локации",
                    description: "Посетите 5 разных мест для рыбалки",
                    progress: 2,
                    maxProgress: 5,
                    reward: "300 руб + удочка",
                    completed: false,
                    icon: "🗺️"
                }
            ]
        },
        seasonal: {
            title: "Сезонные квесты",
            quests: [
                {
                    id: 1,
                    name: "Зимний рыбак",
                    description: "Поймайте 100 рыб зимой",
                    progress: 45,
                    maxProgress: 100,
                    reward: "1000 руб + снегоход",
                    completed: false,
                    icon: "❄️"
                },
                {
                    id: 2,
                    name: "Ледяной трофей",
                    description: "Поймайте редкую зимнюю рыбу",
                    progress: 0,
                    maxProgress: 1,
                    reward: "500 руб + леска Premium",
                    completed: false,
                    icon: "🏅"
                },
                {
                    id: 3,
                    name: "Мастер подледной ловли",
                    description: "Используйте все виды зимних снастей",
                    progress: 2,
                    maxProgress: 4,
                    reward: "800 руб + крючки тройные",
                    completed: false,
                    icon: "🎯"
                }
            ]
        }
    };

    const handleCategorySelect = (categoryKey) => {
        setSelectedCategory(categoryKey);
    };

    const handleClaimQuest = (quest) => {
        if (quest.completed) {
            alert(`Получена награда: ${quest.reward}`);
        } else {
            alert("Квест ещё не выполнен!");
        }
    };

    return (
        <div className="relative">
            {/* Фон */}
            <InfoBar />

            {/* Кнопки категорий слева */}
            <div className="absolute bottom-30 left-10 z-10 flex flex-col gap-2">
                <div 
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategorySelect('daily')}
                >
                    <img className="object-cover" src="background/boll.png" width={90} height={80} />
                    <div className="absolute top-3 text-2xl">📅</div>
                    <p className="absolute bottom-[30%] text-white text-[12px] font-bold text-center">Ежедневные</p>
                </div>

                <div 
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategorySelect('weekly')}
                >
                    <img className="object-cover" src="background/boll.png" width={90} height={80} />
                    <div className="absolute top-3 text-2xl">📊</div>
                    <p className="absolute bottom-[30%] text-white text-[12px] font-bold text-center">Еженедельные</p>
                </div>

                <div 
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategorySelect('seasonal')}
                >
                    <img className="object-cover" src="background/boll.png" width={90} height={80} />
                    <div className="absolute top-3 text-2xl">🌟</div>
                    <p className="absolute bottom-[30%] text-white text-[12px] font-bold text-center">Сезонные</p>
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

            {/* Главное окно квестов */}
            <div className="absolute top-20 right-20 z-10">
                <div className="relative">
                    <img src="43.png" width={650} alt="quests window" />
                    
                    <div className="absolute top-12 left-8 right-8 bottom-12">
                        <div className="h-full overflow-y-auto">
                            <div className="flex justify-center items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {questCategories[selectedCategory]?.title}
                                </h2>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-3 max-h-[450px] overflow-y-auto pr-2">
                                {questCategories[selectedCategory]?.quests.map((quest) => (
                                    <div 
                                        key={quest.id} 
                                        className={`rounded-lg p-4 shadow border-2 ${
                                            quest.completed 
                                                ? 'bg-green-100/60 border-green-500' 
                                                : 'bg-white/40 border-blue-400'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 border-2 rounded-lg flex items-center justify-center flex-shrink-0 bg-white text-2xl">
                                                {quest.icon}
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="font-bold text-gray-800 text-base">
                                                        {quest.name}
                                                        {quest.completed && (
                                                            <span className="ml-2 text-green-600 text-sm">✓ Выполнено</span>
                                                        )}
                                                    </h3>
                                                </div>
                                                
                                                <p className="text-sm text-gray-600 mb-3">
                                                    {quest.description}
                                                </p>
                                                
                                                {/* Прогресс бар */}
                                                <div className="mb-3">
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>Прогресс:</span>
                                                        <span className="font-bold">{quest.progress}/{quest.maxProgress}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className={`h-2 rounded-full ${
                                                                quest.completed ? 'bg-green-500' : 'bg-blue-500'
                                                            }`}
                                                            style={{ width: `${(quest.progress / quest.maxProgress) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                
                                                <div className="bg-yellow-100 font-bold px-3 py-2 rounded-lg text-yellow-800 text-sm mb-3 inline-block">
                                                    🎁 {quest.reward}
                                                </div>
                                                
                                                <button 
                                                    onClick={() => handleClaimQuest(quest)}
                                                    disabled={!quest.completed}
                                                    className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                                                        quest.completed
                                                            ? 'bg-green-500 hover:bg-green-600 text-white'
                                                            : 'bg-blue-300 text-blue-700 cursor-not-allowed'
                                                    }`}
                                                >
                                                    {quest.completed 
                                                        ? '🎁 Забрать награду' 
                                                        : '⏳ В процессе'
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