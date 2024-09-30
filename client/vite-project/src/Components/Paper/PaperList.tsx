import {Api} from "../../Api.ts";
import {useAtom} from "jotai";
import {paperAtom} from "../../Atoms/PaperAtom.tsx";
import {useEffect, useState} from "react";


const api = new Api();


const PaperList = () => {
    const [papers, setPapers] = useAtom(paperAtom);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const FetchPapers = async () => {
        try {
            const res = await api.api.paperGetAllPapers();
            setPapers(res.data);
            setLoading(false);
        } catch (error){
            setError("Failed to load papers from api");
            setLoading(false);
        }
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
                            <p>Price: {paper.price} $</p>
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