import axios from "axios"
import { axiosConfig, API_URL } from "../utils/constants"

async function checkUser(userInfo:any, jwt) {
    axiosConfig["Authorization"] = 'Bearer $' + jwt
    console.log("AUUU")
    console.log(axiosConfig["Authorization"])
    try {
       let res = await axios({
            url: API_URL + '/check-user',
            method: 'post',
            data: userInfo,
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

export default checkUser;
