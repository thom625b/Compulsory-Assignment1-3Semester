import { useEffect, useState } from "react";
import {Api, Feature} from "../../Api.ts"; // Adjust the import path to your API client

export default function FeatureTable() {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const api = new Api();

    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const response = await api.api.featureGetAllFeatures();
                setFeatures(response.data);
            } catch (error) {
                console.error("Error fetching features:", error);
            }
        };

        fetchFeatures();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFeatures = features.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(features.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div>
                <h1 className="text-2xl font-bold underline">Features</h1>
                <table className="table-auto w-full border-collapse border border-gray-400 mt-14">
                    <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentFeatures.map((feature) => (
                        <tr key={feature.id}>
                            <td className="border border-gray-400 px-4 py-2">{feature.featureName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1} className="btn btn-secondary">
                        Previous
                    </button>

                    <span>Page {currentPage} of {totalPages}</span>

                    <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-info">
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
