export function InfoBarCopy() {

    return (
        <div className="">
        

        <div className="flex flex-row justify-between items-center rounded-r-2xl gap-2 ">
            <div className="bg-blue-900/90 pl-2 gap-2 w-40 h-10 flex items-center  ">
                <img 
                src="vite.svg"
                width={25}
                height={25}/>
              
                <p className="text-white font-bold">Player #200</p>
          
            </div>
           
        <button className="flex items-center justify-between text-white font-bold pl-2 rounded-l-2xl gap-2  bg-blue-900/90 w-30 h-10">
        <img 
        className="flex"
        src="иконки/6.png"
        width={40}/>
        <p className="pr-5">1000</p>
        </button>
        </div>
        
        
        





        </div>
    )
}