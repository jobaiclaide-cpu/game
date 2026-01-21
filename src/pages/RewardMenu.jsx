import { useState } from "react";
import { InfoBar } from "../components/InfoBar";
import { useNavigate } from "react-router-dom";

export function RewardsMenu() {
    const [claimedRewards, setClaimedRewards] = useState(new Set());
    const navigate = useNavigate();


    // Простой список наград
    const rewards = [
        { 
            id: 1, 
            name: "Бонус за регистрацию", 
            reward: "100 руб + Деревянная удочка", 
            image: "icon/6.png",
            description: "Спасибо за регистрацию в игре!",
            claimed: false,
            canClaim: true
        },
        { 
            id: 2, 
            name: "Подписка на канал", 
            reward: "200 руб + Наживка", 
            image: "icon/6.png",
            description: "Подпишитесь на наш канал и получите награду",
            claimed: false,
            canClaim: true
        },
        { 
            id: 3, 
            name: "Лайк в группе VK", 
            reward: "50 руб", 
            image: "icon/6.png",
            description: "Поставьте лайк нашей группе ВКонтакте",
            claimed: false,
            canClaim: true
        },
        { 
            id: 4, 
            name: "Приведи друга", 
            reward: "300 руб + Крючки", 
            image: "icon/6.png",
            description: "Пригласите друга в игру",
            claimed: false,
            canClaim: false,
            requirement: "Друг должен достичь 5 уровня"
        },
        { 
            id: 5, 
            name: "Ежедневный вход", 
            reward: "25 руб", 
            image: "icon/6.png",
            description: "Ежедневная награда за вход в игру",
            claimed: true,
            canClaim: false
        },
        { 
            id: 6, 
            name: "Первая покупка", 
            reward: "150 руб + Леска", 
            image: "icon/6.png",
            description: "Совершите первую покупку в магазине",
            claimed: false,
            canClaim: false,
            requirement: "Купите любой предмет в магазине"
        },
        { 
            id: 7, 
            name: "Оценка в магазине", 
            reward: "75 руб", 
            image: "icon/6.png",
            description: "Оцените игру в магазине приложений",
            claimed: false,
            canClaim: true
        },
        { 
            id: 8, 
            name: "Поделиться игрой", 
            reward: "100 руб", 
            image: "icon/6.png",
            description: "Поделитесь игрой в социальных сетях",
            claimed: false,
            canClaim: true
        }
    ];

    const handleClaimReward = (reward) => {
        if (reward.canClaim && !reward.claimed) {
            setClaimedRewards(prev => new Set([...prev, reward.id]));
            alert(`Получена награда: ${reward.reward}`);
        }
    };

    const isRewardClaimed = (reward) => {
        return claimedRewards.has(reward.id) || reward.claimed;
    };

    return (
        <div className="relative ">
            {/* Фон */}
            <InfoBar />

            {/* Кнопка "На базу" слева */}
            <div className="absolute bottom-30 left-10 z-10">
                <div 
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <img className="object-cover" src="background/boll.png" width={90} height={80} />
                    <img className="absolute top-2" src="иконки/back.png" width={50} />
                    <p className="absolute bottom-[30%] text-white text-[14px] font-bold">На базу</p>
                </div>
            </div>

            {/* Главное окно наград */}
            <div className="absolute top-20 right-20 z-10">
                <div className="relative">
                    <img src="43.png" width={650} alt="rewards window" />
                    
                    <div className="absolute top-12 left-8 right-8 bottom-12">
                        <div className="h-full overflow-y-auto">
                            <div className="flex justify-center items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">🎁 Награды</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-3 max-h-[450px] overflow-y-auto pr-2">
                                {rewards.map((reward) => {
                                    const claimed = isRewardClaimed(reward);
                                    return (
                                        <div 
                                            key={reward.id} 
                                            className={`rounded-lg p-4 shadow border-2 ${
                                                claimed 
                                                    ? 'bg-gray-200/60 border-gray-400' 
                                                    : reward.canClaim 
                                                        ? 'bg-green-100/60 border-green-500' 
                                                        : 'bg-white/40 border-orange-400'
                                            }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-16 h-16 border-2 rounded-lg flex items-center justify-center flex-shrink-0 bg-white">
                                                    <img 
                                                        src={reward.image} 
                                                        alt={reward.name}
                                                        className="w-16 h-16 object-contain"
                                                    />
                                                </div>
                                                
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <h3 className="font-bold text-gray-800 text-base">
                                                            {reward.name}
                                                            {claimed && (
                                                                <span className="ml-2 text-green-600 text-sm">✓ Получено</span>
                                                            )}
                                                        </h3>
                                                    </div>
                                                    
                                                    <p className="text-sm text-gray-600 mb-3">
                                                        {reward.description}
                                                    </p>
                                                    
                                                    <div className="bg-yellow-100 font-bold px-3 py-2 rounded-lg text-yellow-800 text-sm mb-3 inline-block">
                                                        🎁 {reward.reward}
                                                    </div>
                                                    
                                                    {reward.requirement && !reward.canClaim && (
                                                        <div className="text-sm text-orange-600 mb-3 bg-orange-50 p-2 rounded">
                                                            📋 {reward.requirement}
                                                        </div>
                                                    )}
                                                    
                                                    <button 
                                                        onClick={() => handleClaimReward(reward)}
                                                        disabled={!reward.canClaim || claimed}
                                                        className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                                                            claimed
                                                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                                                : reward.canClaim
                                                                    ? 'bg-green-500 hover:bg-green-600 text-white'
                                                                    : 'bg-orange-300 text-orange-700 cursor-not-allowed'
                                                        }`}
                                                    >
                                                        {claimed 
                                                            ? '✓ Награда получена' 
                                                            : reward.canClaim 
                                                                ? '🎁 Получить награду' 
                                                                : '⏳ Требования не выполнены'
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}