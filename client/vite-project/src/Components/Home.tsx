import {Outlet, useLocation, useNavigate} from "react-router-dom";
import { ROUTES } from "../Constants/Routes.ts";
import { useAtom } from "jotai";
import { basketAtom } from "../Atoms/BasketAtom.tsx";
import {useState} from "react";


export default function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const companyLogo = "/pictures/dunder_miffin.jpg";
    const [basket] = useAtom(basketAtom);
    const basketItems = basket.reduce((total, item) => total + item.quantity, 0)
    const isActive = (path: string) => location.pathname === path;
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");

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
            <div className=" w-1/5 bg-gray-200 p-4 flex flex-col items-left">
                {/* Company Logo */}
                <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="84 84 mb-6 object-contain"
                />
                <h2 className="text-lg font-semibold mb-4 underline">Menu</h2>
                <ul className="space-y-2 w-full">
                    <li>
                        <button
                            className={`block w-full text-left py-2 hover:bg-gray-300 flex items-center space-x-2 ${isActive(ROUTES.ADMINPAGE) ? "bg-gray-300 font-bold" : ""
                            }`}
                            onClick={handleLogin}>
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img src="https://icon-library.com/images/admin-icon/admin-icon-10.jpg"/>
                                </div>
                            </div>
                            <span>Admin</span>
                        </button>
                    </li>
                    <li>
                        <button
                            className={`block w-full text-left py-2 hover:bg-gray-300 flex items-center space-x-2 ${isActive(ROUTES.HOME) ? "bg-gray-300 font-bold" : ""
                            }`}
                            onClick={() => navigate(ROUTES.HOME)}>
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img
                                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F425%2F085%2Foriginal%2Fhouse-icon-vector-illustration.jpg&f=1&nofb=1&ipt=d3d539e767de0d11a6182e3f0c26dee678380f4f73ff332c0245dad74c9392d1&ipo=images"/>
                                </div>
                            </div>
                            <span>Home</span>
                        </button>
                    </li>
                    <li>
                        <button
                            className={`block w-full text-left py-2 hover:bg-gray-300 flex items-center space-x-2 ${isActive(ROUTES.CUSTOMERORDERS) ? "bg-gray-300 font-bold" : ""
                            }`}
                            onClick={() => navigate(ROUTES.CUSTOMERORDERS)}>
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img
                                        src="https://t4.ftcdn.net/jpg/05/21/94/81/360_F_521948178_WUlWgu8X5k2TyHH5bDJDY1tRfJEvz4CN.jpg"/>
                                </div>
                            </div>
                            <span>Customers</span>
                        </button>
                    </li>
                    <li>
                        <button
                            className={`block w-full text-left py-2 hover:bg-gray-300 flex items-center space-x-2 ${isActive(ROUTES.CONTACT) ? "bg-gray-300 font-bold" : ""
                            }`}
                            onClick={() => navigate(ROUTES.CONTACT)}>
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img
                                        src="https://www.clipartmax.com/png/middle/92-926082_contact-us-contact-us-icon-png.png"/>
                                </div>
                            </div>
                            <span>Contact</span>
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <div className="bg-gray-100 p-4 flex justify-end items-center relative h-2">

                    <div className="absolute right-4">
                        <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
                                onClick={() => navigate(ROUTES.CREATEORDER)}>
                            Basket ({basketItems})
                        </button>
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

