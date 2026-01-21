import { useNavigate } from "react-router-dom"

export function QuestSeason(){
    const navigate = useNavigate();
    return (

        <div className="relative">
        <img 
        className="h-full"
        src="background/mbg.jpg" />
        
        <button 
        onClick={() => navigate('/')}
        className="absolute bottom-2 left-4 rounded-4xl bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC]  w-12 h-12">
                    {/* Иконка стрелочки */}
        </button>
        <button className="absolute rounded-sm top-1 right-1 bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC]  w-40 h-11">1000 P</button>
        <button 
        onClick={() => navigate('/userset')}
        className="flex rounded-sm justify-start items-center absolute top-1 left-1 gap-2 bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC]  w-50 h-11">
            <img
                className="pl-2"
                src="vite.svg" 
                width={40}
                height={40}
                
                />
                <p className="">Player #200</p>
        </button>
        <div className="absolute flex flex-col gap-2 rounded-sm top-16 left-6">
            <button 
            onClick={() => navigate('/quickquest')}
            className=" bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC]  w-40 h-11">Ежедневные</button>
            <button 
            onClick={() => navigate('/questned')}
            className=" bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC]  w-40 h-11">Еженедельные</button>
            <button className=" bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC]  w-40 h-11 border-2">Сезонные</button>
        </div>

        <div className="absolute rounded-sm top-16 left-60 bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC]  w-100 h-63 items-top p-2 overflow-auto">
            <div className="flex justify-between items-center font-semibold border-b-1 p-1">
                <div className="w-60 min-w-0 text-left">
                <p className="truncate">Выловить рыбу </p>
                </div>
                <div className="w-20 text-center"> 
                <p>10/900</p>
                </div>
                <div className="w-20 text-right">
                <p className="border-1 p-1 rounded-sm ">Забрать</p>
                </div>
            </div>
            <div className="flex justify-between items-center font-semibold border-b-1 p-1">
                <div className="w-60 min-w-0 text-left">
                <p className="truncate">Ремонт снастей </p>
                </div>
                <div className="w-20 text-center"> 
                <p>1/300</p>
                </div>
                <div className="w-20 text-right">
                <p className="border-1 p-1 rounded-sm ">Забрать</p>
                </div>
            </div>
            <div className="flex justify-between items-center font-semibold border-b-1 p-1">
                <div className="w-60 min-w-0 text-left">
                <p className="truncate">Учавствовать в турнире </p>
                </div>
                <div className="w-20 text-center"> 
                <p>1/150</p>
                </div>
                <div className="w-20 text-right">
                <p className="border-1 p-1 rounded-sm ">Забрать</p>
                </div>
            </div>
            <div className="flex justify-between items-center font-semibold border-b-1 p-1">
                <div className="w-60 min-w-0 text-left">
                <p className="truncate">Наполнить садок </p>
                </div>
                <div className="w-20 text-center"> 
                <p>11/900</p>
                </div>
                <div className="w-20 text-right">
                <p className="border-1 p-1 rounded-sm ">Забрать</p>
                </div>
            </div>
            <div className="flex justify-between items-center font-semibold border-b-1 p-1">
                <div className="w-60 min-w-0 text-left">
                <p className="truncate">Поделиться уловом</p>
                </div>
                <div className="w-20 text-center"> 
                <p>1/150</p>
                </div>
                <div className="w-20 text-right">
                <p className="border-1 p-1 rounded-sm ">Забрать</p>
                </div>
            </div>
            <div className="flex justify-between items-center font-semibold border-b-1 p-1">
                <div className="w-60 min-w-0 text-left">
                <p className="truncate">Совершить покупку </p>
                </div>
                <div className="w-20 text-center"> 
                <p>1/50</p>
                </div>
                <div className="w-20 text-right">
                <p className="border-1 p-1 rounded-sm ">Забрать</p>
                </div>
            </div>
            <div className="flex justify-between items-center font-semibold border-b-1 p-1">
                <div className="w-60 min-w-0 text-left">
                <p className="truncate">Совершить покупку </p>
                </div>
                <div className="w-20 text-center"> 
                <p>1/450</p>
                </div>
                <div className="w-20 text-right">
                <p className="border-1 p-1 rounded-sm ">Забрать</p>
                </div>
            </div>
            
        </div>

        </div>
        
        
        

      
    )
}