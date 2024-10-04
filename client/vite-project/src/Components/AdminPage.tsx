import {ROUTES} from "../Constants/Routes.ts";
import {useNavigate} from "react-router-dom";
import CustomerList from "./Customer/CustomerList.tsx";
import FeatureTable from "./Features/FeatureTable.tsx";
import PaperTable from "./Paper/PaperTable.tsx";



export default function AdminPage() {

    const navigate = useNavigate();

    return (
        <>
            <h1>Admin page</h1>
            <div className="ml-5 p-1 ">
                <button className="btn btn-primary"
                        onClick={() => navigate(ROUTES.CREATEPAPER)}>
                    Create Paper
                </button>
                <button className="btn btn-primary ml-2"
                        onClick={() => navigate(ROUTES.CREATEFEATURE)}>
                    Create Feature
                </button>
                <button className="btn btn-primary ml-2"
                onClick={() => navigate(ROUTES.ADDFEATURETOPAPER)}>
                    Add Feature to Paper
                </button>
            </div>
            <div className="mb-6">
                <label className="font-extrabold text-xl mb-6">Orders of customers</label>
                <CustomerList/>
            </div>
            <div className="mb-6">
                <label className="font-extrabold text-xl mb-6">Papers</label>
                <PaperTable/>
            </div>
            <div className="mb-6">
                <label className="font-extrabold text-xl mb-6">Features</label>
                <FeatureTable/>
            </div>

        </>
    );
}