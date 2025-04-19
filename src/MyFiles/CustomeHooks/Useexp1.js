import {useState} from 'react';

function Useexp1 (initialState = 0){
    const [count, setCount] = useState(initialState);

    const inc = () =>{
        setCount(count + 1)
    }
    const dec = () =>{
        setCount(count - 1)
    }
    const reset = () =>{
        setCount(initialState)
    }
    return [count, inc, dec, reset]
}

export default Useexp1;