import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Constants/Routes.ts";
import PaperList from "./Paper/PaperList.tsx";

export default function Home() {
    const navigate = useNavigate();
    const basketItems = 2;
    const companyLogo = "/pictures/dunder_miffin.jpg";

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/5 bg-gray-200 p-4 flex flex-col items-center">
                {/* Company Logo */}
                <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="84 84 mb-6 object-contain"
                />
                <h2 className="text-lg font-semibold mb-4">Menu</h2>
                <ul className="space-y-2 w-full">
                    <li>
                        <button className="block w-full text-left py-2 hover:bg-gray-300"
                                onClick={() => navigate(ROUTES.ADMINPAGE)}>
                            Admin
                        </button>
                    </li>
                    <li>
                        <button className="block w-full text-left py-2 hover:bg-gray-300"
                                onClick={() => navigate(ROUTES.HOME)}>
                            Home
                        </button>
                    </li>
                    <li>
                        <button className="block w-full text-left py-2 hover:bg-gray-300"
                                onClick={() => navigate(ROUTES.PAPER)}>
                            Paper
                        </button>
                    </li>
                    <li>
                        <button className="block w-full text-left py-2 hover:bg-gray-300"
                                onClick={() => navigate(ROUTES.CUSTOMERS)}>
                            Customers
                        </button>
                    </li>
                    <li>
                        <button className="block w-full text-left py-2 hover:bg-gray-300" onClick={() => navigate(ROUTES.CUSTOMERORDERS)}>
                            Customer orders
                        </button>
                    </li>
                    <li>
                        <button className="block w-full text-left py-2 hover:bg-gray-300"
                                onClick={() => navigate(ROUTES.CONTACT)}>
                            Contact
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <div className="bg-gray-100 p-4 flex justify-end items-center">
                <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500">
                        Basket ({basketItems})
                    </button>
                </div>


                {/* Paper List */}
                <div className="p-4 bg-gray-50 flex-grow">
                    <PaperList />
                </div>
            </div>
        </div>
    );
}

