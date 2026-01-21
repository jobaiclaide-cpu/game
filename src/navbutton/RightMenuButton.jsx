import { useNavigate } from "react-router-dom"


export function RightMenuButton(){

    const navigate = useNavigate();


    return (
       <div className="absolute bottom-30 grid grid-cols-1 right-1 gap-2 ">
            <button 
            onClick={() => navigate('/inventory')}
            className="relative flex flex-col items-center">
            <img 
                className="object-cover"
                src="background/boll.png"
                width={90}
                height={80}
                />
            <img 
            className="absolute"
            src="иконки/3.png"
            width={70} />
            <p className="absolute bottom-[30%] text-white text-[14px] font-bold">Снаряжение</p>
            </button>

            <button 
            onClick={() => navigate ('/achievement')}
            className="relative flex flex-col items-center">
            <img 
                className="object-cover"
                src="background/boll.png"
                width={90}
                height={80}
                />
            <img 
            className="absolute"
            src="иконки/2.png"
            width={70} />
            <p className="absolute bottom-[30%] text-white text-[14px] font-bold">Достижения</p>
            </button>
            <button 
            onClick={() => navigate('/inventory')}
            className="relative flex flex-col items-center">
            <img 
                className="object-cover"
                src="background/boll.png"
                width={90}
                height={80}
                />
            <img 
            className="absolute"
            src="иконки/4.png"
            width={70} />
            <p className="absolute bottom-[30%] text-white text-[14px] font-bold">Инвентарь</p>
            </button>
            {/* <div className="relative flex flex-col items-center">
            <img 
                className="object-cover"
                src="background/boll.png"
                width={90}
                height={80}
                />
            <p className="absolute bottom-[40%] text-white text-[24px] font-bold"></p>
            </div>
            <div className="relative flex flex-col items-center">
            <img 
                className="object-cover"
                src="background/boll.png"
                width={90}
                height={80}
                />
            <p className="absolute bottom-[40%] text-white text-[24px] font-bold"></p>
            </div>
            <div className="relative flex flex-col items-center">
            <img 
                className="object-cover"
                src="background/boll.png"
                width={90}
                height={80}
                />
            <p className="absolute bottom-[40%] text-white text-[24px] font-bold"></p>
            </div>
            <div className="relative flex flex-col items-center">
            <img 
                className="object-cover"
                src="background/boll.png"
                width={90}
                height={80}
                />
            <p className="absolute bottom-[40%] text-white text-[24px] font-bold"></p>
            </div> */}
        </div>
    )
}