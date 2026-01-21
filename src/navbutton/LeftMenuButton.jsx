import { useNavigate } from "react-router-dom"


export function LeftMenuButton(){

    const navigate = useNavigate();


    return (
        <div className="absolute top-30 left-3 flex flex-col gap-2">
            <button 
            onClick={() => navigate('/shop')}
            className="relative flex flex-col items-center">
            
            <img 
                className="object-cover"
                src="background/box.png"
                width={80}
                height={80}
                />
            <img 
            className="absolute top-3"
            src="иконки/9.png"
            width={40} />
            <p className="absolute bottom-5 text-black text-[16px] font-bold">Магазин</p>
            </button>
            <button
            onClick={() => navigate('/sellmenu')}
            className="relative flex flex-col items-center">
            <img 
                className="object-cover"
                src="background/box.png"
                width={80}
                height={80}
                />
                <img 
            className="absolute top-3"
            src="иконки/8.png"
            width={40} />
            <p className="absolute bottom-5 text-black text-[16px] font-bold">Скупка</p>
            </button>
            <button 
            onClick={() => navigate('/quickquest')}
            className="relative flex flex-col items-center">
            <img 
                className="object-cover"
                src="background/box.png"
                width={80}
                height={80}
                />
                <img 
            className="absolute top-5"
            src="иконки/11.png"
            width={40} />
            <p className="absolute bottom-5 text-black text-[16px] font-bold">Квесты</p>
            </button>
            <button 
            onClick={() => navigate('/reward')}
            className="relative flex flex-col items-center">
            <img 
                className="object-cover"
                src="background/box.png"
                width={80}
                height={80}
                />
                <img 
            className="absolute top-3"
            src="иконки/10.png"
            width={40} />
            <p className="absolute bottom-5 text-black text-[16px] font-bold">Награды</p>
            </button>
        </div>
    )
}