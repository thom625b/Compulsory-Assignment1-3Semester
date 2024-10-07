import {Outlet, useLocation, useNavigate} from "react-router-dom";
import { ROUTES } from "../Constants/Routes.ts";
import { useAtom } from "jotai";
import { basketAtom } from "../Atoms/BasketAtom.tsx";
import {useState} from "react";
import SearchBar from "./SearchBar.tsx";


export default function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const companyLogo = "/pictures/dunder_miffin.jpg";
    const [basket] = useAtom(basketAtom);
    const basketItems = basket.reduce((total, item) => total + item.quantity, 0)
    const isActive = (path: string) => location.pathname === path;
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");


    const handleSearch = (searchParam) => {
        console.log("Searched for: ", searchParam)
    };

    const searchOptions = isActive(ROUTES.CUSTOMERORDERS)
        ? [{ value: 'email', label: 'Email' }, { value: 'name', label: 'Name' }]
        : [{ value: 'all', label: 'All Categories' }, { value: 'paper', label: 'Paper' }, { value: 'features', label: 'Features' }];

    const searchDisabled = isActive(ROUTES.CONTACT);


    const handleLogin = () => {
        setShowPasswordPrompt(true);
    };

    const handlePasswordSubmit = () => {
        if (passwordInput === "dunder") {
            setShowPasswordPrompt(false);
            navigate(ROUTES.ADMINPAGE);
        } else {
            alert("Incorrect password. Access denied.");
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className=" w-1/5 bg-gray-200 p-4 flex flex-col items-center">
                {/* Company Logo */}
                <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="84 84 mb-6 object-contain"
                />
                <h2 className="text-lg font-semibold mb-4">Menu</h2>
                <ul className="space-y-2 w-full">
                    <li>
                        <button
                            className={`block w-full text-left py-2 hover:bg-gray-300 ${isActive(ROUTES.ADMINPAGE) ? "bg-gray-300 font-bold" : ""
                            }`}
                            onClick={handleLogin}>
                            Admin
                        </button>
                    </li>
                    <li>
                        <button
                            className={`block w-full text-left py-2 hover:bg-gray-300 ${isActive(ROUTES.HOME) ? "bg-gray-300 font-bold" : ""
                            }`}
                            onClick={() => navigate(ROUTES.HOME)}>
                            Home
                        </button>
                    </li>
                    <li>
                        <button
                            className={`block w-full text-left py-2 hover:bg-gray-300 ${isActive(ROUTES.CUSTOMERORDERS) ? "bg-gray-300 font-bold" : ""
                            }`}
                            onClick={() => navigate(ROUTES.CUSTOMERORDERS)}>
                            Orders
                        </button>
                    </li>
                    <li>
                        <button
                            className={`block w-full text-left py-2 hover:bg-gray-300 ${isActive(ROUTES.CONTACT) ? "bg-gray-300 font-bold" : ""
                            }`}
                            onClick={() => navigate(ROUTES.CONTACT)}>
                            Contact
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <div className="bg-gray-100 p-4 flex justify-end items-center relative">

                    <div className="absolute right-4">
                        <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
                                onClick={() => navigate(ROUTES.CREATEORDER)}>
                            Cart ({basketItems})
                        </button>
                    </div>
                    <div className="flex-grow flex justify-center">
                        <SearchBar onSearch={handleSearch} searchOptions={searchOptions} disabled={searchDisabled}/>
                    </div>

                </div>


                {/* Paper List */}
                <div className="p-4 bg-gray-50 flex-grow">
                    <Outlet/>
                </div>
            </div>

            {/* Password Prompt Modal */}
            {showPasswordPrompt && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Enter Admin Password</h2>
                        <input
                            type="password"
                            className="border border-gray-300 p-2 mb-4 w-full"
                            placeholder="Password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => setShowPasswordPrompt(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handlePasswordSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

