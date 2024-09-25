import {useNavigate} from "react-router-dom";
import {ROUTES} from "../Constants/Routes.ts"

export default function Home(){

    const navigate = useNavigate();


    return(
        <>
            <button onClick={() => navigate(ROUTES.CUSTOMERS)} > Customers </button>
            <button onClick={() => navigate(ROUTES.PAPER)} > Paper </button>
        </>
    )
}