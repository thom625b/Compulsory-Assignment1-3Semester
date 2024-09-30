import {Api} from "../../Api.ts"
import {useAtom} from "jotai";
import {customerAtom} from "../../Atoms/CustomerAtom.tsx"
import {useEffect, useState} from "react";

const api = new Api();

const CustomerList = () => {
    const [customers, setCustomers] = useAtom(customerAtom);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCustomers = async () => {
        try {
            const res = await api.api.customerGetAllCustomers(); // Ensure this API method exists
            setCustomers(res.data);
            setLoading(false);
        } catch (error) {
            setError("Failed to load customer list");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (customers.length === 0) {
            fetchCustomers();
        }
    }, [customers]);

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
                        <tr key={customer.id}>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
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
                                        <div className="test-sm opacity-50">{customer.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{customer.phone}</td>
                            <td>{customer.email}</td>
                            <td>{customer.email}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CustomerList;

