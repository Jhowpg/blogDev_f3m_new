import { useContext, createContext, Children } from "react"

const AuthContext = createContext()

export function AuthProvidor ({children, value}){
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthValue(){
    return useContext(AuthContext)
}