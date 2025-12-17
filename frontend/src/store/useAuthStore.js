import {create} from "zustand/react";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("api/auth/check");
            set({authUser: res.data});
        } catch (err) {
            console.log("Error in authCheck: ", err);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSigningUp: true});
        try {
            //robie zapytanie do backendu i uzyskuje odpowiedź
            const res = await axiosInstance.post("/api/auth/signup", data);
            set({authUser: res.data});

            toast.success("Account created successfully!");
        } catch (err) {
            toast.error(err.response.data.message);
        } finally {
            set({isSigningUp: false});
        }
    }
}))