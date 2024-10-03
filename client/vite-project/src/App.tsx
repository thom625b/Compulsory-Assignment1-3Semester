
import {Route, Routes} from "react-router-dom";
import {ROUTES} from "./Constants/Routes.ts";
import Home from "./Components/Home.tsx";

import Paper from "./Components/Paper/PaperList.tsx"
import AdminPage from "./Components/AdminPage.tsx"
import CustomerList from "./Components/Customer/CustomerList.tsx"
import CreateOrder from "./Components/Order/OrderCreate.tsx"
import Payment from "./Components/Order/OrderPaySite.tsx"
import {DevTools} from "jotai-devtools";
import  "jotai-devtools/styles.css";


function App() {

    return (
        <>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />}>
                    <Route index element={<Paper />} />
                    <Route path={ROUTES.ADMINPAGE} element={<AdminPage />} />
                    <Route path={ROUTES.CUSTOMERORDERS} element={<CustomerList />} />
                    <Route path={ROUTES.CREATEORDER} element={<CreateOrder />} />
                    <Route path={ROUTES.PAYMENT} element={<Payment />} />
                </Route>
            </Routes>
            <DevTools/>
        </>
    )
}

export default App;