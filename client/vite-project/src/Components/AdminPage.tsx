import {ROUTES} from "../Constants/Routes.ts";
import {useNavigate} from "react-router-dom";
import FeatureTable from "./Features/FeatureTable.tsx";
import PaperTable from "./Paper/PaperTable.tsx";
import '../index.css';
import CustomerTable from "./Customer/CustomerTable.tsx";



export default function AdminPage() {

    const navigate = useNavigate();

    return (
        <>
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
                <CustomerTable/>
            </div>
            <div className="table-container">
                <div className="paper-table">
                    {/* PaperTable component goes here */}
                    <PaperTable/>
                </div>
                <div className="feature-table">
                    {/* FeatureTable component goes here */}
                    <FeatureTable/>
                </div>
            </div>


        </>
    );
}