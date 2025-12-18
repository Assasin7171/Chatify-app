import {create} from "zustand/react";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled") === true,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({isSoundEnabled: !get().isSoundEnabled});
    },

    setActiveTab: (tab) => {
        set({activeTab: tab});
    },

    setSelectedUser: (user) => {
        set({selectedUser: user});
    },

    getAllContacts: async () => {
        set({isUserLoading: true});
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({allContacts: res.data});
        } catch (err) {
            toast.error(err.response.data.message);
        } finally {
            set({isUserLoading: false});
        }
    },

    getMyChatPartners: async () => {
        set({isUserLoading: true});
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({chats: res.data});
        } catch (err) {
            toast.error(err.response.data.message);
        } finally {
            set({isUserLoading: false});
        }
    },
}));