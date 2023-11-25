import React, { useState } from "react"
const AuthContext= React.createContext({
    token:'',
    login:(token)=>{},
    logout:()=>{},
    isLoggedIn:false

})


export const AuthProvider= (props)=>{ 
    let initialToken = localStorage.getItem("token");
    const [token, setToken] = useState(initialToken);

     const loginHandler=(token)=>{
        localStorage.setItem("token", token);
        setToken(token)
     }
     const userLoggedIn=!!token

     const logoutHandler=()=>{
       localStorage.removeItem("token")
       setToken('');
     }

    const contextValue={
        token:token,
        login:loginHandler,
        logout:logoutHandler,
        isLoggedIn:userLoggedIn
    }


 return(
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
 )
}


export default AuthContext