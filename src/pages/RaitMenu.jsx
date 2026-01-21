import { useNavigate } from "react-router-dom"

export function RaitMenu(){
    const navigate = useNavigate();
    return (

        <div className="relative">
        <img 
        className="h-full"
        src="background/mbg.jpg" />
        

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

        <button 
        onClick={() => navigate('/')}
        className="absolute bottom-2 left-4 rounded-4xl bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC]  w-12 h-12">
                    {/* Иконка стрелочки */}
        </button>

        <div className="flex flex-col gap-3 absolute rounded-sm top-16 left-6 ">
            <button className=" bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC]  w-40 h-11 rounded-sm">Лидеры</button>
            {/* <button className=" bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC]  w-40 h-11 rounded-sm">Призеры</button>
            <button className=" bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC]  w-40 h-11 rounded-sm">VIP</button> */}
        </div>
        <div className="flex flex-col gap-3 absolute rounded-sm top-16 left-60">
            <div className="flex flex-col gap-2 bg-gradient-to-r from-[#D0D5DB] to-[#FCFCFC]  ronded-sm w-60 h-63 rounded-xl border-2 border-black p-3">
                <div className="flex rounded-sm pl-1 border-2 border-black">
                    <p className="font-bold ">1. Охотник на омаров</p>
                </div>
                <div className="flex rounded-sm pl-1 border-2 border-black">
                    <p className="font-bold ">2. Player</p>
                </div>
                <div className="flex rounded-sm pl-1 border-2 border-black">
                    <p className="font-bold ">3. HotFish</p>
                </div>
            </div>
        </div>
        
        
        



        </div>
        
        
        

      
    )
}