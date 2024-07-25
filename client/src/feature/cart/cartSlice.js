import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'


const init ={
    buyer:'',
    bmail:'',
    owner:'',
    mail:'',
    products:[],
    total:0,
    amount:0
}

const getCartFromStorage = () => {
  try {
    const serializedValue = localStorage.getItem('cart');
    console.log('SER VAL', serializedValue);

    if (serializedValue === null) {
      return undefined; // Item does not exist in localStorage
    }

    // Check if serializedValue is the string "undefined"
    if (serializedValue === "undefined") {
      return undefined; // Handle the case where the stored value is "undefined"
    }

    return JSON.parse(serializedValue); // Parse the stored JSON
  } catch (error) {
    console.error('Error getting item from localStorage', error);
    return undefined; // Handle any other errors gracefully
  }
}


export const addCartItems = createAsyncThunk('cart/addCartItems', async ({payload ,token} ,thunkAPI)=>{
     thunkAPI.dispatch(addToCart(payload));
    const {cart} =  thunkAPI.getState()
    try {
      console.log("Thunk Api Data" ,cart);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const response = await axios.post('/cart/addtocart',{data:cart})
     localStorage.setItem('cart',JSON.stringify(cart))
    console.log(response.data.msg)
    return response.data
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getCartItems = createAsyncThunk('cart/getCartItems',async ({userId,token} ,thunkAPI )=>{
  try {
    console.log(token)
    // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await axios.get('/cart/getcartitems',{
      params:{buyer:userId}
    })
    console.log(response.data.data[0])
    const item = response.data.data[0]  
    localStorage.setItem('cart',JSON.stringify(item))
    return response.data.data[0]
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem' ,async({payload ,token} ,thunkAPI )=>{
  console.log("ASYNC CREMOVE CART ITEM")
  console.log("delet remove cart payload ",token)
  thunkAPI.dispatch(deleteFromCart(payload))
  const {cart} =thunkAPI.getState()
  console.log(cart.products.length)
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await axios.post('/cart/updatecartitem' ,{data:cart})
    // return {token:token ,userId:cart.owner}
    if(cart.products.length === 0)
    {
      thunkAPI.dispatch(clearCart({payload:cart.buyer ,token:token}))
    }
  } catch (error) {
    console.log(error)
  }
})

export const clearCart = createAsyncThunk('cart/clearCart',async({payload,token} ,thunkAPI) =>{
  console.log('clear cart')
  console.log(payload)
  const {cart} = thunkAPI.getState()
  thunkAPI.dispatch(clearAllItems(cart.buyer))
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response  = await axios.delete(`/cart/deletecart/${cart.buyer}`,)
  } catch (error) {
    console.log(error)
  }
})

export const bookItem = createAsyncThunk('cart/bookItem' ,async({ token} ,thunkAPI) =>{
  const {cart} = thunkAPI.getState();
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response  = await axios.post('/booking/item' ,{data:cart})
    console.log(response.status)
    if(response.status === 200)
    {
      console.log("status 200 and changing sold to true")
      const res1 = await axios.patch("/items/sold", {
               products:cart.products,
               sold: true,
            });

        if(res1.status === 200)
        {
          thunkAPI.dispatch(clearCart({payload:cart.buyer ,token:token}))
        }
    }
  } catch (error) {
    console.log(error)
  }

})

const cartSlice = createSlice({
    name:'cart',
    initialState:getCartFromStorage() || init,
    reducers:{
        addToCart:(state,action)=>{
            console.log("Add to Cart" ,action.payload)
            const newProduct = action.payload.products; 
            const isEmpty = state.products.length === 0;
            if (isEmpty) {
              state.products.push(newProduct);
              state.amount += 1;
              state.total += parseInt(newProduct.iprice);
              state.buyer = action.payload.buyer;
              state.bmail = action.payload.bmail;
              state.owner = action.payload.owner;
              state.mail = action.payload.mail;
            } else {
                state.products.push(newProduct);
                state.amount += 1;
                state.total += parseInt(newProduct.iprice);
              }
            },
          deleteFromCart:(state,action)=>{
            console.log(action.payload.itemid)
            const removeProduct= state.products.find((itm)=> itm.itemid === action.payload.itemid)
             const updatedProducts= state.products.filter((itm)=> itm.itemid != action.payload.itemid)
             const newState = {
              ...state,
              total:parseInt(state.total) - parseInt(removeProduct.iprice),
              amount:state.amount-1,
              products:updatedProducts
             }
             localStorage.setItem('cart',JSON.stringify(newState))
             console.log(newState)
             return newState
          },
          clearAllItems:(state,action)=>{
            localStorage.clear('cart')
            const newState = init
            return newState

          }
        
    },

    extraReducers:(builder) =>{
      builder.addCase(addCartItems.fulfilled ,()=>{
        console.log("Item Added ")
      }).addCase(getCartItems.fulfilled,(state,action)=>{
        return {
          ...state,
          ...action.payload
        }
      }).addCase(deleteCartItem.fulfilled ,(state,action)=>{
        console.log('cart item updated')
      }).addCase(bookItem.fulfilled,()=>{
        console.log('Item Sold')
      })
    }
})

export const {addToCart ,deleteFromCart ,clearAllItems} = cartSlice.actions
export default cartSlice.reducer