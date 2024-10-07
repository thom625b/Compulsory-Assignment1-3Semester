import { useEffect, useState } from "react";
import {Api, Paper} from "../../Api.ts";

export default function PaperTable() {
    const api = new Api();
    const [papers, setPapers] = useState<Paper[]>([]);
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [updatedStock, setUpdatedStock] = useState<number>(0);
    const [updatedDiscontinued, setUpdatedDiscontinued] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPapers = papers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(papers.length / itemsPerPage);

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

    const openModal = (paper: Paper) => {
        setSelectedPaper(paper);
        setUpdatedStock(paper.stock!);
        setUpdatedDiscontinued(paper.discontinued!);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedPaper(null);
    };

    const handleUpdate = async () => {
        if (selectedPaper){
            const payload = {
                stock: updatedStock,
                discontinued: updatedDiscontinued,
            };

            console.log("Updating paper with data:", payload);
            try {
                await api.api.paperUpdatePaper(selectedPaper.id!, {
                    id: selectedPaper.id,
                    stock: updatedStock,
                    discontinued: updatedDiscontinued,
                });
                setPapers((prevPapers) =>
                prevPapers.map((paper) =>
                paper.id === selectedPaper.id ?
                    {...paper, stock: updatedStock, discontinued: updatedDiscontinued}: paper
                )
            );
                closeModal();
            } catch (error) {
                console.error("Error updating paper:", error);
            }
        }
    };

    return (
        <>
            <table className="table-auto w-full border-collapse border border-gray-400">
                <thead>
                <tr>
                    <th className="border border-gray-400 px-4 py-2">Name</th>
                    <th className="border border-gray-400 px-4 py-2">Stock Total</th>
                    <th className="border border-gray-400 px-4 py-2">Price</th>
                    <th className="border border-gray-400 px-4 py-2">Discontinued</th>
                    <th className="border border-gray-400 px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentPapers.map((paper) => (
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
                        <td className="border border-gray-400 px-4 py-2">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => openModal(paper)}
                            >
                                Update
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="btn btn-secondary"
                >
                    Previous
                </button>

                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="btn btn-info"
                >
                    Next
                </button>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded shadow-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">Update Paper</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Stock</label>
                            <input
                                type="number"
                                className="w-full border border-gray-300 px-4 py-2 mt-2"
                                value={updatedStock}
                                onChange={(e) => setUpdatedStock(Number(e.target.value))}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={updatedDiscontinued}
                                    onChange={() => setUpdatedDiscontinued(!updatedDiscontinued)}
                                />
                                <span className="ml-2">Discontinued</span>
                            </label>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleUpdate}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
