import {Api} from "../../Api.ts";
import React, {useState} from "react";


const PaperCreate = () => {

    const api = new Api();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0.0)
    const [stock, setStock] = useState(0);
    const [discontinued, setDiscontinued] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newPaper = {
            name,
            stock,
            price,
            discontinued,
        };

        try {
            const res = await api.api.paperCreatePaper(newPaper);
            setSuccessMessage("Paper created successfully")
        } catch (error) {
            setErrorMessage("Failed to create paper")
            setSuccessMessage('');
        }
    };




    return(
        <>
            <div>
                <h1>Create a New Paper</h1>
                {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Paper Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Stock:</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <label>Discontinued:</label>
                        <input
                            type="checkbox"
                            checked={discontinued}
                            onChange={() => setDiscontinued(!discontinued)}
                        />
                    </div>
                    <button type="submit">Create Paper</button>
                </form>
            </div>

        </>
    )
}


export default PaperCreate;