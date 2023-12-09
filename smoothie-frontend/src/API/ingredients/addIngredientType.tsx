import axios from "axios"
import { axiosConfig, API_URL } from "../../utils/constants"

async function addIngredientType(ingredientTypeInfo:any, jwt) {
    axiosConfig["Authorization"] = 'Bearer $' + jwt
    try {
       let res = await axios({
            url: API_URL + '/add-ingredient-type',
            method: 'post',
            data: ingredientTypeInfo,
            timeout: 8000,
            headers: axiosConfig
        })
        if(res.status === 200){
            console.log(res)
            return res
        }    
        return "Noooo"
    }
    catch (err) {
        console.error('There was an error!', err);
        return "Noooo she errored"
    }
}

export default addIngredientType;
