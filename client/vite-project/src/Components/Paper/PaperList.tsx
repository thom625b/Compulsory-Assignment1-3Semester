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
            <h1>Paper list</h1>
            <ul>
                {papers.map((paper) => (
                    <li key={paper.id}>{paper.name} - {paper.price} $</li>
                ))}
            </ul>
        </div>
    );
};


export default PaperList;