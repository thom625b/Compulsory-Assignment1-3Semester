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
                <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="84 84 mb-6 object-contain"
                />
                <h2 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-black flex justify-center items-center space-x-2 text-center">
                    <img src="pictures/logoMenu.png" alt="icon" className="w-6 h-6"/>
                    <span>Menu</span>
                </h2>
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
                <footer className="footer bg-grey-200 p-10 mt-auto">
                    <aside>
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            className="fill-current">
                            <path
                                d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                        </svg>
                        <p>
                            Dunder Miffin Inc.
                            <br/>
                            Providing premium paper since 1949
                        </p>
                    </aside>
                    <nav>
                        <h6 className="footer-title">Social</h6>
                        <div className="grid grid-flow-col gap-4">
                            <a href="https://www.youtube.com/watch?v=bV8i6oCgiAM" target="_blank"
                               rel="noopener noreferrer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="fill-current">
                                    <path
                                        d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/dundermifflinpaper" target="_blank"
                               rel="noopener noreferrer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="fill-current">
                                    <path
                                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                                </svg>
                            </a>
                        </div>
                    </nav>
                </footer>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <div className="bg-gray-100 p-4 flex justify-end items-center relative h-2">

                <div className="absolute right-4">
                        <button className="btn bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
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
                        <div className="flex justify-end space-x-2 w-full">
                            <button
                                className="btn btn-outline hover:bg-gray-400 rounded flex-1"
                                onClick={() => setShowPasswordPrompt(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-outline hover:bg-blue-400 rounded flex-1"
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

