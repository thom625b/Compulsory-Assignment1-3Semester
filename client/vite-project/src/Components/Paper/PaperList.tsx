import {Api} from "../../Api.ts";
import {useAtom} from "jotai";
import {paperAtom} from "../../Atoms/PaperAtom.tsx";
import React, {useEffect, useState} from "react";
import {featureAtom} from "../../Atoms/PropertiesAtom.tsx";
import {basketAtom} from "../../Atoms/BasketAtom.tsx";
import {ToastContainer, toast} from "react-toastify";


const api = new Api();


const PaperList = () => {
    const [papers, setPapers] = useAtom(paperAtom);
    const [selectedFeatures, setSelectedFeatures] = useAtom(featureAtom);
    const [, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const [featureStock, setfeatureStock] = useState<Record<number, number>>({});
    const [featuresByPaper, setFeaturesByPaper] = useState<Record<number, any>>({});
    const [basket, setBasket] = useAtom(basketAtom);
    const [searchInput, setSearchInput] = useState<string>("");
    const [filter, setFilter] = useState<string>("all"); // Filter state
    const [sortOrder, setSortOrder] = useState<string>("none"); // Sort order state


    const FetchPapers = async () => {
        try {
            const res = await api.api.paperGetAllPapers();
            setPapers(res.data);

            const initialQuantity = res.data.reduce((acc: Record<number, number>, paper: any) => {
                acc[paper.id] = 0; // Ensure quantities start at 0
                return acc;
            }, {});
            setQuantities(initialQuantity);

            await FetchPaperFeatures(res.data);
            setLoading(false);
        } catch (error) {
            setError("Failed to load paper data");
            setLoading(false);
        }
    };


    const FetchPaperFeatures = async (papers: any[]) => {
        const featurePromises = papers.map(async (paper) => {
            const featureDetails = await Promise.all(
                paper.paperFeatures.map(async (pf: any) => {
                    const feature = await api.api.featureGetFeature(pf.featureId);
                    return { ...feature.data, featureStock: pf.featureStock }; // include stock info
                })
            );
            return { paperId: paper.id, features: featureDetails };
        });

        const featureData = await Promise.all(featurePromises);
        const featureMap = featureData.reduce((acc, item) => {
            acc[item.paperId] = item.features;
            return acc;
        }, {});

        setFeaturesByPaper(featureMap);
    };

    const FetchFeatureStock = async (paperId: number, featureId: number) => {
        try {
            const stock = await api.featurePaper.featurePaperGetFeatureStock(paperId, featureId);
            setfeatureStock((prev) => ({...prev, [featureId]: stock.data}));
        } catch (error) {
            setError(`Failed to load stock on ${featureId}`);
        }
    };

    useEffect(() => {
        if (papers.length > 0) {
            // Reset the quantities to 0 when navigating back
            const resetQuantities = papers.reduce((acc: Record<number, number>, paper: any) => {
                acc[paper.id] = 0;
                return acc;
            }, {});
            setQuantities(resetQuantities);

            // Fetch features for the papers
            FetchPaperFeatures(papers);
        }
    }, [papers]);



    const incrementQuantity = async (id: number, stock: number) => {
        setQuantities((quantity) => ({
            ...quantity,
            [id]: Math.min((quantity[id] || 0) + 1, stock), // Ensure quantity[id] is at least 0
        }));
    };

    const decreaseQuantity = async (id: number) => {
        setQuantities((quantity) => ({
            ...quantity,
            [id]: Math.max(0, (quantity[id] || 0) - 1), // Ensure quantity[id] is at least 0
        }));
    };


    const handleFeatureChange = async (paperId: number, featureId: number) => {
        setSelectedFeatures({
            ...selectedFeatures,
            [paperId]: featureId,
        });

        await FetchFeatureStock(paperId, featureId);
    };

    const handleAddToBasket = async (paperId: number) => {
        const selectedFeatureId = selectedFeatures[paperId];
        const quantity = quantities[paperId];
        const paper = papers.find(p => p.id === paperId);

        if (quantity === 0) {
            toast.error("You cant add zero to basket")
            return;
        }

        if (paper?.paperFeatures?.length > 0 && !selectedFeatureId) {
            toast.error("Please select a feature before proceeding")
            return;
        }

        if (!paper) {
            console.log("Paper not found")
            return;
        }

        if (paper.stock < quantity) {
            toast.error(`Not enough stock for ${paper.name}. Available: ${paper.stock}, Requested: ${quantity}`);
            return;
        }

        const selectedFeature = paper.paperFeatures?.find(feature => feature.id === Number(selectedFeatureId));
        if (selectedFeature && selectedFeature.featureStock < quantity) {
            toast.error(`Not enough stock for feature. Available: ${selectedFeature.featureStock}, Requested: ${quantity}`);
            return;
        }

        const selectedFeatureName = featuresByPaper[paperId]?.find(
            (feature) => feature.id === Number(selectedFeatureId)
        )?.featureName;

        const paperInBasket = basket
            .find(item => item.paperId === paperId && item.featureId === selectedFeatureId);

        if (paperInBasket) {
            setBasket(basket.map(item =>
                item.paperId === paperId && item.featureId === selectedFeatureId
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
        } else {
            setBasket([...basket, {
                paperId,
                featureId: selectedFeatureId,
                name: paper.name,
                quantity,
                feature: selectedFeatureName || "None",
                price: paper.price
            }]);
        }

        try {
            const decreaseStockDto = {
                productId: paperId,
                quantity: quantity
            };
            await api.api.orderDecreaseStock(paperId, decreaseStockDto);
            toast.success("Product added to basket")
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const savedPapers = localStorage.getItem('papers');
        const savedQuantities = localStorage.getItem('quantities');
        const savedFeatures = localStorage.getItem('selectedFeatures');

        if (savedPapers) setPapers(JSON.parse(savedPapers));
        if (savedQuantities) setQuantities(JSON.parse(savedQuantities));
        if (savedFeatures) setSelectedFeatures(JSON.parse(savedFeatures));
    }, []);

    useEffect(() => {
        localStorage.setItem('papers', JSON.stringify(papers));
        localStorage.setItem('quantities', JSON.stringify(quantities));
        localStorage.setItem('selectedFeatures', JSON.stringify(selectedFeatures));
    }, [papers, quantities, selectedFeatures]);

    useEffect(() => {
            FetchPapers();
    }, []);


    if (error) {
        return <div>
            <span className="loading loading-spinner text-neutral"></span>
            <div> {error}</div>
        </div>;
    }

    const filteredPapers = papers
        .filter((paper) => {
            const matchesSearch = paper.name.toLowerCase().includes(searchInput.toLowerCase());
            const matchesFilter = filter === "all" ||
                (filter === "discontinued" && paper.discontinued) ||
                (filter === "not-discontinued" && !paper.discontinued);
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            if (sortOrder === "price-asc") {
                return a.price - b.price;
            }
            else if (sortOrder === "price-desc"){
                return b.price - a.price;
            }
            else if (sortOrder === "stock-asc") {
                return a.stock - b.stock;
            }
            else if (sortOrder === "stock-desc") {
                return b.stock - a.stock;
            }
            return 0; // No sorting
        });


    return (
        <div >
            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search by paper name..."
                    className="input input-bordered w-[490px]"/>
            </div>


            <div className="mb-4">
                <label className="mr-2">Filter:</label>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="all">All Papers</option>
                    <option value="discontinued">Discontinued Papers</option>
                    <option value="not-discontinued">In stock</option>
                </select>

                <label className="mr-2 ml-4">Sort by:</label>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="none">None</option>
                    <option value="price-asc">Price ascending</option>
                    <option value="price-desc">Price descending</option>
                    <option value="stock-asc">Stock ascending</option>
                    <option value="stock-desc">Stock ascending</option>
                </select>
            </div>

            <div className="h-[770px] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPapers.map((paper) => (
                        <div key={paper.id}
                             className="card bg-base-100 w-96 shadow-xl transition-shadow duration-300 ease-in-out mb-6"
                             style={{
                                 boxShadow: '0 4px 6px rgba(0, 128, 0, 0.1)',
                             }}
                             onMouseEnter={(e) =>
                                 (e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 255, 0, 0.4)')
                             } // Green shadow on hover
                             onMouseLeave={(e) =>
                                 (e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 128, 0, 0.1)')
                             }>
                            <figure>
                                <img
                                    src="/pictures/papirA4.jpg" // Use the correct image URL based on your data
                                    alt={paper.name}
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {paper.name}
                                    {paper.discontinued && (
                                        <div className="badge badge-error">Discontinued</div>
                                    )}
                                </h2>
                                <p>Price: {paper.price} $ / 100 sheets</p>
                                <p>
                                    Your total price:
                                    <strong>
                                        {(paper.price && quantities[paper.id] !== undefined
                                            ? (paper.price * quantities[paper.id])
                                            : 0).toFixed(2)} $</strong>
                                </p>


                                <div className="my-4">
                                    <label className="block font-bold mb-2">Select Feature:</label>
                                    <select
                                        className="bg-gray-200 text-gray-700 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                                        value={selectedFeatures[paper.id] || ""}
                                        onChange={(e) => handleFeatureChange(paper.id, e.target.value)}
                                        disabled={!featuresByPaper[paper.id] || featuresByPaper[paper.id].length === 0}
                                    >
                                        <option disabled value="">Select Feature</option>
                                        {featuresByPaper[paper.id]?.map((feature) => (
                                            <option key={feature.id} value={feature.id}>
                                                {feature.featureName}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                                <label className="block font-bold mb-2">Stock: {paper.stock}</label>
                                {/* Display the feature stock */}
                                <label className="block font-bold mb-2">
                                    Feature
                                    Stock: {selectedFeatures[paper.id] && featureStock[selectedFeatures[paper.id]] !== undefined
                                    ? featureStock[selectedFeatures[paper.id]]
                                    : 'Select a feature'}
                                </label>
                                <div className="my-4">
                                    <label className="block font-bold mb-2">Quantity:</label>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className="btn btn-outline btn-sm"
                                            onClick={() => decreaseQuantity(paper.id)}
                                            disabled={!selectedFeatures[paper.id] || quantities[paper.id] <= 0}
                                        >
                                            -
                                        </button>

                                        <input
                                            type="text"
                                            value={quantities[paper.id] || 0} readOnly
                                            className="input input-bordered input-sm w-20 text-center"
                                        />

                                        <button
                                            className="btn btn-outline btn-sm"
                                            onClick={() => incrementQuantity(paper.id, featureStock[selectedFeatures[paper.id]] || paper.stock)}
                                            disabled={!selectedFeatures[paper.id] || quantities[paper.id] >= (featureStock[selectedFeatures[paper.id]] || paper.stock)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="text-sm mt-1">We sell in packs of 100</p>
                                </div>


                                <div className="card-actions justify-end">
                                    {featuresByPaper[paper.id] && featuresByPaper[paper.id].length > 0 ? (
                                        featuresByPaper[paper.id].map((feature) => (
                                            <div key={feature.id} className="badge badge-outline">
                                                {feature.featureName}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="badge badge-outline">No Features</div>
                                    )}
                                </div>
                                <button className="btn btn-outline "
                                        onClick={() => handleAddToBasket(paper.id)}>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3500} hideProgressBar={false} closeOnClick pauseOnHover />
        </div>

    );
};


export default PaperList;