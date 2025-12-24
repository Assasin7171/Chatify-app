import {useChatStore} from "../store/useChatStore.js";
import {useEffect} from "react";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton.jsx";
import {useAuthStore} from "../store/useAuthStore.js";

const ContactList = () => {
    const {getAllContacts, allContacts, setSelectedUser, isUserLoading} = useChatStore();
    const {onlineUsers} = useAuthStore();

    useEffect(() => {
        getAllContacts();
    }, [getAllContacts]);

    if (isUserLoading) return <UsersLoadingSkeleton/>

    return (
        <>
            {allContacts.map((chat) => (
                <div key={chat._id}
                     className={"bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"}
                     onClick={() => setSelectedUser(chat)}>
                    <div className="flex items-center gap-3">
                        <div className={`avatar ${onlineUsers.includes(chat._id) ? "online" : "offline"}`}>
                            <div className="size-12 rounded-full">
                                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName}/>
                            </div>
                        </div>
                        <h4 className={"text-slate-200 font-medium truncate"}>{chat.fullName}</h4>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ContactList;