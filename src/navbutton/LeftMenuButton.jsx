import { useNavigate } from "react-router-dom"

export function LeftMenuButton(){
    const navigate = useNavigate();

    return (
        <div className="absolute top-16 sm:top-20 md:top-30 left-2 sm:left-3 flex flex-col gap-1 sm:gap-2 z-50">
            <button
            onClick={() => navigate('/shop')}
            className="relative flex flex-col items-center hover:scale-105 transition-transform">
            <img
                className="object-cover w-14 sm:w-16 lg:w-[80px]"
                src="background/box.png"
                width={80}
                height={80}
                alt="shop button"
                />
            <img
            className="absolute top-2 sm:top-3 w-8 sm:w-10 lg:w-[40px]"
            src="иконки/9.png"
            width={40}
            alt="shop icon" />
            <p className="absolute bottom-3 sm:bottom-5 text-black text-xs sm:text-sm lg:text-[16px] font-bold">Магазин</p>
            </button>

            <button
            onClick={() => navigate('/sellmenu')}
            className="relative flex flex-col items-center hover:scale-105 transition-transform">
            <img
                className="object-cover w-14 sm:w-16 lg:w-[80px]"
                src="background/box.png"
                width={80}
                height={80}
                alt="sell button"
                />
            <img
            className="absolute top-2 sm:top-3 w-8 sm:w-10 lg:w-[40px]"
            src="иконки/8.png"
            width={40}
            alt="sell icon" />
            <p className="absolute bottom-3 sm:bottom-5 text-black text-xs sm:text-sm lg:text-[16px] font-bold">Скупка</p>
            </button>

            <button
            onClick={() => navigate('/quickquest')}
            className="relative flex flex-col items-center hover:scale-105 transition-transform">
            <img
                className="object-cover w-14 sm:w-16 lg:w-[80px]"
                src="background/box.png"
                width={80}
                height={80}
                alt="quests button"
                />
            <img
            className="absolute top-3 sm:top-5 w-8 sm:w-10 lg:w-[40px]"
            src="иконки/11.png"
            width={40}
            alt="quest icon" />
            <p className="absolute bottom-3 sm:bottom-5 text-black text-xs sm:text-sm lg:text-[16px] font-bold">Квесты</p>
            </button>

            <button
            onClick={() => navigate('/reward')}
            className="relative flex flex-col items-center hover:scale-105 transition-transform">
            <img
                className="object-cover w-14 sm:w-16 lg:w-[80px]"
                src="background/box.png"
                width={80}
                height={80}
                alt="rewards button"
                />
            <img
            className="absolute top-2 sm:top-3 w-8 sm:w-10 lg:w-[40px]"
            src="иконки/10.png"
            width={40}
            alt="reward icon" />
            <p className="absolute bottom-3 sm:bottom-5 text-black text-xs sm:text-sm lg:text-[16px] font-bold">Награды</p>
            </button>
        </div>
    )
}
