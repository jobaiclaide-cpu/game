import { useNavigate } from "react-router-dom"


export function GameMenuButton(){

    const navigate = useNavigate();


    return (
        <div className="absolute bottom-1 right-1 flex gap-8">
            <button 
            onClick={() => navigate('/game')}
            className="relative flex flex-row items-center">
            <img 
                className="object-cover"
                src="background/but1.png"
                width={180}
                height={70}
                />
            <img 
            className="object-cover absolute bottom-[35%] left-2"
            src="удочки/1.png" 
            width={70}
            />
            <p className="absolute right-10 bottom-[65%] text-white text-[24px] font-bold">Игра</p>
            
            </button>
            <button 
            onClick={() => navigate('/tourn')}
            className="relative flex flex-col items-center">
            <img 
                className="object-cover"
                src="background/but1.png"
                width={180}
                height={70}
                />
            <img 
            className="object-cover absolute bottom-[35%] left-2"
            src="иконки/7.png" 
            width={40}
            />
            <p className="absolute right-10 bottom-[65%] text-white text-[24px] font-bold">Турниры</p>
            </button>
        </div>
    )
}