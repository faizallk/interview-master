import axios from "axios";

//creating instance
export const api = axios.create({
    baseURL: "",
    withCredentials: true
})

//creating register api function

export async function register({username, email, password}){
    try{
        const response = await api.post("/api/auth/register", {username, email, password});
        return response.data;
    }catch (err){
        console.log(err)
    }
}

//login function
export async function login({email, password}){
    try{
        const response = await api.post("/api/auth/login", {email, password});
        return response.data;
    } catch (err){
        console.log(err)
    }
}

//get current user
export async function getCurrentUser(){
    const response = await api.get("/api/auth/get-me");
    return response.data;
}

//logout
export async function logout(){
    const response = await api.get("/api/auth/logout");
    return response.data;
}

//change password
export async function changePassword({oldPassword, newPassword}){
    try{
        const response = await api.patch("/api/auth/change-pass", {oldPassword, newPassword});
        return response.data;
    }catch (err){
        console.log(err)
    }
}