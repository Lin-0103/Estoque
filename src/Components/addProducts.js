// --- IMPORT
import { Component } from "react";
import { insertProduct } from "../store/fetchActions";
import Store from "../store";
import './Styles/AddProducts.css'
import { Actions } from "../store/products";

// ---EXPORT CLASS
export default class addProducts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            produto: '',
            marca: '',
            prec_comp: '',
            prec_vend: '',
            qnt: ''
        }
    }

    checkEmptyValues() {
        var alertMessage = ''

        //---   VERIFICA TODAS AS CHAVES DO STATE DA APLICAÇÃO QUE CONTÉM OS DADOS DO PRODUTO
        for (let value in this.state) {
            //---   this.state[state] OBTÉM OS VALORES DA CHAVE 'STATE' CASO O VALOR ESTIVER VAZIO ALTERA O ALERTA SOLICITANDO O IMPUT
            if (this.state[value] === '' && value !== 'id') {
                alertMessage += 'por favor preencha ' + value + '\r\n'
                console.log(value)
            }
        }
        return alertMessage
    }

    changeStates(e) {
        const id = e.target.id
        this.setState({ [id]: e.target.value })
    }

    submitValues() {
        if (this.checkEmptyValues() === '') {
            const id = { id: Store.getState().length + 1 }
            const product = Object.assign(this.state, id)
            insertProduct(product, Actions.postAdd)
            this.cleanValues()
        }
        else {
            alert(this.checkEmptyValues())
        }
    }

    cleanValues() {
        for (let value in this.state) {
            this.setState({ [value]: '' })
        }
    }

    render() {
        return (
            <div>
                <form>
                    <div className="formdiv">
                        {/* Produto */}
                        <div>
                            <label htmlFor="produto">Produto: </label>
                            <input value={this.state.produto} type="text" id="produto" onChange={(e) => { this.changeStates(e) }}></input>
                        </div>

                        {/* Marca */}
                        <div>
                            <label htmlFor="marca">Marca: </label>
                            <input value={this.state.marca} type="text" id="marca" onChange={(e) => { this.changeStates(e) }}></input>
                        </div>
                    </div>

                    <div className="formdiv">
                        {/* preço compra */}
                        <div>
                            <label htmlFor="prec_comp">Preço compra: </label>
                            <input value={this.state.prec_comp} type='number' id="prec_comp" onChange={(e) => { this.changeStates(e) }}></input>
                        </div>

                        {/* preço venda */}
                        <div>
                            <label htmlFor="prec_vend">Preço Venda: </label>
                            <input value={this.state.prec_vend} type="number" id="prec_vend" onChange={(e) => { this.changeStates(e) }}></input>
                        </div>

                        <div>
                            <label htmlFor="qnt">Quantidade: </label>
                            <input value={this.state.qnt} type='number' id="qnt" onChange={(e) => { this.changeStates(e) }}></input>
                        </div>
                    </div>
                </form>
                <div className="ButtomDiv">
                    <button id="add" onClick={() => { this.submitValues() }}>Adicionar</button>
                    <button id="cancel" onClick={() => { this.cleanValues() }}>Cancelar</button>
                </div>
            </div>
        )
    }
}