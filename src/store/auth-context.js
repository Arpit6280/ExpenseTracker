import React, { useState } from "react"
const AuthContext= React.createContext({
    token:'',
    login:(token)=>{}

})


export const AuthProvider= (props)=>{ 
    const [token, setToken] = useState('');

     const loginHandler=(token)=>{
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