import {  useState } from "react"
import Login from "../components/login"
import Signup from "../components/Signup"


 function Authpage(){

     const [shift , setShift] = useState(false)



  

    return(
        <div className="relative  min-w-sm max-w-lg overflow-hidden rounded-2xl ">
            <div className={` flex w-full   ${shift ? '-translate-x-full' : ''} transition-transform duration-500 bg-white`} >
                
          <Login close={shift} setClose={setShift}/>
          <Signup setClose={setShift}/>
            </div>

        
        </div>
    )
}

export default Authpage