import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES, basketAtom, Api } from "../imports";
import {useAtom} from "jotai/index";
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
        <div className="flex relative">
            <div className="w-2/3">
                <h1 className="text-lg font-bold underline">Buy Order</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                    {successMessage && <div className="text-green-500">{successMessage}</div>}

                    <label className="flex items-center gap-2 w-2/6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="h-5 w-5 opacity-70">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm-7 9a7 7 0 0 1 14 0h-2a5 5 0 1 0-10 0H5z"/>
                        </svg>
                        <input type="text" className="grow" placeholder="Name" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </label>

                    <label className="flex items-center gap-2 w-2/6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                             className="h-5 w-5 opacity-70">
                            <path
                                d="M8 3.293l6 6V13a1 1 0 0 1-1 1h-4v-3H7v3H3a1 1 0 0 1-1-1V9.293l6-6Zm5 6.707V12h-3v-3H6v3H3v-2.293l5-5 5 5Z"/>
                        </svg>
                        <input type="text" className="grow" placeholder="Address" value={address}
                               onChange={(e) => setAddress(e.target.value)}/>
                    </label>

                    <label className="flex items-center gap-2 w-2/6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="h-5 w-5 opacity-70">
                            <path
                                d="M22 16.92v3.34a2.75 2.75 0 0 1-2.98 2.74A19.98 19.98 0 0 1 2.93 5.98 2.75 2.75 0 0 1 5.67 3h3.34c1.39 0 2.55 1.07 2.74 2.44l.29 2.19a2.75 2.75 0 0 1-.79 2.32l-1.3 1.3a16.07 16.07 0 0 0 6.1 6.1l1.3-1.3a2.75 2.75 0 0 1 2.32-.79l2.19.29c1.37.18 2.44 1.34 2.44 2.73z"/>
                        </svg>
                        <input type="text" className="grow" placeholder="Phone" value={phone}
                               onChange={(e) => setPhone(e.target.value)}/>
                    </label>

                    <label className="flex items-center gap-2 w-2/6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                             className="h-5 w-5 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                        </svg>
                        <input type="text" className="grow" placeholder="Email" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </label>

                    <button type="submit"
                            className="w-1/6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
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
                                        <p><strong>{item.name}</strong> - {item.quantity} pcs @ {item.price} each</p>
                                    </div>
                                ))}
                                <div className="font-bold">Total: {totalAmount.toFixed(2)}</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="absolute left-1/4 top-[calc(11%-24px)]">
                <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FEjSALtb66N2Ug%2Fgiphy.gif&f=1&nofb=1&ipt=ca8f77fe0ce7701445c1ac35126f3a86ddbede26f0c262b928ff79b69b06674c&ipo=images"
                    alt="Order Animation"/>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default OrderPaySite;
