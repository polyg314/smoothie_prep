import axios from "axios"
import { axiosConfig, API_URL } from "../utils/constants"

async function checkUser(userInfo:any, jwt) {
    axiosConfig["Authorization"] = jwt

    try {
       let res = await axios({
            url: API_URL + '/check/staff_new',
            method: 'post',
            data: userInfo,
            timeout: 8000,
            headers: axiosConfig
        })
        if(res.status === 200){
            if(Object.is(res.data.permissions, null)){
                res.data.permissions = []
            }
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
