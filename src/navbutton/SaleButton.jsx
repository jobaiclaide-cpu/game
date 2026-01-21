import { useNavigate } from "react-router-dom"

export function SaleButton(){

    const navigate = useNavigate();


    return (
       

        <div className="absolute flex gap-2 top-1 left-60">
            <div className="relative flex flex-col items-center">

                <img 
                src="background/action.png" 
                width={100}
                height={100}/>
          
         
                <img 
            className="absolute top-1"
            src="иконки/5.png"
            width={80} />
                <p className="font-bold absolute bottom-6 text-white">Sale</p>
            </div>
             <div className="relative flex flex-col items-center">

                <img 
                src="background/action.png" 
                width={100}
                height={100}/>
          
         
                <img 
            className="absolute top-1"
            src="иконки/5.png"
            width={80} />
                <p className="font-bold absolute bottom-6 text-white">Sale</p>
            </div>
             <div className="relative flex flex-col items-center">

                <img 
                src="background/action.png" 
                width={100}
                height={100}/>
          
         
                <img 
            className="absolute top-1"
            src="иконки/5.png"
            width={80} />
                <p className="font-bold absolute bottom-6 text-white">Sale</p>
            </div>
            
        </div>
        
   
        

      
    )
}