import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { get_backend } from '../service/api'
import { useAuth } from '../context/AuthContext'

import Herobg from '../components/herobg'
import { images } from '../data/images'
import "../assets/stylesheet/signinForm.css"
 
/* --- Register User --- */
const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const {
            register,
            handleSubmit,
            setError,
            formState: { errors, isSubmitting },
          } = useForm();
    
    // Submit the form
    const submited = async (data) => {
        try {
            let res = await get_backend("/api/auth/register", data);

            if (!res?.user || !res?.token) {
                throw new Error("Invalid Login response");
            }

            login(res.user, res.token) // Update auth state
            navigate("/AniTV", { replace: true }); // Enter protected app
        } catch {
            setError("root", {
                message: err.message || "Invalid credentials"
            });
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
                        <h1>Sign-Up</h1>
                        <div className="input-cont flex-center">
                            <form onSubmit={handleSubmit(submited)} action="/AniTV" method="post">
                                <input className="inputs transparent-black-bg input-size"
                                { ...register("username", {
                                    required: {
                                    value: true, 
                                    message: "Username is required!"
                                }, 
                                })} type="text" placeholder="User Name"/>
                                {errors.username && <div>{errors.username.message}</div>}
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
                        </div>
                        <div className="more-ins">
                            <div className="remember">
                                <input type="checkbox" checked/> 
                                <span>Remember Me</span>
                            </div>
                            <div className="newone">
                                <span>Have account?</span>
                                <a href="/signin"><button className="sign-up-btn">Sign-in</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}

export default Signup