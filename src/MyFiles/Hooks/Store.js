import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../Hooks/Redux/CounterSlice';
import userSlice from '../Hooks/Redux/UserSlice';
import addSlice from '../Hooks/Redux/CartSlice';
import ProductsSlice from "../Hooks/Redux/ProducsSlice";
import MultiProductSlice from "../Hooks/Redux/MultiProductSlice";
import MultiCartSlice  from '../Hooks/Redux/MultiCartSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    newUser: userSlice,
    cart: addSlice,
    products: ProductsSlice,
    newProduct:MultiProductSlice,
    multicart:MultiCartSlice
  },
})