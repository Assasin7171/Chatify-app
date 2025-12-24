import {useChatStore} from "../store/useChatStore.js";
import {XIcon} from "lucide-react";
import {useEffect} from "react";
import {useAuthStore} from "../store/useAuthStore.js";

const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();

    useEffect(() => {
        function handleEscKey(e) {
            if (e.key === "Escape") setSelectedUser(null);
        }

        window.addEventListener("keydown", handleEscKey);

        return () => window.removeEventListener("keydown", handleEscKey);
    }, [setSelectedUser])

    return (
        <div
            className={"flex items-center justify-between bg-slate-900/50 border-b border-slate-700/50 max-h-[84px] px-6 flex-1"}>
            <div className={"flex items-center gap-x-3"}>
                <div className={`avatar ${onlineUsers.includes(selectedUser._id) ? "online" : "offline"}`}>
                    <div className={"w-12 rounded-full"}>
                        <img src={selectedUser.profilePic || "/avatar.png"}
                             alt={selectedUser.fullName}/>
                    </div>
                </div>

                <div>
                    <h3 className={"text-slate-200 font-medium"}>{selectedUser.fullName}</h3>
                    <p className={"text-slate-400 text-sm"}>{`${onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}`}</p>
                </div>
            </div>

            <button onClick={() => setSelectedUser(null)}>
                <XIcon className={"w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors"}/>
            </button>
        </div>
    )
}

export default ChatHeader;