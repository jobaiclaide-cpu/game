import { useNavigate } from "react-router-dom"

export function RightMenuButton(){
    const navigate = useNavigate();

    return (
       <div className="absolute bottom-20 sm:bottom-24 md:bottom-30 grid grid-cols-1 right-1 sm:right-2 gap-1 sm:gap-2 z-50">
            <button
            onClick={() => navigate('/inventory')}
            className="relative flex flex-col items-center hover:scale-105 transition-transform">
            <img
                className="object-cover w-16 sm:w-20 lg:w-[90px]"
                src="background/boll.png"
                width={90}
                height={80}
                alt="equipment button"
                />
            <img
            className="absolute w-12 sm:w-16 lg:w-[70px]"
            src="иконки/3.png"
            width={70}
            alt="equipment icon" />
            <p className="absolute bottom-[30%] text-white text-[10px] sm:text-xs lg:text-[14px] font-bold">Снаряжение</p>
            </button>

            <button
            onClick={() => navigate('/achievement')}
            className="relative flex flex-col items-center hover:scale-105 transition-transform">
            <img
                className="object-cover w-16 sm:w-20 lg:w-[90px]"
                src="background/boll.png"
                width={90}
                height={80}
                alt="achievements button"
                />
            <img
            className="absolute w-12 sm:w-16 lg:w-[70px]"
            src="иконки/2.png"
            width={70}
            alt="achievement icon" />
            <p className="absolute bottom-[30%] text-white text-[10px] sm:text-xs lg:text-[14px] font-bold">Достижения</p>
            </button>

            <button
            onClick={() => navigate('/inventory')}
            className="relative flex flex-col items-center hover:scale-105 transition-transform">
            <img
                className="object-cover w-16 sm:w-20 lg:w-[90px]"
                src="background/boll.png"
                width={90}
                height={80}
                alt="inventory button"
                />
            <img
            className="absolute w-12 sm:w-16 lg:w-[70px]"
            src="иконки/4.png"
            width={70}
            alt="inventory icon" />
            <p className="absolute bottom-[30%] text-white text-[10px] sm:text-xs lg:text-[14px] font-bold">Инвентарь</p>
            </button>
        </div>
    )
}
