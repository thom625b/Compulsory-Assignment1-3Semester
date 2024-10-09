import React, {useEffect, useState} from "react";
import { Api } from "../../Api.ts";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants/Routes.ts";
import {useAtom} from "jotai/index";
import {basketAtom} from "../../Atoms/BasketAtom.tsx";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const OrderPaySite = () => {
    const api = new Api();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [basket] = useAtom(basketAtom);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !address || !phone || !email) {
            toast.error("All fields are required.");
            setSuccessMessage('');
            return;
        }

        try {
            // Check if the customer already exists by email
            let createdCustomer;
            try {
                const response = await api.api.customerGetCustomerByEmail(email);
                createdCustomer = response.data;
            } catch (error) {
                // If the customer does not exist, create a new customer
                const newCustomer = {
                    name,
                    address,
                    phone,
                    email,
                };

                const customerResponse = await api.api.customerCreateCustomer(newCustomer);
                createdCustomer = customerResponse.data;
            }

            const orderDate = new Date();
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 4);
            const formattedDeliveryDate = deliveryDate.toISOString().slice(0, 10);


            const order = {
                orderDate: orderDate,
                deliveryDate: formattedDeliveryDate,
                status: 0,
                totalAmount,
                customerEmail: createdCustomer.email,
                orderEntries: basket.map(item => ({
                    quantity: item.quantity,
                    productId: item.paperId,
                })),
            };

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            await api.api.orderCreateOrder(order);

            toast.success("Order created successful. " +
                `You can expect delivery on:  ${formattedDeliveryDate} `)
            setErrorMessage('');

            // Clear input fields
            setName('');
            setAddress('');
            setPhone('');
            setEmail('');
            setTimeout(() => navigate(ROUTES.CUSTOMERORDERS), 3500);
        } catch (error) {
            toast.error("Failed to create order")
            setSuccessMessage('');
        }
    };

    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        const total = basket.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotalAmount(total);
    }, [basket]);



    return (
        <>
            <h1 className="text-lg font-bold">Buy Order</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                {successMessage && <div className="text-green-500">{successMessage}</div>}

                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                    </svg>
                    <input type="text" className="grow" placeholder="Name" value={name}
                           onChange={(e) => setName(e.target.value)}/>
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                    </svg>
                    <input type="text" className="grow" placeholder="Address" value={address}
                           onChange={(e) => setAddress(e.target.value)}/>
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                    </svg>
                    <input type="text" className="grow" placeholder="Phone" value={phone}
                           onChange={(e) => setPhone(e.target.value)}/>
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                    </svg>
                    <input type="text" className="grow" placeholder="Email" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </label>

                <button type="submit"
                        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
                    Create order
                </button>
            </form>

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Basket Overview</h1>

                <div className="mb-6">
                    {basket.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            {basket.map((item, index) => (
                                <div key={index} className="border-b py-2">
                                    <p><strong>{item.name}</strong></p>
                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                    <p><strong>Feature:</strong> {item.feature || "None"}</p>
                                    <p><strong>Price per Unit:</strong> {item.price} $</p>
                                    <p><strong>Total for this Item:</strong> {(item.quantity * item.price).toFixed(2)} $
                                    </p>
                                </div>
                            ))}
                            <div className="mt-4">
                                <h2 className="text-xl font-bold">Total Amount: {totalAmount.toFixed(2)} $</h2>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3500} hideProgressBar={false} closeOnClick pauseOnHover />
        </>
    );
};

export default OrderPaySite;
