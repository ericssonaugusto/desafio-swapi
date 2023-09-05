
import User from "./pages/User"
import {Home} from "./pages/Home"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"


const AppRoutes =() => {

    return(
        <Router>
            <Routes>
                <Route path="/" element= {<Home/>} />
                <Route path="/user" element= {<User/>} />
            </Routes>
        </Router>
    )

}
export default AppRoutes