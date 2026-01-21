import { useState, useEffect } from "react";
import { InfoBar } from "../components/InfoBar";
import { useNavigate } from "react-router-dom";
import { inventoryStorage, equippedItemsStorage } from "../utils/localStorage";

export function InventoryMenu() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();
    const [equippedItems, setEquippedItems] = useState({});
    const [inventory, setInventory] = useState({});

    // Load inventory and equipped items from localStorage on mount
    useEffect(() => {
        const loadedInventory = inventoryStorage.get();
        const loadedEquipped = equippedItemsStorage.get();

        // Initialize with default items if inventory is empty
        if (Object.values(loadedInventory).every(arr => arr.length === 0)) {
            const defaultInventory = {
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
            inventoryStorage.set(defaultInventory);
            setInventory(defaultInventory);
        } else {
            setInventory(loadedInventory);
        }

        setEquippedItems(loadedEquipped);
    }, []);

    // Save equipped items to localStorage whenever they change
    useEffect(() => {
        equippedItemsStorage.set(equippedItems);
    }, [equippedItems]);

    // Save inventory to localStorage whenever it changes
    useEffect(() => {
        if (Object.keys(inventory).length > 0) {
            inventoryStorage.set(inventory);
        }
    }, [inventory]);

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
        // Create new inventory state
        const newInventory = { ...inventory };

        // Unequip current item in this category
        if (equippedItems[category]) {
            const currentEquipped = newInventory[category].find(i => i.id === equippedItems[category]);
            if (currentEquipped) {
                currentEquipped.equipped = false;
            }
        }

        // Equip new item
        const itemToEquip = newInventory[category].find(i => i.id === item.id);
        if (itemToEquip) {
            itemToEquip.equipped = true;
        }

        setInventory(newInventory);
        setEquippedItems(prev => ({
            ...prev,
            [category]: item.id
        }));
    };

    const handleUnequipItem = (item, category) => {
        const newInventory = { ...inventory };
        const itemToUnequip = newInventory[category].find(i => i.id === item.id);
        if (itemToUnequip) {
            itemToUnequip.equipped = false;
        }

        setInventory(newInventory);
        setEquippedItems(prev => ({
            ...prev,
            [category]: null
        }));
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
    };

    return (
        <div className="relative min-h-screen">
           <InfoBar />

            {/* Кнопки категорий слева - responsive */}
            <div className="absolute bottom-10 sm:bottom-20 md:bottom-30 grid grid-cols-2 left-4 sm:left-10 gap-1 sm:gap-2 z-10">
                <div
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategorySelect('udochki')}
                >
                    <img
                        className="object-cover w-16 sm:w-20 md:w-[90px]"
                        src="background/boll.png"
                        width={90}
                        height={80}
                        alt="button"
                    />
                    <img
                        className="absolute top-2 sm:top-4 w-12 sm:w-16 md:w-[70px]"
                        src="удочки/3.png"
                        width={70}
                        alt="rod"
                    />
                    <p className="absolute bottom-[30%] text-white text-[10px] sm:text-xs md:text-[14px] font-bold">Удочки</p>
                </div>

                <div
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategorySelect('nazivka')}
                >
                    <img
                        className="object-cover w-16 sm:w-20 md:w-[90px]"
                        src="background/boll.png"
                        width={90}
                        height={80}
                        alt="button"
                    />
                    <img
                        className="absolute top-2 sm:top-3 w-12 sm:w-16 md:w-[70px]"
                        src="наж/2.png"
                        width={70}
                        alt="bait"
                    />
                    <p className="absolute bottom-[30%] text-white text-[10px] sm:text-xs md:text-[14px] font-bold">Наживки</p>
                </div>

                <div
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategorySelect('leski')}
                >
                    <img
                        className="object-cover w-16 sm:w-20 md:w-[90px]"
                        src="background/boll.png"
                        width={90}
                        height={80}
                        alt="button"
                    />
                    <img
                        className="absolute w-12 sm:w-16 md:w-[70px]"
                        src="катушки/4.png"
                        width={70}
                        alt="line"
                    />
                    <p className="absolute bottom-[30%] text-white text-[10px] sm:text-xs md:text-[14px] font-bold">Лески</p>
                </div>

                <div
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategorySelect('kruchki')}
                >
                    <img
                        className="object-cover w-16 sm:w-20 md:w-[90px]"
                        src="background/boll.png"
                        width={90}
                        height={80}
                        alt="button"
                    />
                    <img
                        className="absolute top-1 w-6 sm:w-8 md:w-[35px]"
                        src="крючки/5.png"
                        width={35}
                        alt="hook"
                    />
                    <p className="absolute bottom-[30%] text-white text-[10px] sm:text-xs md:text-[14px] font-bold">Крючки</p>
                </div>

                <div
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategorySelect('snegohody')}
                >
                    <img
                        className="object-cover w-16 sm:w-20 md:w-[90px]"
                        src="background/boll.png"
                        width={90}
                        height={80}
                        alt="button"
                    />
                    <img
                        className="absolute top-2 w-12 sm:w-16 md:w-[70px]"
                        src="снегоходы/4.png"
                        width={70}
                        alt="snowmobile"
                    />
                    <p className="absolute bottom-[30%] text-white text-[10px] sm:text-xs md:text-[14px] font-bold">Снегоходы</p>
                </div>

                <div
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <img
                        className="object-cover w-16 sm:w-20 md:w-[90px]"
                        src="background/boll.png"
                        width={90}
                        height={80}
                        alt="button"
                    />
                    <img
                        className="absolute top-2 w-8 sm:w-12 md:w-[50px]"
                        src="иконки/back.png"
                        width={50}
                        alt="back"
                    />
                    <p className="absolute bottom-[30%] text-white text-[10px] sm:text-xs md:text-[14px] font-bold">На базу</p>
                </div>
            </div>

            {/* Главное окно инвентаря - fully responsive */}
            <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="relative w-full max-w-3xl mx-4 pointer-events-auto">
                    <div className="relative bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('43.png')" }}>
                        <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                                {!selectedCategory ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center">
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Ваш инвентарь</h2>
                                        <p className="text-white font-bold mb-4 text-sm sm:text-base">Выберите категорию слева</p>
                                        <div className="mt-4 sm:mt-8 w-full">
                                            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">Экипированные предметы:</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                                                {Object.entries(equippedItems).map(([category, itemId]) => {
                                                    const item = itemId ? inventory[category]?.find(i => i.id === itemId) : null;
                                                    return (
                                                        <div key={category} className="bg-white/40 p-2 rounded border">
                                                            <p className="font-bold">{categories[category]?.title}:</p>
                                                            <p className="text-gray-600 truncate">
                                                                {item ? item.name : 'Не экипировано'}
                                                            </p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full overflow-y-auto max-h-[60vh]">
                                        <div className="flex justify-between items-center mb-4">
                                            <button
                                                onClick={handleBackToCategories}
                                                className="text-gray-800 hover:text-gray-600 text-lg sm:text-xl font-bold"
                                            >
                                                ← Назад
                                            </button>
                                            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                                                {categories[selectedCategory]?.title}
                                            </h2>
                                            <div className="w-8"></div>
                                        </div>

                                        {inventory[selectedCategory]?.length > 0 ? (
                                            <div className="grid grid-cols-1 gap-2 sm:gap-3">
                                                {inventory[selectedCategory].map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className={`bg-white/40 rounded-lg p-2 sm:p-3 shadow border-2 ${
                                                            item.equipped ? 'border-green-500 bg-green-100/40' : 'border-black'
                                                        }`}
                                                    >
                                                        <div className="flex items-start gap-2 sm:gap-3">
                                                            <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 rounded flex items-center justify-center flex-shrink-0">
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                                                                />
                                                            </div>

                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="font-bold text-gray-800 text-xs sm:text-sm mb-1">
                                                                    {item.name}
                                                                    {item.equipped && (
                                                                        <span className="ml-2 text-green-600 text-[10px] sm:text-xs">✓ Экипировано</span>
                                                                    )}
                                                                </h3>
                                                                <p className="text-[10px] sm:text-xs text-gray-600 mb-2">
                                                                    {item.description}
                                                                </p>

                                                                <div className="flex items-center justify-between text-[10px] sm:text-xs mb-2">
                                                                    <div className="bg-yellow-100 font-bold px-2 py-1 rounded text-yellow-800">
                                                                        🐟 +{item.rareChance}% шанс
                                                                    </div>
                                                                </div>

                                                                <button
                                                                    onClick={() => item.equipped ?
                                                                        handleUnequipItem(item, selectedCategory) :
                                                                        handleEquipItem(item, selectedCategory)
                                                                    }
                                                                    className={`w-full py-1 px-2 rounded text-[10px] sm:text-xs font-semibold ${
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
                                            <div className="flex items-center justify-center h-40 sm:h-64">
                                                <p className="text-gray-600 text-sm sm:text-lg">В этой категории пока нет предметов</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
