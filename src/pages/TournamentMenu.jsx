import { useState } from "react";
import { InfoBar } from "../components/InfoBar";
import { useNavigate } from "react-router-dom";

export function TournamentMenu() {
    const navigate = useNavigate();

    // Данные турниров
    const tournaments = [
        {
            id: 1,
            name: "Турнир на скорость",
            description: "Поймайте как можно больше рыбы за 30 минут",
            type: "speed",
            icon: "⚡",
            timeLeft: "2 дня 14 часов",
            entryFee: "50 руб",
            status: "active",
            prizes: [
                { place: "1 место", reward: "1000 руб + Золотая удочка" },
                { place: "2 место", reward: "500 руб + Серебряная удочка" },
                { place: "3 место", reward: "250 руб + Бронзовая удочка" },
                { place: "4-10 место", reward: "100 руб + Наживка" }
            ],
            participants: 156,
            maxParticipants: 200
        },
        {
            id: 2,
            name: "Турнир на вес",
            description: "Поймайте самую тяжелую рыбу",
            type: "weight",
            icon: "⚖️",
            timeLeft: "5 дней 8 часов",
            entryFee: "100 руб",
            status: "active",
            prizes: [
                { place: "1 место", reward: "2000 руб + Профессиональная удочка" },
                { place: "2 место", reward: "1000 руб + Углепластиковая удочка" },
                { place: "3 место", reward: "500 руб + Крючки тройные" },
                { place: "4-10 место", reward: "200 руб + Леска Premium" }
            ],
            participants: 89,
            maxParticipants: 150
        },
        {
            id: 3,
            name: "Турнир на количество",
            description: "Поймайте максимальное количество рыбы за день",
            type: "quantity",
            icon: "🐟",
            timeLeft: "1 день 3 часа",
            entryFee: "30 руб",
            status: "ending_soon",
            prizes: [
                { place: "1 место", reward: "800 руб + Снегоход" },
                { place: "2 место", reward: "400 руб + Наживка х50" },
                { place: "3 место", reward: "200 руб + Крючки х20" },
                { place: "4-15 место", reward: "50 руб + Опыт х2" }
            ],
            participants: 234,
            maxParticipants: 300
        }
    ];

    const handleJoinTournament = (tournament) => {
        if (tournament.status === 'active' || tournament.status === 'ending_soon') {
            alert(`Вы записались на "${tournament.name}"! Взнос: ${tournament.entryFee}`);
        } else {
            alert("Турнир недоступен для участия");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100/60 border-green-500';
            case 'ending_soon': return 'bg-orange-100/60 border-orange-500';
            case 'ended': return 'bg-gray-100/60 border-gray-400';
            default: return 'bg-white/40 border-blue-400';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'active': return '🟢 Активен';
            case 'ending_soon': return '🟡 Скоро закончится';
            case 'ended': return '🔴 Завершен';
            default: return '🔵 Ожидает';
        }
    };

    return (
        <div className="relative">
            {/* Фон */}
            <InfoBar />

            {/* Кнопки снаряжение и на базу слева */}
            <div className="absolute bottom-30 left-10 z-10 flex flex-col gap-2">
                <div 
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => navigate('/shop')}
                >
                    <img className="object-cover" src="background/boll.png" width={90} height={80} />
                    <div className="absolute top-3 text-2xl">🎣</div>
                    <p className="absolute bottom-[30%] text-white text-[14px] font-bold text-center">Снаряжение</p>
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

            {/* Главное окно турниров */}
            <div className="absolute top-20 right-20 z-10">
                <div className="relative">
                    <img src="43.png" width={650} alt="tournaments window" />
                    
                    <div className="absolute top-12 left-8 right-8 bottom-12">
                        <div className="h-full overflow-y-auto">
                            <div className="flex justify-center items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">🏆 Турниры</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 max-h-[450px] overflow-y-auto pr-2">
                                {tournaments.map((tournament) => (
                                    <div 
                                        key={tournament.id} 
                                        className={`rounded-lg p-4 shadow border-2 ${getStatusColor(tournament.status)}`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-20 h-20 border-2 rounded-lg flex items-center justify-center flex-shrink-0 bg-white text-3xl">
                                                {tournament.icon}
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-bold text-gray-800 text-lg mb-1">
                                                            {tournament.name}
                                                        </h3>
                                                        <span className={`text-xs px-2 py-1 rounded ${
                                                            tournament.status === 'active' ? 'bg-green-200 text-green-800' :
                                                            tournament.status === 'ending_soon' ? 'bg-orange-200 text-orange-800' :
                                                            'bg-gray-200 text-gray-800'
                                                        }`}>
                                                            {getStatusText(tournament.status)}
                                                        </span>
                                                    </div>
                                                    <div className="text-right text-sm">
                                                        <div className="font-bold text-blue-600">⏰ {tournament.timeLeft}</div>
                                                        <div className="text-gray-600">💰 {tournament.entryFee}</div>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-sm text-gray-600 mb-3">
                                                    {tournament.description}
                                                </p>
                                                
                                                {/* Участники */}
                                                <div className="mb-3">
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>Участников:</span>
                                                        <span className="font-bold">{tournament.participants}/{tournament.maxParticipants}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className="h-2 rounded-full bg-blue-500"
                                                            style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                
                                                {/* Призы */}
                                                <div className="bg-yellow-50 rounded-lg p-3 mb-3 border border-yellow-200">
                                                    <h4 className="font-bold text-yellow-800 text-sm mb-2">🏆 Призы:</h4>
                                                    <div className="space-y-1">
                                                        {tournament.prizes.map((prize, index) => (
                                                            <div key={index} className="text-xs text-yellow-700 flex justify-between">
                                                                <span className="font-semibold">{prize.place}:</span>
                                                                <span>{prize.reward}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                                <button 
                                                    onClick={() => handleJoinTournament(tournament)}
                                                    disabled={tournament.status === 'ended'}
                                                    className={`w-full py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
                                                        tournament.status === 'ended'
                                                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                                            : tournament.status === 'ending_soon'
                                                                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                                                    }`}
                                                >
                                                    {tournament.status === 'ended' 
                                                        ? '🏁 Турнир завершен' 
                                                        : tournament.status === 'ending_soon'
                                                            ? '🚀 Успеть участвовать!'
                                                            : '🎯 Поехать на турнир'
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
