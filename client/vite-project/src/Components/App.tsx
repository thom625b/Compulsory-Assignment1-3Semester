
import {Route, Routes} from "react-router-dom";
import {ROUTES} from "./imports";
import Home from "./Home.tsx";
import Paper from "./Paper/PaperList.tsx"
import AdminPage from "./AdminPage.tsx"
import CustomerList from "./Customer/CustomerList.tsx"
import CreateOrder from "./Order/OrderCreate.tsx"
import Payment from "./Order/OrderPaySite.tsx"
import {DevTools} from "jotai-devtools";
import  "jotai-devtools/styles.css";
import PaperCreate from "./Paper/PaperCreate.tsx";
import FeatureCreate from "./Features/FeatureCreate.tsx";
import AddFeature from "./Features/AddFeature.tsx";
import ContactPage from "./ContactPage.tsx"

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
                    <Route path={ROUTES.CREATEPAPER} element={<PaperCreate/>}/>
                    <Route path={ROUTES.CREATEFEATURE} element={<FeatureCreate/>}/>
                    <Route path={ROUTES.ADDFEATURETOPAPER} element={<AddFeature/>}/>
                    <Route path={ROUTES.CONTACT} element={<ContactPage/> }/>
                </Route>
            </Routes>
            <DevTools/>
        </>
    )
}

export default App;