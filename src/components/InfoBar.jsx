export function InfoBar() {

    return (
        <div className="relative App">
        <video autoPlay loop>
        <source src="/video/mbg.mp4" type="video/mp4" />
        </video>

        <div className="flex absolute top-0.5 left-0 pl-2 justify-start items-center rounded-r-2xl gap-2  bg-blue-900/90 w-40 h-10">
            <div className="border-2 border-white rounded-4xl p-[4px]">
                <img 
                src="vite.svg"
                width={25}
                height={25}/>
            </div>
            <div>
                <p className="text-white font-bold">Player #200</p>
            </div>
        </div>
        
        <button className="flex items-center justify-between text-white font-bold absolute top-0.5 right-0 pl-2 rounded-l-2xl gap-2  bg-blue-900/90 w-30 h-10">
        <img 
        className="flex"
        src="иконки/6.png"
        width={40}/>
        <p className="pr-5">1000</p>
        </button>
        





        </div>
    )
}