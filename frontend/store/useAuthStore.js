import {create} from "zustand/react";

export const useAuthStore = create((set)=>({
    authUser: {name: "John", _id: 1, age: 25},
    isLoggedIn: false,
    isLoading: false,

    login: () =>{
        console.log("We just logged in");
        set({isLoggedIn: true, isLoading: true});
    }
}))