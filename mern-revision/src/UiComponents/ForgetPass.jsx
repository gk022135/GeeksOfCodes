import { useContext } from "react"
import { AppContext } from "../ContextApi/FisrtContext"


function ForgetPass () {
    const {PutRequets, loading} = useContext(AppContext);
    async function ChangePassword () {
        
    }
     
    return (
        <>
          <button onClick={ChangePassword}>Forget password</button>
        </>
    )
}