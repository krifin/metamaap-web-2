import { Link } from "react-router-dom";

const Login = () => {
    const googleAuth = () =>{
        window.open(
            `${process.env.REACT_APP_BACKEND_URL}/auth/google/callback`,
            //self means that opening the prompt in the same page
            "_self"
        )
    }
    return ( 
    <div className="container">
        <h1>Login form</h1>
        <div className="form_container">
            <div className="left">
                <figure>
                <img className="img" src="metaverse_world-removebg-preview.png" alt="login"></img>
                </figure>
            </div>
            <div className="right">
                <h2 className="form_heading">Members Log in</h2>
                <input type="text" className="input" placeholder="email"></input>
                <input type="passoword" className="input" placeholder="passoword"></input>
                <button className="btn">Login</button>
                <p className="text">or</p>
                <button className="google_btn" onClick={googleAuth}>
                    <figure>
                        <img src="metaverse_img-removebg-preview.png" alt="google icon"></img>
                        <span>Sign in with google</span>
                    </figure>
                </button>
                <p className="text">New here? <Link to ="/signup">Sign up</Link></p>
            </div>
        </div>
    </div> );
}
 
export default Login;