import {Api, Feature, FeaturesToPaperDto, Paper} from "../../Api.ts";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import {ROUTES} from "../../Constants/Routes.ts";
import {toast, ToastContainer} from "react-toastify";


const AddFeature =() => {
    const api = new Api;
    const navigate = useNavigate();
    const [papers, setPapers] = useState<Paper[]>([]);
    const [features, setFeatures] = useState<Feature[]>([]);
    const [selectedPaper, setSelectedPaper] = useState<number | null>(null);
    const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
    const [featureStock, setFeatureStock] = useState<number>(0);


    useEffect(() => {
        api.api.paperGetAllPapers().then((res) => setPapers(res.data));
        api.api.featureGetAllFeatures().then((res) => setFeatures(res.data));
    }, []);

    const handlePaperChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPaper(parseInt(event.target.value));
    }

    const handleFeatureChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFeature(parseInt(event.target.value));
    };

    const handleSubmit = (event: React.ChangeEvent) => {
        event.preventDefault()
        if (selectedPaper && selectedFeature && featureStock > 0){
            const data: FeaturesToPaperDto = {
                paperId: selectedPaper,
                featureIds: [selectedFeature],
                featureStock: featureStock,
            };

            api.featurePaper.featurePaperAddFeaturesToPaper(selectedPaper, data)
                .then(() => {
                    toast.success("Feature and stock successfully added to paper");
                    setSelectedPaper(null);
                    setSelectedFeature(null);
                    setFeatureStock(0);
                })
                .catch(error => {
                    toast.error("Error adding feature to paper");
                    console.log("Error adding feature to paper", error);
                });
        } else {
            toast.error("Please select a paper, feature and enter a valid stock");
        }
    }

    const handleGoBack = () => {
        navigate(ROUTES.ADMINPAGE);
    }


    return (
        <>
            <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Add Feature to Paper</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 items-center gap-4">
                        <label className="font-medium">Select Paper:</label>
                        <select
                            value={selectedPaper || ""}
                            onChange={handlePaperChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        >
                            <option value="" disabled>Select a paper</option>
                            {papers.map((paper) => (
                                <option key={paper.id} value={paper.id}>
                                    {paper.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 items-center gap-4">
                        <label className="font-medium">Select Feature:</label>
                        <select
                            value={selectedFeature || ""}
                            onChange={handleFeatureChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        >
                            <option value="" disabled>Select a feature</option>
                            {features.map((feature) => (
                                <option key={feature.id} value={feature.id}>
                                    {feature.featureName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 items-center gap-4">
                        <label className="font-medium">Feature Stock:</label>
                        <input
                            type="number"
                            value={featureStock}
                            onChange={(e) => setFeatureStock(parseInt(e.target.value))}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            min="1"
                            required
                        />
                    </div>

                    <button
                        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
                        Add Feature
                    </button>
                </form>

                <button
                    onClick={handleGoBack}
                    className="w-full bg-gray-500 text-white py-2 px-4 rounded mt-4 hover:bg-gray-600 transition duration-200">
                    Back
                </button>
            </div>
            <ToastContainer position="top-center" autoClose={3500} hideProgressBar={false} closeOnClick pauseOnHover />
        </>
    )

}

export default AddFeature;