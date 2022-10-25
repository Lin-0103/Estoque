// --- IMPORT
import { Link } from "react-router-dom";
import { Component } from "react";
import './Styles/NavBar.css'

// --- EXPORT CLASS
export default class NavBar extends Component {

    render() {
        return (
            <nav className="NavBar">
                <Link to='/' className="Link">Home</Link>
                <div className="DropDown">
                    <p id="DropButton">
                        Produtos
                    </p>
                    <div className="DropDown-Content">
                        <Link to='addProducts' className="Link">Adicionar Produto</Link>
                        <Link to='Estoque' className="Link">Estoque</Link>
                    </div>
                </div>
            </nav>
        )
    }
}