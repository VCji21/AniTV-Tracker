import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { get_backend } from '../service/api'
import { useAuth } from '../context/AuthContext'

import Herobg from '../components/herobg'
import { images } from '../data/images'
import "../assets/stylesheet/signinForm.css"
 
/* --- Login user --- */
const Signin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
      } = useForm();

    // Submit the form and login the user
    const submited = async (data) => {
        try {
            const res = await get_backend("/api/auth/login", data);

            if (!res?.user || !res?.token) {
                throw new Error("Invalid login response");
            }

            login(res.user, res.token);   // UPDATE AUTH STATE
            navigate("/AniTV", { replace: true }); // ENTER PROTECTED APP

        } catch (err) {
            setError("root", {
                message: err.message || "Invalid credentials"
            });
            alert(`${"Invalid user credential"}`);
        }
    }

  return (
    <>
        <main>
            <div className="head-container main-show">
                <Herobg />
                <a href="/" className="logo-cont">
                    <img src={images.logo} alt="AniTV Logo" className="logo" />
                </a>
                <div className=" form-container">
                    <div className="formSign flex-center">
                        <h1>Sign-in</h1>
                        <div className="input-cont flex-center">
                            <form onSubmit={handleSubmit(submited)} action="/AniTV" method="get">
                                <input className="inputs transparent-black-bg input-size" 
                                { ...register("email", {
                                    required: {
                                    value: true, 
                                    message: "Email is required!"
                                    }, 
                                })} type="email" placeholder="Email Address"/>
                                {errors.email && <div>{errors.email.message}</div>}
                                <input className="inputs transparent-black-bg input-size"
                                { ...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required!"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Password must be atleast of 6 character"
                                    }
                                })} type="password" placeholder="Password" />
                                {errors.password && <div>{errors.password.message}</div>}
                                <button className="sign-in-btn input-size" type="submit">Sign-in</button>
                            </form>
                            <a className="forget">Forgot Password?</a>
                        </div>
                        <div className="more-ins">
                            <div className="remember">
                                <input type="checkbox" checked={true}/> 
                                <span>Remember Me</span>
                            </div>
                            <div className="newone">
                                <span>New to AniTV?</span>
                                <a href="/signup"><button className="sign-up-btn">Sign-up</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}

export default Signin