import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    data : JSON.parse(localStorage.getItem('data')) || null,
    isFetching : false,
    error : false
};

export const AuthContext = createContext(INITIAL_STATE);

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE);
    
    useEffect(()=>{
        localStorage.setItem("data", JSON.stringify(state.data))
      },[state.data]);   

    return (
        <AuthContext.Provider value={{data : state.data,isFetching : state.isFetching,error : state.error,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}