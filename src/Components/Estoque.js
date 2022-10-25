// --- IMPORT
import { Component } from "react";
import Store from "../store";
import { Actions } from "../store/products";
import { getAllProducts, enterProduct } from '../store/fetchActions/index'
import './Styles/Estoque.css'

// --- CLASS EXPORT
export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            Enter: {
                enterqnt: '0'
            },
            Exit: {
                exitqnt: '0'
            }
        }
    }

    //--- FUNÇÕES

    componentDidMount() {
        getAllProducts(Actions.getAllProducts)
        this.setState({ products: Store.getState().ProductReducer })
        Store.subscribe(() => { this.setState({ products: Store.getState().ProductReducer }) })
    }

    RenderProducts() {

        const { products } = this.state

        return products.map((id) => {
            return (
                <tr key={id.id}>
                    <td>{id.produto}</td>
                    <td>{id.marca}</td>
                    <td>{id.prec_comp}</td>
                    <td>{id.prec_vend}</td>
                    <td>{id.qnt}</td>
                    <td>
                        <button onClick={(e) => { this.OpenPopup(id, 'EnterPopup', e) }}>Entrada</button>
                        <button onClick={(e) => { this.OpenPopup(id, 'ExitPopup', e) }}>Saida</button>
                    </td>
                </tr>
            )
        })
    }

    OpenPopup(product, Popupid, e) {
        //--- obtem o popup a ser exbido atraves do atributo id
        const Popup = document.getElementById(Popupid)
        const wrapper = document.getElementById('popup-wrapper')

        //--- Cria um novo h2 para exibir o tipo de ação e produto a ser usado
        const newElement = document.createElement('h2')
        newElement.innerHTML = 'Nova ' + e.target.innerHTML + ' para ' + product.produto

        //---   Cria um novo botão que executara a função do Popup
        const button = document.createElement('button')
        button.innerHTML = e.target.innerHTML
        button.addEventListener('click', () => this.PopupActions(Popup.id, product))

        /*/--- Insere o h2 como primeior filho do popup e altera o display para block 
        assim o elemento sera exibido*/
        Popup.insertBefore(newElement, Popup.firstChild)
        Popup.appendChild(button)
        Popup.style.display = 'block'
        wrapper.style.display = 'block'
    }

    closePopup(e) {
        //---   O ARRAY searchID comtem o id de todos os elementos que fecham o popup apos pressionados
        const searchID = ['close', 'popup-wrapper']

        const wrapper = document.getElementById('popup-wrapper')
        /*--- A CONDIÇÃO VERIFICA SE O ID DO ELEMENTO PRESSIONADO ESTA PRESENTE NO ARRAY 
        searchID E SE O WRAPPER ESTA VISIVEL, CASO VERDADEIRO PROSEGUE COM O FECHAMENTO DO POPUP*/
        if (searchID.includes(e.target.id) && wrapper.style.display === 'block') {
            //---   ALTERA O DISPLAY DO WRAPPER PARA NONE, ASSIM ELE DEIXA DE SER VISIVEL
            wrapper.style.display = 'none'

            /*---   É NESCESSARIO TEMBÉM DEFINIR O DISPLAY DE CADA FILHO DO WRAPPER COMO NONE PARA QUE NÃO FIQUEM VISIVEIS   
             PARA QUE NÃO FIQUEM VISIVEIS QUANDO UM NOVO POPUP FOR ABERTO*/
            for (const child of wrapper.children) {
                let childElement = document.getElementById(child.id)
                /*---   TAMBEM É NECESSARIO REMOVER O COMPONENTE H2 ADICONADO NA CONSTRUÇÃO DO POPUP 
                DESSA FORMA O H2 NÃO SERÁ DUPLICADO NA ABERTURA DE UM NOVO POPUP
                A CONDIÇÃO IF VERIFICA SE O PRIMEIRO FILHO DO COMPONENTE É UM H2 E PROSEGUE COM A EXCULSÃO CASO TRUE
                DESSA FORMA OS DEMAIS COMPONENTES QUE NÃO FORAM ADICIONADOS DINAMICAMENTE NÃO SERÃO AFETADOS PELA EXCUSÃO*/
                if (childElement.firstChild.nodeName === 'H2') {
                    childElement.removeChild(childElement.firstChild)
                }

                if (childElement.lastChild.nodeName === 'BUTTON') {
                    childElement.removeChild(childElement.lastChild)
                }
                childElement.style.display = 'none'
            }
        }
    }

    PopupActions(id, product) {
        //---   Objeto que lista os ids dos Popups
        const PopUpActionTypes = {
            Entry: 'EnterPopup',
            Exit: 'ExitPopup'
        }
        switch (id) {
            case PopUpActionTypes.Entry:
                let EnterQnt = Number(product.qnt) + Number(this.state.Enter.enterqnt)
                product.qnt = EnterQnt.toString()
                enterProduct(Actions.Enter, product)
                break
            case PopUpActionTypes.Exit:
                let ExitQnt = Number(product.qnt) - Number(this.state.Exit.exitqnt)
                product.qnt = ExitQnt.toString()
                enterProduct(Actions.Exit, product)
                break
            default:
                return console.log('Popup Não Encontrado')
        }
    }

    EnterValue(e) {
        const { Enter } = this.state
        this.setState({ Enter: { ...Enter, [e.target.id]: e.target.value } })
    }
    ExitValue(e) {
        const { Exit } = this.state
        this.setState({ Exit: { ...Exit, [e.target.id]: e.target.value } })
    }

    render() {
        return (
            <div>
                <table>
                    {/* table head */}
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Marca</th>
                            <th>Preço Compra</th>
                            <th>Preço Venda</th>
                            <th>Quantidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    {/* Table Boddy */}
                    <tbody>
                        {this.RenderProducts()}
                    </tbody>
                </table >
                <div id='popup-wrapper' className="popup-wrapper" onClick={(e) => { this.closePopup(e) }}>
                    <div id="EnterPopup" className="popup">
                        <div id="close" className="popup-close">x</div>
                        <div className="popup-content">
                            <label htmlFor="enterqnt">Quantidade: </label>
                            <input id="enterqnt" type="number" defaultValue="0" onChange={(e) => { this.EnterValue(e) }}></input>
                        </div>
                    </div>
                    <div id="ExitPopup" className="popup">
                        <div id="close" className="popup-close">x</div>
                        <div className="popup-content">
                            <label htmlFor="exitqnt">Quantidade: </label>
                            <input id="exitqnt" type="number" defaultValue="0" onChange={(e) => { this.ExitValue(e) }}></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}