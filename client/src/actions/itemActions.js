import axios from 'axios';
import {GET_ITEMS,ADD_ITEM,DELETE_ITEM, ITEMS_LOADING} from './types';
import {tokenConfig} from './authAction';
import{returnErrors} from './errorAction';
 export const getItems = ({userId}) => dispatch =>{
    
    dispatch(setItemsLoading());
    axios
    .get(`/api/items/${userId}`)
    .then(res => 
        dispatch({
        type:GET_ITEMS,
        payload:res.data
    })
    ).catch(err=>dispatch(returnErrors(err.response.data,err.response.status)))
};
export const deleteItem=({userId,name})=>(dispatch,getState) =>{
    const body = JSON.stringify({ name });
    const data={
        userId:userId
    }
axios.post(`/api/items/del/${userId}`,body,tokenConfig(getState)).then(res=> dispatch(
    getItems(data)
))
}

export const addItem=({name,userId})=>(dispatch,getState)=>{
  
    const data={
        userId:userId
    }
    const body = JSON.stringify({ name });
    axios.post(`/api/items/${userId}`,body,tokenConfig(getState)).then((res=> dispatch(
        getItems(data)
    )))}
       

export const setItemsLoading=()=>{
    return{
        type:ITEMS_LOADING
    }
}