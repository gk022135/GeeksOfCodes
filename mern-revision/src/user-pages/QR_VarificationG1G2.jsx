import { useContext } from "react"
import { AppContext } from "../ContextApi/FisrtContext"


function QrvarificationG1g2({ Qrvalue }) {

    const { AllGetReq } = useContext(AppContext);

    // console.log("props value lya hai ji",Qrvalue)


    const varifcation = async (Qrvalue) => {
       const userDetails = localStorage.getItem("UserData");
       const email = userDetails ? JSON.parse(userDetails).email : "null"

       try {
            const varificationRes = await AllGetReq("varification-g1-g2-qr", { email: email, qrvalue: Qrvalue });

            console.log("qr varif details ", varificationRes)

        }
        catch(error){
             console.log("error in varif qr ", error)
        }
    }
    varifcation(Qrvalue);

    return (
        <div>

        </div>
    )
}

export default QrvarificationG1g2;