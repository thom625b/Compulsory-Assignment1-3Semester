
import {Route, Routes} from "react-router-dom";
import {ROUTES} from "./Constants/Routes.ts";
import Home from "./Components/Home.tsx";
import Paper from "./Components/Paper/PaperList.tsx"
import AdminPage from "./Components/AdminPage.tsx"
import CustomerList from "./Components/Customer/CustomerList.tsx"



function App() {

    return (
        <>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home/>}/>
                {/* <Route path={ROUTES.CUSTOMERS} element={<Customers/>}/>*/}
                <Route path={ROUTES.ADMINPAGE} element={<AdminPage/>}/>
                <Route path={ROUTES.PAPER} element={<Paper/>}/>
                <Route path={ROUTES.CUSTOMERORDERS} element={<CustomerList/>}/>
            </Routes>
        </>
    )
}

export default App;