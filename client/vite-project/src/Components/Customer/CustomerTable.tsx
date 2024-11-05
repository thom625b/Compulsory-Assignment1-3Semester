import { Api, OrderStatus, customerAtom } from "../imports";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const api = new Api();

interface Order {
    id: number;
    customerId: number;
    orderDate: string;
    deliveryDate: string;
    status: OrderStatus;
    totalAmount: number;
}

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
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
    return date.toLocaleString(undefined, options);
};

const CustomerTable = () => {
    const [customers, setCustomers] = useAtom(customerAtom);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [, setStatuses] = useState<string[]>([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);





    const fetchCustomersAndOrders = async () => {
        try {
            const customerRes = await api.api.customerGetAllCustomers();
            const orderRes = await api.api.orderGetAllOrders();
            console.log("Fetched orders:", orderRes.data); // Debug log

            const customersWithOrders = customerRes.data.map((customer: any) => {
                const customerOrders = orderRes.data
                    .filter((order: Order) => order.customerId === customer.id)
                    .map((order: Order) => ({
                        ...order,
                        status: OrderStatus[order.status as keyof typeof OrderStatus]
                    }));

                return { ...customer, orders: customerOrders };
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

    const filteredCustomers = customers.filter(customer => customer.name
        .toLowerCase()
        .includes(searchInput.toLowerCase()))

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

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


    const handleIconClick = (customerId: number | undefined) => {
        setSelectedCustomerId(prev => (prev === customerId ? null : customerId));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCustomerId(null);
    };

    const getSelectedCustomerName = () => {
        const selectedCustomer = customers?.find(customer => customer.id === selectedCustomerId);
        return selectedCustomer ? selectedCustomer.name : 'Unknown Customer';
    };

    const fetchOrderStatuses = async () => {
        try {
            const response = await api.api.orderGetOrderStatuses();
            setStatuses(response.data || []); // Ensure statuses is always an array
        } catch (error) {
            console.error("Failed to load order statuses:", error);
            setStatuses([]); // Set statuses to an empty array on error
        }
    };

    useEffect(() => {
        fetchOrderStatuses();
    }, []);

    const handleChangeStatus = async (orderId: number, newStatus: number) => {
        console.log(`Changing status for order ${orderId} to ${newStatus}`);
        try {
            const response = await api.api.orderChangeOrderStatus(orderId, { newStatus });
            console.log("API Response:", response); // Log the response from the API

            // Update the order state directly if the response includes the updated order
            setOrders(prevOrders =>
                prevOrders.map(order => (order.id === orderId ? { ...order, status: newStatus } : order))
            );
        } catch (error) {
            console.error("Failed to change order status:", error);
        }
    };


    useEffect(() => {
        fetchCustomersAndOrders();
        console.log("Orders after fetch:", orders); // Log the updated orders
    }, []);



    if (loading) {
        return <div>Loading customers...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="overflow-x-auto">
                <h1 className="text-2xl font-bold underline">Customers</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search customer by name..."
                        className="input input-bordered w-[490px]"/>
                </div>
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
                    {currentCustomers.map((customer) => (
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
                                                alt="Avatar"
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
                {/* Pagination Controls */}
                <div className=" ml-0 w-[275px]" >
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="btn btn-outline"
                        >
                            Previous
                        </button>

                        <span>
                    Page {currentPage} of {totalPages}
                </span>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="btn btn-outline"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
                        <h2 className="text-2xl font-bold mb-4">
                            Orders for {getSelectedCustomerName()}
                        </h2>
                        <button className="btn btn-outline hover:accent-gray-300 bg-blue-200" onClick={closeModal}>Close</button>
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
                                ?.filter(order => order.customerId === selectedCustomerId)
                                ?.map(order => (
                                    <tr key={order.id}>
                                        <td>{formatDateTime(order.orderDate)}</td>
                                        <td>{formatDate(order.deliveryDate)}</td>
                                        <td>
                                            <div className="relative">
                                                <select
                                                    name={`orderStatus-${order.id}`}
                                                    value={order.status} // Set the current order status
                                                    onChange={(e) => handleChangeStatus(order.id, Number(e.target.value))} // Convert string to number
                                                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                                >
                                                    {Object.keys(OrderStatus)
                                                        .filter(key => isNaN(Number(key))) // Filter out numeric keys
                                                        .map((status) => (
                                                            <option key={status} value={OrderStatus[status]}>
                                                                {status}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        </td>


                                        <td>{order.totalAmount} $</td>
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

export default CustomerTable;
