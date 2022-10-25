//---   IMPORT
import axios from "axios"

//---   CREATE
const Axios = axios.create({
    baseURL: "http://localhost:3001"
})

//--- EXPORT
export default Axios