//---   IMPORTS
import Axios from '../../services/api.js'
import Store from '../index.js'

//---   ACTIONS
const getAllProducts = (action) => {
    Axios.get('/products').then((res) => Store.dispatch(action(res.data))).catch(console.log)
}

const insertProduct = (product, action) => {
    Axios.post('products', product).then((res) => Store.dispatch(action(res.data))).catch(console.log)
}

const enterProduct = (action, product) => {
    Axios.put('products/' + product.id, product).then((res) => Store.dispatch(action(res.data))).catch(console.log)
}

//---   EXPORT
export { getAllProducts, insertProduct, enterProduct }