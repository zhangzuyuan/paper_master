// 用户发送请求的处理方法会在这里执行
import axios from 'axios';
// 引入设置token方法
import setAuthToken from '../utils/setAuthToken.js'
// 引入type类型
import { GET_ERRORS } from './types'

// 登录信息
export const loginUser = (userData,history) => dispatch =>{
    axios.post('/api/users/login',userData)
        .then(res =>{//对返回的token进行解构,并存储
            const {token } = res.data;
            localStorage.setItem('jwToken',token)
            //设置axios的headers token
            setAuthToken(token)
        }).catch(err =>{
        // 在登录息错误的时候用dispatch把信息返回回去
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

