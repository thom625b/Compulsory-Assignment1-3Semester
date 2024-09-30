import {useNavigate} from "react-router-dom";
import {ROUTES} from "../Constants/Routes.ts"

export default function Home(){

    const navigate = useNavigate();


    return(
        <>
            <button className="btn btn-primary " onClick={() => navigate(ROUTES.CUSTOMERS)} > Customers </button>
            <button className="btn btn-secondary"onClick={() => navigate(ROUTES.PAPER)} > Paper </button>
            <button className="btn btn-secondary"onClick={() => navigate(ROUTES.ADMINPAGE)} > Admin Page </button>
            <button className="btn btn-secondary" onClick={() => navigate(ROUTES.CUSTOMERORDERS)} > Customer orders</button>
        </>
    )
}