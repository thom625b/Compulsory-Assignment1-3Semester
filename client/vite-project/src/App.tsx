
import {Route, Routes} from "react-router-dom";
import {ROUTES} from "./Constants/Routes.ts";
import Home from "./Components/Home.tsx";
import Paper from "./Components/Paper/PaperList.tsx"
import AdminPage from "./Components/AdminPage.tsx"



function App() {

    return (
        <>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home/>}/>
                {/* <Route path={ROUTES.CUSTOMERS} element={<Customers/>}/>*/}
                <Route path={ROUTES.ADMINPAGE} element={<AdminPage/>}/>
                 <Route path={ROUTES.PAPER} element={<Paper/>}/>
            </Routes>
        </>
    )
}

export default App;