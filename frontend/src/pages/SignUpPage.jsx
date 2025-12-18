import {useState} from "react";
import {useAuthStore} from "../store/useAuthStore.js";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import {LoaderIcon, LockIcon, MailIcon, MessageCircle, User} from "lucide-react";
import {Link} from "react-router";

const SignUpPage = () => {
    const [formData, setFormData] = useState({fullName: "", email: "", password: ""});
    const {signup, isSigningUp} = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData);
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
                                    <h2 className={"text-2xl font-bold text-slate-200 mb-2"}>Create Account</h2>
                                    <p className={"text-slate-400"}>Sign up for a new account</p>
                                </div>

                                {/*Form*/}
                                <form onSubmit={handleSubmit}
                                      className={"space-y-6"}>
                                    {/*full name input*/}
                                    <div>
                                        <label htmlFor="" className="auth-input-label">Full Name</label>
                                        <div className="relative">
                                            <User className={"auth-input-icon"}/>
                                            <input type="text"
                                                   className={"input"}
                                                   placeholder={"John Doe"}
                                                   value={formData.fullName}
                                                   onChange={e => setFormData({
                                                       ...formData,
                                                       fullName: e.currentTarget.value
                                                   })}/>
                                        </div>
                                    </div>
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
                                            disabled={isSigningUp}>
                                        {isSigningUp ? (<LoaderIcon
                                            className={"w-full h-5 animate-spin text-center"}/>) : ("Create Account")}
                                    </button>
                                </form>

                                <div className={"mt-6 text-center"}>
                                    <Link to={"/login"}
                                          className={"auth-link"}>
                                        Already have an account? Login
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/*right column*/}
                        <div
                            className={"hidden md:w1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent"}>
                            <div>
                                <img src="/signup.png"
                                     alt="People using mobile devices"
                                     className={"w-full h-auto object-contain"}/>
                                <div className={"mt-6 text-center"}>
                                    <h3 className={"text-xl font-medium text-cyan-400"}>Start Your Journey Today</h3>

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

export default SignUpPage;