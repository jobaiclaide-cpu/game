import { useState } from "react";
import { InfoBar } from "../components/InfoBar";
import { useNavigate } from "react-router-dom";

export function InventoryMenu() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();
    const [equippedItems, setEquippedItems] = useState({
        udochki: null,
        nazivka: null,
        leski: null,
        kruchki: null,
        snegohody: null
    });
    
    const handleNavigateHome = () => {
        console.log('Navigating to home');
        // Здесь будет навигация на главную
    };

    const handleNavigateUserSet = () => {
        console.log('Navigating to user settings');
        // Здесь будет навигация в настройки
    };

    // Предметы в инвентаре (здесь будут храниться купленные предметы)
    const inventory = {
        udochki: [
            { 
                id: 1, 
                name: "Деревянная удочка", 
                image: "удочки/1.png",
                rareChance: 5,
                description: "Простая удочка для начинающих",
                equipped: false
            },
            { 
                id: 2, 
                name: "Углепластиковая удочка", 
                image: "удочки/2.png",
                rareChance: 12,
                description: "Удочка среднего класса",
                equipped: false
            }
        ],
        nazivka: [
            { 
                id: 1, 
                name: "Черви (10шт)", 
                image: "наж/1.png",
                rareChance: 3,
                description: "Универсальная наживка",
                equipped: false
            }
        ],
        leski: [
            { 
                id: 1, 
                name: "Монофильная леска", 
                image: "катушки/1.png",
                rareChance: 2,
                description: "Стандартная леска",
                equipped: false
            }
        ],
        kruchki: [
            { 
                id: 1, 
                name: "Крючки №6 (10шт)", 
                image: "крючки/1.png",
                rareChance: 1,
                description: "Крючки для мелкой рыбы",
                equipped: false
            }
        ],
        snegohody: []
    };

    const categories = {
        udochki: { title: "Удочки" },
        nazivka: { title: "Наживки" },
        leski: { title: "Лески" },
        kruchki: { title: "Крючки" },
        snegohody: { title: "Снегоходы" }
    };

    const handleCategorySelect = (categoryKey) => {
        setSelectedCategory(categoryKey);
    };

    const handleEquipItem = (item, category) => {
        // Снимаем текущий экипированный предмет в этой категории
        if (equippedItems[category]) {
            const currentEquipped = inventory[category].find(i => i.id === equippedItems[category]);
            if (currentEquipped) {
                currentEquipped.equipped = false;
            }
        }

        // Экипируем новый предмет
        item.equipped = true;
        setEquippedItems(prev => ({
            ...prev,
            [category]: item.id
        }));
    };

    const handleUnequipItem = (item, category) => {
        item.equipped = false;
        setEquippedItems(prev => ({
            ...prev,
            [category]: null
        }));
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
    };

    return (
        <div className="relative ">
           <InfoBar />



            {/* Кнопки категорий слева */}
            <div className="absolute bottom-30 grid grid-cols-2 left-10 gap-2 z-10">
                <div 
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategorySelect('udochki')}
                >
                    <img
                        className="object-cover"
                        src="background/boll.png"
                        width={90}
                        height={80}
                    />
                    <img
                        className="absolute top-4"
                        src="удочки/3.png"
                        width={70} 
                    />
                    <p className="absolute bottom-[30%] text-white text-[14px] font-bold">Удочки</p>
                </div>

                <div 
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategorySelect('nazivka')}
                >
                    <img
                        className="object-cover"
                        src="background/boll.png"
                        width={90}
                        height={80}
                    />
                    <img
                        className="absolute top-3"
                        src="наж/2.png"
                        width={70} 
                    />
                    <p className="absolute bottom-[30%] text-white text-[14px] font-bold">Наживки</p>
                </div>

                <div 
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategorySelect('leski')}
                >
                    <img
                        className="object-cover"
                        src="background/boll.png"
                        width={90}
                        height={80}
                    />
                    <img
                        className="absolute"
                        src="катушки/4.png"
                        width={70} 
                    />
                    <p className="absolute bottom-[30%] text-white text-[14px] font-bold">Лески</p>
                </div>

                <div 
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategorySelect('kruchki')}
                >
                    <img
                        className="object-cover"
                        src="background/boll.png"
                        width={90}
                        height={80}
                    />
                    <img
                        className="absolute top-1"
                        src="крючки/5.png"
                        width={35} 
                    />
                    <p className="absolute bottom-[30%] text-white text-[14px] font-bold">Крючки</p>
                </div>

                <div 
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategorySelect('snegohody')}
                >
                    <img
                        className="object-cover"
                        src="background/boll.png"
                        width={90}
                        height={80}
                    />
                    <img
                        className="absolute top-2"
                        src="снегоходы/4.png"
                        width={70} 
                    />
                    <p className="absolute bottom-[30%] text-white text-[14px] font-bold">Снегоходы</p>
                </div>

                <div 
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <img
                        className="object-cover"
                        src="background/boll.png"
                        width={90}
                        height={80}
                    />
                    <img
                        className="absolute top-2"
                        src="иконки/back.png"
                        width={50} 
                    />
                    <p className="absolute bottom-[30%] text-white text-[14px] font-bold">На базу</p>
                </div>
            </div>

            {/* Главное окно инвентаря */}
            <div className="absolute top-20 right-20 z-10">
                <div className="relative">
                    <img
                        src="43.png"
                        width={650}
                        alt="inventory window"
                    />
                    
                    <div className="absolute top-12 left-8 right-8 bottom-12">
                        {!selectedCategory ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Ваш инвентарь</h2>
                                <p className="text-white font-bold mb-4">Выберите категорию слева</p>
                                <div className="mt-8">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Экипированные предметы:</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        {Object.entries(equippedItems).map(([category, itemId]) => {
                                            const item = itemId ? inventory[category]?.find(i => i.id === itemId) : null;
                                            return (
                                                <div key={category} className="bg-white/40 p-2 rounded border">
                                                    <p className="font-bold">{categories[category]?.title}:</p>
                                                    <p className="text-gray-600">
                                                        {item ? item.name : 'Не экипировано'}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full overflow-y-auto">
                                <div className="flex justify-center items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {categories[selectedCategory]?.title}
                                    </h2>
                                </div>
                                
                                {inventory[selectedCategory]?.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto">
                                        {inventory[selectedCategory].map((item) => (
                                            <div 
                                                key={item.id} 
                                                className={`bg-white/40 rounded-lg p-3 shadow border-2 ${
                                                    item.equipped ? 'border-green-500 bg-green-100/40' : 'border-black'
                                                }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="w-16 h-16 border-2 rounded flex items-center justify-center flex-shrink-0">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.name}
                                                            className="w-14 h-14 object-contain"
                                                        />
                                                    </div>
                                                    
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-bold text-gray-800 text-sm mb-1">
                                                            {item.name}
                                                            {item.equipped && (
                                                                <span className="ml-2 text-green-600 text-xs">✓ Экипировано</span>
                                                            )}
                                                        </h3>
                                                        <p className="text-xs text-gray-600 mb-2">
                                                            {item.description}
                                                        </p>
                                                        
                                                        <div className="flex items-center justify-between text-xs mb-2">
                                                            <div className="bg-yellow-100 font-bold px-2 py-1 rounded text-yellow-800">
                                                                🐟 +{item.rareChance}% шанс
                                                            </div>
                                                        </div>
                                                        
                                                        <button 
                                                            onClick={() => item.equipped ? 
                                                                handleUnequipItem(item, selectedCategory) : 
                                                                handleEquipItem(item, selectedCategory)
                                                            }
                                                            className={`w-full py-1 px-2 rounded text-xs font-semibold ${
                                                                item.equipped 
                                                                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                                                                    : 'bg-green-500 hover:bg-green-600 text-white'
                                                            }`}
                                                        >
                                                            {item.equipped ? 'Снять' : 'Экипировать'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-64">
                                        <p className="text-gray-600 text-lg">В этой категории пока нет предметов</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}