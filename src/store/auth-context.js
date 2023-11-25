import React, { useState } from "react"
const AuthContext= React.createContext({
    token:'',
    login:(token)=>{}

})


export const AuthProvider= (props)=>{ 
    let initialToken = localStorage.getItem("token");
    const [token, setToken] = useState(initialToken);

     const loginHandler=(token)=>{
        localStorage.setItem("token", token);
        setToken(token)
     }

    const contextValue={
        token:token,
        login:loginHandler
    }


 return(
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
 )
}


export default AuthContext