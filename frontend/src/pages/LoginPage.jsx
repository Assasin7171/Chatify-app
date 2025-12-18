import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import {LoaderIcon, LockIcon, MailIcon, MessageCircle} from "lucide-react";
import {Link} from "react-router";
import {useState} from "react";
import {useAuthStore} from "../store/useAuthStore.js";

const LoginPage = () => {
    const [formData, setFormData] = useState({email: "", password: ""});
    const {login, isLoggingIn} = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    }

    return (
        <div className={"w-full flex justify-center items-center p-4 bg-slate-900"}>
            <div className={"relative w-full max-w-6xl md:h-[800px] h-[650px]"}>
                <BorderAnimatedContainer>
                    <div className={"w-full flex flex-col md:flex-row"}>
                        {/*left column */}
                        <div
                            className={"md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30"}>
                            <div className={"w-full max-w-md"}>
                                {/*Heading text*/}
                                <div className={"text-center mb-8"}>
                                    <MessageCircle className={"w-12 h-12 mx-auto text-slate-400 mb-4"}/>
                                    <h2 className={"text-2xl font-bold text-slate-200 mb-2"}>Welcome Back</h2>
                                    <p className={"text-slate-400"}>Login to access to your account</p>
                                </div>

                                {/*Form*/}
                                <form onSubmit={handleSubmit}
                                      className={"space-y-6"}>
                                    {/*email input*/}
                                    <div>
                                        <label htmlFor="" className="auth-input-label">Email</label>
                                        <div className="relative">
                                            <MailIcon className={"auth-input-icon"}/>
                                            <input type="email"
                                                   className={"input"}
                                                   placeholder={"johndoe@gmail.com"}
                                                   value={formData.email}
                                                   onChange={e => setFormData({
                                                       ...formData,
                                                       email: e.currentTarget.value
                                                   })}/>
                                        </div>
                                    </div>
                                    {/*password input*/}
                                    <div>
                                        <label htmlFor="" className="auth-input-label">Password</label>
                                        <div className="relative">
                                            <LockIcon className={"auth-input-icon"}/>
                                            <input type="password"
                                                   className={"input"}
                                                   placeholder={"Enter your password"}
                                                   value={formData.password}
                                                   onChange={e => setFormData({
                                                       ...formData,
                                                       password: e.currentTarget.value
                                                   })}/>
                                        </div>
                                    </div>
                                    {/*submit button*/}
                                    <button className={"auth-btn"}
                                            type="submit"
                                            disabled={isLoggingIn}>
                                        {isLoggingIn ? (<LoaderIcon
                                            className={"w-full h-5 animate-spin text-center"}/>) : ("Login in")}
                                    </button>
                                </form>

                                <div className={"mt-6 text-center"}>
                                    <Link to={"/signup"}
                                          className={"auth-link"}>
                                        Don't have an account? Sign up
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/*right column*/}
                        <div
                            className={"hidden md:w1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent"}>
                            <div>
                                <img src="/login.png"
                                     alt="People using mobile devices"
                                     className={"w-full h-auto object-contain"}/>
                                <div className={"mt-6 text-center"}>
                                    <h3 className={"text-xl font-medium text-cyan-400"}>Connect anytime, anywhere</h3>

                                    <div className={"mt-4 flex justify-center gap-4"}>
                                        <span className={"auth-badge"}>Free</span>
                                        <span className={"auth-badge"}>Easy Setup</span>
                                        <span className={"auth-badge"}>Private</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BorderAnimatedContainer>
            </div>
        </div>
    )
}

export default LoginPage;