import { useState } from "react";
import { InfoBar } from "../components/InfoBar";
import { useNavigate } from "react-router-dom";

export function SellMenu() {
    const [fishInCage, setFishInCage] = useState([
        {
            id: 1,
            name: "Карп обыкновенный",
            weight: 1.2,
            length: 35,
            rarity: "common",
            price: 45,
            image: "icon/9.png",
            location: "Городской пруд",
            caughtTime: "2 часа назад"
        },
        {
            id: 2,
            name: "Щука",
            weight: 2.8,
            length: 58,
            rarity: "rare",
            price: 120,
            image: "icon/9.png",
            location: "Река",
            caughtTime: "1 час назад"
        },
        {
            id: 3,
            name: "Окунь",
            weight: 0.8,
            length: 22,
            rarity: "common",
            price: 25,
            image: "icon/9.png",
            location: "Городской пруд",
            caughtTime: "3 часа назад"
        },
        {
            id: 4,
            name: "Судак",
            weight: 1.9,
            length: 45,
            rarity: "rare",
            price: 95,
            image: "icon/9.png",
            location: "Река",
            caughtTime: "30 минут назад"
        },
        {
            id: 5,
            name: "Лещ",
            weight: 1.5,
            length: 38,
            rarity: "common",
            price: 60,
            image: "icon/9.png",
            location: "Озеро",
            caughtTime: "4 часа назад"
        },
        {
            id: 6,
            name: "Форель радужная",
            weight: 1.1,
            length: 32,
            rarity: "epic",
            price: 180,
            image: "icon/9.png",
            location: "Горное озеро",
            caughtTime: "1 час назад"
        },
        {
            id: 7,
            name: "Сом",
            weight: 4.5,
            length: 78,
            rarity: "legendary",
            price: 450,
            image: "icon/9.png",
            location: "Река",
            caughtTime: "6 часов назад"
        }
    ]);

    const [balance, setBalance] = useState(1000);
    const navigate = useNavigate();

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
            case 'common': return 'Обычная';
            case 'rare': return 'Редкая';
            case 'epic': return 'Эпическая';
            case 'legendary': return 'Легендарная';
            default: return 'Неизвестная';
        }
    };

    const getRarityIcon = (rarity) => {
        switch (rarity) {
            case 'common': return '⚪';
            case 'rare': return '🔵';
            case 'epic': return '🟣';
            case 'legendary': return '🟡';
            default: return '⚪';
        }
    };

    const handleSellFish = (fish) => {
        setBalance(prevBalance => prevBalance + fish.price);
        setFishInCage(prevFish => prevFish.filter(f => f.id !== fish.id));
        alert(`Продано: ${fish.name} за ${fish.price} руб.`);
    };

    const handleSellAll = () => {
        const totalPrice = fishInCage.reduce((sum, fish) => sum + fish.price, 0);
        const totalFish = fishInCage.length;
        
        if (totalFish === 0) {
            alert("Садок пуст!");
            return;
        }

        setBalance(prevBalance => prevBalance + totalPrice);
        setFishInCage([]);
        alert(`Продано ${totalFish} рыб на сумму ${totalPrice} руб.`);
    };

    const getTotalValue = () => {
        return fishInCage.reduce((sum, fish) => sum + fish.price, 0);
    };

    return (
        <div className="relative">
            {/* Фон */}
            <InfoBar />

            {/* Кнопки слева */}
            <div className="absolute bottom-30 left-10 z-10 flex flex-col gap-2">
                <div 
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <img className="object-cover" src="background/boll.png" width={90} height={80} />
                    <img className="absolute top-2" src="иконки/back.png" width={50} />
                    <p className="absolute bottom-[30%] text-white text-[14px] font-bold">На базу</p>
                </div>
            </div>

            {/* Главное окно продажи */}
            <div className="absolute top-20 right-20 z-10">
                <div className="relative">
                    <img src="43.png" width={650} alt="sell window" />
                    
                    <div className="absolute top-12 left-8 right-8 bottom-12">
                        <div className="h-full overflow-y-auto">
                            {/* Заголовок и общая информация */}
                            <div className="flex justify-center items-center mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">💰 Продажа рыбы</h2>
                            </div>

                            {/* Статистика садка */}
                            <div className="bg-green-100/60 rounded-lg p-3 mb-4 border border-green-400">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-semibold text-green-800">
                                            🐟 В садке: {fishInCage.length} рыб
                                        </p>
                                        <p className="text-sm text-green-700">
                                            💎 Общая стоимость: {getTotalValue()} руб.
                                        </p>
                                    </div>
                                    <button 
                                        onClick={handleSellAll}
                                        disabled={fishInCage.length === 0}
                                        className={`py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                                            fishInCage.length > 0
                                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    >
                                        💰 Продать всё
                                    </button>
                                </div>
                            </div>
                            
                            {/* Список рыбы */}
                            <div className="grid grid-cols-1 gap-3 max-h-[350px] overflow-y-auto pr-2">
                                {fishInCage.length === 0 ? (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-2">🎣</div>
                                        <p className="text-gray-600">Садок пуст</p>
                                        <p className="text-sm text-gray-500">Поймайте рыбу, чтобы её продать</p>
                                    </div>
                                ) : (
                                    fishInCage.map((fish) => (
                                        <div 
                                            key={fish.id} 
                                            className={`rounded-lg p-3 shadow border-2 ${getRarityColor(fish.rarity)}`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="w-16 h-16 border-2 rounded-lg flex items-center justify-center flex-shrink-0 bg-white">
                                                    <img 
                                                        src={fish.image} 
                                                        alt={fish.name}
                                                        className="w-14 h-14 object-contain"
                                                    />
                                                </div>
                                                
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h3 className="font-bold text-gray-800 text-sm">
                                                                {fish.name}
                                                            </h3>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className={`text-xs px-2 py-1 rounded ${
                                                                    fish.rarity === 'legendary' ? 'bg-yellow-200 text-yellow-800' :
                                                                    fish.rarity === 'epic' ? 'bg-purple-200 text-purple-800' :
                                                                    fish.rarity === 'rare' ? 'bg-blue-200 text-blue-800' :
                                                                    'bg-gray-200 text-gray-800'
                                                                }`}>
                                                                    {getRarityIcon(fish.rarity)} {getRarityText(fish.rarity)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="font-bold text-green-600 text-lg">
                                                                {fish.price} руб.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Характеристики рыбы */}
                                                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
                                                        <div className="bg-white/50 rounded p-1">
                                                            <span className="font-semibold">⚖️ Вес:</span> {fish.weight} кг
                                                        </div>
                                                        <div className="bg-white/50 rounded p-1">
                                                            <span className="font-semibold">📏 Длина:</span> {fish.length} см
                                                        </div>
                                                        <div className="bg-white/50 rounded p-1">
                                                            <span className="font-semibold">📍 Место:</span> {fish.location}
                                                        </div>
                                                        <div className="bg-white/50 rounded p-1">
                                                            <span className="font-semibold">⏰ Поймана:</span> {fish.caughtTime}
                                                        </div>
                                                    </div>
                                                    
                                                    <button 
                                                        onClick={() => handleSellFish(fish)}
                                                        className="w-full py-2 px-3 rounded-lg text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                                                    >
                                                        💰 Продать за {fish.price} руб.
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
