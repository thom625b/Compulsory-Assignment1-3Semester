import { Api } from "../../Api.ts";
import { useAtom } from "jotai";
import { customerAtom } from "../../Atoms/CustomerAtom.tsx";
import { useEffect, useState } from "react";
import React from "react";

const api = new Api();

interface Order {
    id: number;
    customerId: number;
    orderDate: string;
    deliveryDate: string;
    status: string;
    totalAmount: number;
}

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options); // Format date to "Month Day, Year" e.g., "September 29, 2024"
};

const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };
    const date = new Date(dateString);
    return date.toLocaleString(undefined, options); // Format date and time
};

const CustomerList = () => {
    const [customers, setCustomers] = useAtom(customerAtom);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

    const fetchCustomers = async () => {
        try {
            const res = await api.api.customerGetAllCustomers();
            setCustomers(res.data);
            setLoading(false);
        } catch (error) {
            setError("Failed to load customer list");
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await api.api.orderGetAllOrders();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setOrders(res.data);
        } catch (error) {
            setError("Failed to load orders");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (customers.length === 0) {
            fetchCustomers().then();
        } else {
            fetchOrders().then();
        }
    }, [customers]);

    const handleCheckboxChange = (customerId: number | undefined) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setSelectedCustomerId(prev => (prev === customerId ? null : customerId));
    };

    if (loading) {
        return <div>Loading customers...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone number</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer) => (
                        <React.Fragment key={customer.id}>
                            <tr>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={selectedCustomerId === customer.id}
                                            onChange={() => handleCheckboxChange(customer.id)}
                                        />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://avatars.githubusercontent.com/u/41024316?v=4"
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{customer.name}</div>
                                            <div className="text-sm opacity-50">{customer.address}</div>
                                            <div className="text-sm opacity-50">{customer.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{customer.phone}</td>
                                <td>{customer.email}</td>
                            </tr>
                            {selectedCustomerId === customer.id && (
                                <tr>
                                    <td colSpan={5}>
                                        <table className="table w-full">
                                            <thead>
                                            <tr>
                                                <th></th>
                                                <th>Order Date</th>
                                                <th>Delivery Date</th>
                                                <th>Status</th>
                                                <th>Total Amount</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {orders
                                                .filter(order => order.customerId === customer.id)
                                                .map(order => (
                                                    <tr key={order.id}>
                                                        <td></td>
                                                        <td>{formatDateTime(order.orderDate)}</td>
                                                        <td>{formatDate(order.deliveryDate)}</td>
                                                        <td>{order.status}</td>
                                                        <td>{order.totalAmount}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CustomerList;
