import {useState} from "react";
import { Link ,useNavigate} from 'react-router-dom';
import './media.css';
import './style.css';
import img from '../../../Assets/img/blue-car.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import axios from "axios";
import { UseAuth } from "../../../Services/AuthProvider/AuthProvider";

export const LoginPage = () => {

    const [email,setEmail]= useState('');
    const [password,setPassword] = useState('');
    const {setToken} = UseAuth();
    const navigate = useNavigate();
    const [msg,setMsg] = useState('');
    const loginReq = (d) => axios.post(process.env.REACT_APP_API+"/login",d).then((s)=>{
        const handleLogin = () => {
            setToken(s.data.token);
            navigate("/", { replace: true });
        };
        
        setTimeout(() => {
            handleLogin();
          }, 3 * 1000);
            return;
    }).catch((e)=>{setMsg(e.response.data)});
    const login = (e) => {
        e.preventDefault();
        var d={
            email : email,
            password: password
        }
        loginReq(d);
    }



    return (
<body style={{backgroundImage: `url(${img})`,backgroundSize: 'cover'}}>
    <div className="container">
        <div className="d-flex justify-content-center">
            <div className="card m-auto">
                <div className="card-header text-light">
                    <h3>Sign In</h3>
                </div>
                {msg !== "" && <p style={{color:"red"}}>{msg}</p>}
                <div className="card-body">
                    <form>
                        <div className="input-group form-group mt-3">
                            <input type="email" className="form-control rounded-pill" placeholder="example@gmail.com" name="email"  onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div className="input-group form-group mt-3">                           
                            <input type="password" className="form-control rounded-pill" placeholder="password" name="password"  onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <div className="row align-items-center text-light remember mt-3">
                            <input type="checkbox"/>Remember Me
                        </div>
                        <div className="form-group mt-4 ">
                            <input type="submit" value="Login" className="btn login_btn" onClick={login}/>
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center text-light">
                        Don't have an account?<Link to={'/signup'} className="nav-link">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </body>
    );
}