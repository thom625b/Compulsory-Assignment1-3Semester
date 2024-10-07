import {Api} from "../../Api.ts";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
import {ROUTES} from "../../Constants/Routes.ts";


const FeatureCreate = () => {
    const api = new Api();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();

        const newFeature = {
            name,
        };
        try {
            await api.api.featureCreateFeature(newFeature);
            setSuccessMessage("Feature created");
            setName('');
        } catch (error) {
            setErrorMessage("Feature not created");
            setSuccessMessage('');
        }
    }

    const handleGoBack = () => {
        navigate(ROUTES.ADMINPAGE);
    }




    return(
        <>
            <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Create a New Feature</h1>
                {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

                <form onSubmit={handleCreate} className="space-y-4">
                    <div className="grid grid-cols-2 items-center gap-4">
                        <label className="font-medium">Feature Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
                        Create Feature
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


export default FeatureCreate;