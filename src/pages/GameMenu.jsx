import { useNavigate } from "react-router-dom"

export function GameMenu(){
    const navigate = useNavigate();
    return (

        <div className="relative">
        <img 
        className="h-full"
        src="background/mbg.jpg" />
        

        <button 
        onClick={() => navigate('/')}
        className="absolute top-2 left-4 rounded-4xl bg-amber-50 w-12 h-12">
                    {/* Иконка стрелочки */}
        </button>

        <div className="flex flex-col gap-3 absolute rounded-sm top-20 left-2 ">
            <button className=" bg-amber-50 w-16 h-16 rounded-sm">Уд</button>
            <button className=" bg-amber-50 w-16 h-16 rounded-sm">Лес</button>
            <button className=" bg-amber-50 w-16 h-16 rounded-sm">Кат</button>
        </div>
        <div className="flex flex-col gap-3 absolute rounded-sm top-20 right-2 ">
            <button className=" bg-amber-50 w-16 h-16 rounded-sm">Прим</button>
            <button className=" bg-amber-50 w-16 h-16 rounded-sm">Крюч</button>
            <button className=" bg-amber-50 w-16 h-16 rounded-sm">Снег</button>
        </div>

        <div className="flex flex-col gap-3 absolute justify-center rounded-sm top-[3%] right-[27%] ">
            <button className=" bg-amber-50 w-80 h-10 rounded-sm">Ледяное озеро</button>

            <div className=" flex flex-col items-top pt-1 bg-amber-50 w-80 h-50 rounded-sm">
                <p>Описание озера</p>
                <br></br>
                <p>Наиболее популярные виды рыб</p>
                <oi className="flex flex-col justify-start text-left pl-6">
                    <br></br>
                    <li>
                        Окунь
                    </li>
                    <li>
                        Щука
                    </li>
                    <li>
                        Карп
                    </li>
                </oi>
            </div>
            <button className=" bg-amber-50 w-80 h-10 rounded-sm">Поехать</button>
        </div>

        
        
        



        </div>
        
        
        

      
    )
}