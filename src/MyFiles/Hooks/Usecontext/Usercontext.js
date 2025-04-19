import React from "react";

export const UserContext = React.createContext();

export const UserContextProvider = ({Children}) =>{
     return <UserContext.Provider value={'Balu Naidu'}>
        {Children}
     </UserContext.Provider>
}