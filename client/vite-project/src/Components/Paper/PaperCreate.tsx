import {Api} from "../../Api.ts";
import React, {useState} from "react";
import {ROUTES} from "../../Constants/Routes.ts";
import {useNavigate} from "react-router-dom";


const PaperCreate = () => {

    const api = new Api();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0.0)
    const [stock, setStock] = useState(0);
    const [discontinued, setDiscontinued] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newPaper = {
            name,
            stock,
            price,
            discontinued,
        };
        try {
            await api.api.paperCreatePaper(newPaper);
            setSuccessMessage("Paper created successfully")
        } catch (error) {
            setErrorMessage("Failed to create paper")
            setSuccessMessage('');
        }
    };

    const handleGoBack = () => {
        navigate(ROUTES.ADMINPAGE);
    }


    return(
        <>
            <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Create a New Paper</h1>
                {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 items-center gap-4">
                        <label className="font-medium">Paper Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <label className="font-medium">Stock:</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(Number(e.target.value))}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <label className="font-medium">Price:</label>
                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <label className="font-medium">Discontinued:</label>
                        <input
                            type="checkbox"
                            checked={discontinued}
                            onChange={() => setDiscontinued(!discontinued)}
                            className="h-5 w-5"
                        />
                    </div>
                    <button
                        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
                        Create Paper
                    </button>
                </form>
                <button
                    onClick={handleGoBack}
                    className="w-full bg-gray-500 text-white py-2 px-4 rounded mt-4 hover:bg-gray-600 transition duration-200">
                    Back
                </button>
            </div>
        </>
    )
}


export default PaperCreate;