import React, { useEffect, useState } from "react";
import {Api, Feature} from "../../Api.ts"; // Adjust the import path to your API client

export default function FeatureTable() {
    const [features, setFeatures] = useState<Feature[]>([]);
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

    return (
        <table className="table-auto w-full border-collapse border border-gray-400">
            <thead>
            <tr>
                <th className="border border-gray-400 px-4 py-2">ID</th>
                <th className="border border-gray-400 px-4 py-2">Name</th>
            </tr>
            </thead>
            <tbody>
            {features.map((feature) => (
                <tr key={feature.id}>
                    <td className="border border-gray-400 px-4 py-2">{feature.id}</td>
                    <td className="border border-gray-400 px-4 py-2">{feature.featureName}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
