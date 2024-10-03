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
                <button className="btn btn-success">Create Paper</button>
                <button className="btn btn-success ml-2">Create Feature</button>
                <button className="btn btn-success ml-2">Add Feature to Paper</button>
            </div>
        </>
    );
}