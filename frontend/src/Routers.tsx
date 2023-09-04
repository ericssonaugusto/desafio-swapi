
import User from "./components/User"
import {Home} from "./components/Home"
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