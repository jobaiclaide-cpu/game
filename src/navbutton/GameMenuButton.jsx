import { useNavigate } from "react-router-dom"

export function GameMenuButton(){
    const navigate = useNavigate();

    return (
        <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 flex gap-2 sm:gap-4 lg:gap-8 z-50">
            <button
            onClick={() => navigate('/game')}
            className="relative flex flex-row items-center hover:scale-105 transition-transform">
            <img
                className="object-cover w-32 sm:w-40 md:w-44 lg:w-[180px]"
                src="background/but1.png"
                width={180}
                height={70}
                alt="game button"
                />
            <img
            className="object-cover absolute bottom-[35%] left-1 sm:left-2 w-12 sm:w-16 lg:w-[70px]"
            src="удочки/1.png"
            width={70}
            alt="rod icon"
            />
            <p className="absolute right-4 sm:right-8 lg:right-10 bottom-[65%] text-white text-base sm:text-xl lg:text-[24px] font-bold">Игра</p>
            </button>

            <button
            onClick={() => navigate('/tourn')}
            className="relative flex flex-col items-center hover:scale-105 transition-transform">
            <img
                className="object-cover w-32 sm:w-40 md:w-44 lg:w-[180px]"
                src="background/but1.png"
                width={180}
                height={70}
                alt="tournament button"
                />
            <img
            className="object-cover absolute bottom-[35%] left-1 sm:left-2 w-8 sm:w-10 lg:w-[40px]"
            src="иконки/7.png"
            width={40}
            alt="trophy icon"
            />
            <p className="absolute right-2 sm:right-6 lg:right-10 bottom-[65%] text-white text-base sm:text-xl lg:text-[24px] font-bold">Турниры</p>
            </button>
        </div>
    )
}
