import { useState, useEffect } from 'react';
import { playerStorage, balanceStorage } from '../utils/localStorage';

export function InfoBarCopy() {
    const [playerData, setPlayerData] = useState(playerStorage.get());
    const [balance, setBalance] = useState(balanceStorage.get());

    // Load data from localStorage on mount
    useEffect(() => {
        const loadedPlayer = playerStorage.get();
        const loadedBalance = balanceStorage.get();
        setPlayerData(loadedPlayer);
        setBalance(loadedBalance);
    }, []);

    return (
        <div className="">
        <div className="flex flex-row justify-between items-center rounded-r-2xl gap-2 px-2 sm:px-4">
            <div className="bg-blue-900/90 pl-2 gap-2 sm:w-32 md:w-36 lg:w-40 h-10 flex items-center rounded-r-2xl">
                <img
                src={playerData.avatar}
                width={25}
                height={25}
                alt="avatar"
                className="w-5 h-5 sm:w-6 sm:h-6"/>
                <p className="text-white font-bold text-xs sm:text-sm truncate">{playerData.nickname}</p>
            </div>

        <button className="flex items-center justify-between text-white font-bold pl-2 rounded-l-2xl gap-1 sm:gap-2 bg-blue-900/90 sm:w-24 md:w-28 lg:w-30 h-10">
        <img
        className="flex w-8 sm:w-10"
        src="иконки/6.png"
        width={40}
        alt="money"/>
        <p className="pr-2 sm:pr-5 text-xs sm:text-base">{balance}</p>
        </button>
        </div>
        </div>
    )
}
