import {useAtom} from "jotai/index";
import {useEffect, useState} from "react";
import {basketAtom, ROUTES} from "../imports";
import {useNavigate} from "react-router-dom";


const OrderCreate = () => {
    const navigate = useNavigate();
    const [basket] = useAtom(basketAtom);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        const total = basket.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotalAmount(total);
    }, [basket]);




return (
    <>
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Basket Overview</h1>

            <div className="mb-6">
                {basket.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        {basket.map((item, index) => (
                            <div key={index} className="border-b py-2">
                                <p><strong>{item.name}</strong> </p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Feature:</strong> {item.feature || "None"}</p>
                                <p><strong>Price per Unit:</strong> {item.price} $</p>
                                <p><strong>Total for this Item:</strong> {(item.quantity * item.price).toFixed(2)} $</p>
                            </div>
                        ))}
                        <div className="mt-4">
                            <h2 className="text-xl font-bold">Total Amount: {totalAmount.toFixed(2)} $</h2>
                        </div>
                    </>
                )}
            </div>
            <div>
                <button className="btn border-green-500 hover:bg-green-300"
                        onClick={() => navigate(ROUTES.PAYMENT)}>
                    Go to payment
                </button>
            </div>
        </div>
    </>
)
}
export default OrderCreate;