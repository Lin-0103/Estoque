import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Estoque from "./Components/Estoque";
import AddProducts from './Components/addProducts'
import NavBar from "./Components/Navbar";
import Home from "./Components/Home";

function app() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route path="/Estoque" element={<Estoque />}></Route>
                <Route path="/AddProducts" element={<AddProducts />}></Route>
            </Routes>
        </Router>
    )
}

export default app