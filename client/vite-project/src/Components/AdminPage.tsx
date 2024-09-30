import {ROUTES} from "../Constants/Routes.ts";
import {useNavigate} from "react-router-dom";


export default function AdminPage() {

    const navigate = useNavigate();

    return (
        <>
            <h1>Admin page</h1>
            <button className="btn btn-secondary" onClick={() => navigate(ROUTES.CUSTOMERORDERS)}> Customer orders</button>

        </>
    );
}