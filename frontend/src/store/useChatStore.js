import {create} from "zustand/react";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";
import {useAuthStore} from "./useAuthStore.js";

const notificationSound = new Audio("/sounds/notification.mp3");


export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toggleSound: () => {
        const {isSoundEnabled} = get();

        localStorage.setItem("isSoundEnabled", !isSoundEnabled);
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
            toast.error(err.response?.data?.message || "Something went wrong.");
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
            toast.error(err.response?.data?.message || "Something went wrong.");
        } finally {
            set({isUserLoading: false});
        }
    },

    getMessagesByUserId: async (userId) => {
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data});
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong.");
        } finally {
            set({isMessagesLoading: false});
        }
    },

    sendMessage: async (messageData) => {
        const {selectedUser, messages} = get();
        const {authUser} = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true, //flag to identify optimistic messages
        }
        //immediately update the ui by adding the message to the list of messages
        set({messages: [...messages, optimisticMessage]});

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages: messages.concat(res.data)});
        } catch (e) {
            //remove the optimistic message from the list of messages if there was an error
            set({messages: messages});
            toast.error(e.response?.data?.message || "Something went wrong.");
        }
    },

    subscribeToMessages: () => {
        const {isSoundEnabled} = get();

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const currentMessages = get().messages;
            set({messages: [...currentMessages, newMessage]});

            if (isSoundEnabled) {
                notificationSound.currentTime = 0;
                notificationSound.play().catch((e) => console.log("Audio play failed: ", e.message));
            }
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    }
}));