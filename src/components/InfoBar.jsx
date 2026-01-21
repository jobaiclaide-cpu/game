import { useState, useEffect } from 'react';
import { playerStorage, balanceStorage } from '../utils/localStorage';

export function InfoBar() {
    const [playerData, setPlayerData] = useState(playerStorage.get());
    const [balance, setBalance] = useState(balanceStorage.get());

    // Load data from localStorage on mount
    useEffect(() => {
        const loadedPlayer = playerStorage.get();
        const loadedBalance = balanceStorage.get();
        setPlayerData(loadedPlayer);
        setBalance(loadedBalance);
    }, []);

    // Update localStorage when balance changes
    useEffect(() => {
        balanceStorage.set(balance);
    }, [balance]);

    return (
        <div className="relative App">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
        <source src="/video/mbg.mp4" type="video/mp4" />
        </video>

        {/* Player info - responsive sizing */}
        <div className="flex absolute top-0.5 left-0 pl-2 justify-start items-center rounded-r-2xl gap-2 bg-blue-900/90 sm:w-32 md:w-36 lg:w-40 h-10 z-50">
            <div className="border-2 border-white rounded-full p-[4px]">
                <img
                src={playerData.avatar}
                width={25}
                height={25}
                alt="avatar"
                className="w-5 h-5 sm:w-6 sm:h-6"/>
            </div>
            <div className="overflow-hidden">
                <p className="text-white font-bold text-xs sm:text-sm truncate">{playerData.nickname}</p>
            </div>
        </div>

        {/* Balance - responsive sizing */}
        <button className="flex items-center justify-between text-white font-bold absolute top-0.5 right-0 pl-2 rounded-l-2xl gap-1 sm:gap-2 bg-blue-900/90 sm:w-24 md:w-28 lg:w-30 h-10 z-50">
        <img
        className="flex w-8 sm:w-10"
        src="иконки/6.png"
        width={40}
        alt="money"/>
        <p className="pr-2 sm:pr-5 text-xs sm:text-base">{balance}</p>
        </button>
        </div>
    )
}
