import { useState } from "react";
import { InfoBar } from "../components/InfoBar";
import { useNavigate } from "react-router-dom";

export function ShopMenu() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [balance, setBalance] = useState(1000);
    const navigate = useNavigate();
    // Данные товаров по категориям
    const categories = {
        udochki: {
            title: "Удочки",
            items: [
                { 
                    id: 1, 
                    name: "Деревянная удочка", 
                    price: 100, 
                    image: "удочки/1.png",
                    rareChance: 5,
                    description: "Простая удочка для начинающих"
                },
                { 
                    id: 2, 
                    name: "Углепластиковая удочка", 
                    price: 300, 
                    image: "удочки/2.png",
                    rareChance: 12,
                    description: "Удочка среднего класса"
                },
                { 
                    id: 3, 
                    name: "Профессиональная удочка", 
                    price: 800, 
                    image: "удочки/3.png",
                    rareChance: 25,
                    description: "Удочка для опытных рыбаков"
                }
            ]
        },
        nazivka: {
            title: "Наживки",
            items: [
                { 
                    id: 1, 
                    name: "Черви (10шт)", 
                    price: 20, 
                    image: "наж/1.png",
                    rareChance: 3,
                    description: "Универсальная наживка"
                },
                { 
                    id: 2, 
                    name: "Улитки (15шт)", 
                    price: 35, 
                    image: "наж/2.png",
                    rareChance: 8,
                    description: "Наживка для хищной рыбы"
                },
                { 
                    id: 3, 
                    name: "Жук (5шт)", 
                    price: 60, 
                    image: "наж/3.png",
                    rareChance: 15,
                    description: "Премиальная наживка"
                }
            ]
        },
        leski: {
            title: "Лески",
            items: [
                { 
                    id: 1, 
                    name: "Монофильная леска", 
                    price: 50, 
                    image: "катушки/1.png",
                    rareChance: 2,
                    description: "Стандартная леска"
                },
                { 
                    id: 2, 
                    name: "Флюорокарбон", 
                    price: 120, 
                    image: "катушки/2.png",
                    rareChance: 7,
                    description: "Незаметная леска"
                },
                { 
                    id: 3, 
                    name: "Плетенка Premium", 
                    price: 200, 
                    image: "катушки/3.png",
                    rareChance: 12,
                    description: "Прочная плетеная леска"
                }
            ]
        },
        kruchki: {
            title: "Крючки",
            items: [
                { 
                    id: 1, 
                    name: "Крючки №6 (10шт)", 
                    price: 15, 
                    image: "крючки/1.png",
                    rareChance: 1,
                    description: "Крючки для мелкой рыбы"
                },
                { 
                    id: 2, 
                    name: "Крючки №4 острые (8шт)", 
                    price: 30, 
                    image: "крючки/2.png",
                    rareChance: 4,
                    description: "Крючки для средней рыбы"
                },
                { 
                    id: 3, 
                    name: "Крючки №1 тройные (5шт)", 
                    price: 45, 
                    image: "крючки/3.png",
                    rareChance: 8,
                    description: "Крючки для крупной рыбы"
                }
            ]
        },
        snegohody: {
            title: "Снегоходы",
            items: [
                { 
                    id: 1, 
                    name: "Снегоход Basic", 
                    price: 500, 
                    image: "снегоходы/1.png",
                    rareChance: 10,
                    description: "Простой снегоход"
                },
                { 
                    id: 2, 
                    name: "Снегоход Pro", 
                    price: 1200, 
                    image: "снегоходы/2.png",
                    rareChance: 20,
                    description: "Быстрый снегоход"
                },
                { 
                    id: 3, 
                    name: "Снегоход Elite", 
                    price: 2500, 
                    image: "снегоходы/3.png",
                    rareChance: 35,
                    description: "Премиум снегоход"
                }
            ]
        }
    };

    const handleCategorySelect = (categoryKey) => {
        setSelectedCategory(categoryKey);
    };

    const handleBuyItem = (item) => {
        if (balance >= item.price) {
            setBalance(prevBalance => prevBalance - item.price);
            alert(`Куплено: ${item.name} за ${item.price} руб.`);
        } else {
            alert("Недостаточно средств!");
        }
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
    };

    return (
        <div className="relative">
            <InfoBar />
            
            <div className="absolute bottom-30 grid grid-cols-2 left-10 gap-2">
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

            <div className="absolute top-20 right-20">
                <div className="relative">
                    <img
                        src="43.png"
                        width={650}
                        alt="shop window"
                    />
                    
                    {/* Контент внутри окна 43.png */}
                    <div className="absolute top-12 left-8 right-8 bottom-12">
                        {!selectedCategory ? (
                            // Показываем приветствие когда категория не выбрана
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Добро пожаловать в магазин!</h2>
                                <p className="text-white font-bold mb-4">Выберите категорию товаров слева</p>
                                
                            </div>
                        ) : (
                            // Показываем товары выбранной категории
                            <div className="h-full overflow-y-auto">
                                <div className="flex justify-center items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {categories[selectedCategory]?.title}
                                    </h2>
                                
                                </div>
                                
                                <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto">
                                    {categories[selectedCategory]?.items.map((item) => (
                                        <div 
                                            key={item.id} 
                                            className=" bg-white/40 rounded-lg p-3 shadow border-black border-2"
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
                                                    </h3>
                                                    <p className="text-xs text-gray-600 mb-2">
                                                        {item.description}
                                                    </p>
                                                    
                                                    <div className="flex items-center justify-between text-xs">
                                                        <div className="bg-yellow-100 font-bold px-2 py-1 rounded text-yellow-800">
                                                            🐟 +{item.rareChance}% шанс
                                                        </div>
                                                        <div className="font-bold text-green-600">
                                                            {item.price} руб.
                                                        </div>
                                                    </div>
                                                    
                                                    <button 
                                                        onClick={() => handleBuyItem(item)}
                                                        disabled={balance < item.price}
                                                        className={`mt-2 w-full py-1 px-2 rounded text-xs font-semibold ${
                                                            balance >= item.price 
                                                                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                        }`}
                                                    >
                                                        {balance >= item.price ? 'Купить' : 'Недостаточно средств'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}