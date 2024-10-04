import React, { useEffect, useState } from "react";
import {Api, Paper} from "../../Api.ts"; // Adjust the import path to your API client

export default function PaperTable() {
    const [papers, setPapers] = useState<Paper[]>([]);
    const api = new Api();

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const response = await api.api.paperGetAllPapers();
                setPapers(response.data);
            } catch (error) {
                console.error("Error fetching papers:", error);
            }
        };

        fetchPapers();
    }, []);

    return (
        <table className="table-auto w-full border-collapse border border-gray-400">
            <thead>
            <tr>
                <th className="border border-gray-400 px-4 py-2">ID</th>
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Stock</th>
                <th className="border border-gray-400 px-4 py-2">Price</th>
            </tr>
            </thead>
            <tbody>
            {papers.map((paper) => (
                <tr key={paper.id}>
                    <td className="border border-gray-400 px-4 py-2">{paper.id}</td>
                    <td className="border border-gray-400 px-4 py-2">{paper.name}</td>
                    <td className="border border-gray-400 px-4 py-2">{paper.stock}</td>
                    <td className="border border-gray-400 px-4 py-2">{paper.price}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
