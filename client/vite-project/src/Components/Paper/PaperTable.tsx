import React, { useEffect, useState } from "react";
import {Api, Paper} from "../../Api.ts";

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
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Total Stock</th>
                <th className="border border-gray-400 px-4 py-2">Price</th>
                <th className="border border-gray-400 px-4 py-2">Discontinued</th>
            </tr>
            </thead>
            <tbody>
            {papers.map((paper) => (
                <tr
                    key={paper.id}
                    className={`${paper.discontinued ? "bg-red-200" : ""}`}
                >
                    <td className="border border-gray-400 px-4 py-2">
                        <span className={`${paper.discontinued ? "line-through" : ""}`}>
                            {paper.name}
                        </span>
                    </td>
                    <td className="border border-gray-400 px-4 py-2">{paper.stock}</td>
                    <td className="border border-gray-400 px-4 py-2">{paper.price} $</td>
                    <td className="border border-gray-400 px-4 py-2">
                        {paper.discontinued ? "Yes" : "No"}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
