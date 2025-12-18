import {useAuthStore} from "../store/useAuthStore.js";

const ChatPage = () => {
    const {logout} = useAuthStore();

    return (
        <div className={"z-10"}>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default ChatPage;