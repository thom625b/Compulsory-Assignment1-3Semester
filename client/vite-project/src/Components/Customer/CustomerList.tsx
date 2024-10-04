import { Api } from "../../Api.ts";
import { useAtom } from "jotai";
import { customerAtom } from "../../Atoms/CustomerAtom.tsx";
import { useEffect, useState } from "react";

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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchCustomersAndOrders = async () => {
        try {
            const customerRes = await api.api.customerGetAllCustomers();
            const orderRes = await api.api.orderGetAllOrders();

            console.log('Customer Response:', customerRes);  // Debugging line
            console.log('Order Response:', orderRes);

            const customersWithOrders = customerRes.data.map((customer: any) => {
                const customerOrders = orderRes.data.filter((order: Order) => order.customerId === customer.id);
                return { ...customer, orders: customerOrders }; // Add orders to the customer object
            });

            setCustomers(customersWithOrders);
            setOrders(orderRes.data);
            setLoading(false);
        } catch (error) {
            console.error("API error:", error);
            setError("Failed to load customer or order data");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomersAndOrders().then();
    }, []);

    const handleIconClick = (customerId: number | undefined) => {
        setSelectedCustomerId(prev => (prev === customerId ? null : customerId));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCustomerId(null); // Deselect customer
    };

    const getSelectedCustomerName = () => {
        const selectedCustomer = customers.find(customer => customer.id === selectedCustomerId);
        return selectedCustomer ? selectedCustomer.name : 'Unknown Customer'; // Fallback to 'Unknown Customer' if not found
    };

    if (loading) {
        return <div>Loading customers...</div>;
    }

    if (error) {
        return <div>
            <span className="loading loading-spinner text-neutral"></span>
            <div> {error}</div>
        </div>;
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
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
                        <tr key={customer.id}>
                            <th>
                                <button
                                    className="text-2xl"
                                    onClick={() => handleIconClick(customer.id)}
                                >
                                    +
                                </button>
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
                                        <div className="text-sm opacity-50">Orders: {customer.orders?.length}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{customer.address}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
                        <h2 className="text-2xl font-bold mb-4">
                            Orders for {getSelectedCustomerName()}
                        </h2>
                        <button className="btn btn-sm" onClick={closeModal}>Close</button>
                        <table className="table w-full mt-4">
                            <thead>
                            <tr>
                                <th>Order Date</th>
                                <th>Delivery Date</th>
                                <th>Status</th>
                                <th>Total Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders
                                .filter(order => order.customerId === selectedCustomerId)
                                .map(order => (
                                    <tr key={order.id}>
                                        <td>{formatDateTime(order.orderDate)}</td>
                                        <td>{formatDate(order.deliveryDate)}</td>
                                        <td>{order.status}</td>
                                        <td>{order.totalAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomerList;

