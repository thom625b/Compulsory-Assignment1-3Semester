import {ROUTES} from "../Constants/Routes.ts";
import {useNavigate} from "react-router-dom";
import CustomerList from "./Customer/CustomerList.tsx";


export default function AdminPage() {

    const navigate = useNavigate();

    return (
        <>
            <h1>Admin page</h1>
            <div className="mb-6">
                <label className="font-extrabold text-xl mb-6">Orders of customers</label>
                <CustomerList/>
            </div>
            <div className="ml-5 p-1 " >
                <button className="btn btn-success"
                        onClick={() => navigate(ROUTES.CREATEPAPER)}>
                    Create Paper
                </button>
                <button className="btn btn-error ml-2"
                onClick={ () => navigate(ROUTES.CREATEFEATURE)}>
                    Create Feature
                </button>
                <button className="btn btn-warning ml-2">Add Feature to Paper</button>
            </div>
        </>
    );
}