import axios from "axios";
import { LOGIN_FAIL , LOGIN_REQUEST , LOGIN_SUCCESS } from "../constants/userConstant"

const login = (email = "" , password = "")=>{
    async (dispatch)=>{
        try{

            console.log('hii')
            dispatch({type: LOGIN_REQUEST});
            
            const link = `http://localhost:3000/api/v1/login`

            const {data} = await axios.post(link , {email , password} , {headers : {"Content-Type": 'application/json'}})

            console.log(data)

            dispatch({type: LOGIN_SUCCESS , payload: data})

        }
        catch(err){
            dispatch({type : LOGIN_FAIL ,   payload: err.response.data.message || 'Failed to fetch products'})

        }
    }
}

export default login;
