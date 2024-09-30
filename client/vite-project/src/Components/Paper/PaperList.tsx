import {Api} from "../../Api.ts";
import {useAtom} from "jotai";
import {paperAtom} from "../../Atoms/PaperAtom.tsx";
import {useEffect, useState} from "react";


const api = new Api();


const PaperList = () => {
    const [papers, setPapers] = useAtom(paperAtom);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [quantities, setQuantities] = useState<Record<number, number>>({});


    const FetchPapers = async () => {
        try {
            const res = await api.api.paperGetAllPapers();
            setPapers(res.data);
            const initialQuantity = res.data.reduce((acc: any, paper: any ) => {
                acc[paper.id] = 10;
                return acc;
            }, {});
            setQuantities(initialQuantity);
            setLoading(false);
        } catch (error){
            setError("Failed to load papers from api");
            setLoading(false);
        }
    };

    const incrementQuantity = (id: number, stock: number) => {
        setQuantities((quantity) => ({
            ...quantity,
            [id]: Math.min(quantity[id] + 10, stock),
        }));
    };

    const decreaseQuantity = (id: number) => {
        setQuantities((quantity) => ({
            ...quantity,
            [id]: Math.max(0, quantity[id] - 10),
        }));
    };


    useEffect(() => {
        if ((papers.length === 0 )) {
            FetchPapers();
        }
    }, [papers]);

    if (loading) {
        return <div>Loading papers...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Papers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {papers.map((paper) => (
                    <div key={paper.id}
                         className="card bg-base-100 w-96 shadow-xl transition-shadow duration-300 ease-in-out"
                         style={{
                             boxShadow: '0 4px 6px rgba(0, 128, 0, 0.1)', // Regular shadow
                         }}
                         onMouseEnter={(e) =>
                             (e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 255, 0, 0.4)')
                         } // Green shadow on hover
                         onMouseLeave={(e) =>
                             (e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 128, 0, 0.1)')
                         }>
                        <figure>
                            <img
                                src="/pictures/papirA4.jpg"
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
                            <p>Price: {paper.price} $ / count</p>
                            <p>
                                Your total price: <strong>{(paper.price * quantities[paper.id]).toFixed(2)} $</strong>
                            </p>

                            <div className="my-4">
                                <label className="block font-bold mb-2">Quantity:</label>
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="btn btn-outline btn-sm"
                                        onClick={() => decreaseQuantity(paper.id, paper.stock)}
                                        disabled={quantities[paper.id] <= 0}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        value={quantities[paper.id]}
                                        readOnly
                                        className="input input-bordered input-sm w-20 text-center"
                                    />
                                    <button
                                        className="btn btn-outline btn-sm"
                                        onClick={() => incrementQuantity(paper.id, paper.stock)}
                                        disabled={quantities[paper.id] >= paper.stock}
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-sm mt-1">We sell in packs of 10</p>
                            </div>
                            <div className="card-actions justify-end">
                                {paper.features && paper.features.length > 0 ? (
                                    paper.features.map((feature) => (
                                        <div key={feature.id} className="badge badge-outline">
                                            {feature.featureName}
                                        </div>
                                    ))
                                ) : (
                                    <div className="badge badge-outline">No Features</div>
                                )}
                            </div>
                            <button className="btn btn-success bg-green-600"> Add to basket</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default PaperList;