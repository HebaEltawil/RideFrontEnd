import {useState} from "react";
import { Link ,useNavigate} from 'react-router-dom';
import './media.css';
import './loginStyle.css';
import img from '../../../Assets/img/blue-car.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import axios from "axios";
import { UseAuth } from "../../../Services/AuthProvider/AuthProvider";
import { jwtDecode } from "jwt-decode";
import CircularProgress from '@mui/material/CircularProgress';

function decodeJWT(token) {
    try {
        
        // Decode the header and payload
        const decodedPayload = jwtDecode(token);
        return  decodedPayload ;
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
}

export const LoginPage = () => {
    const [email,setEmail1]= useState('');
    const [password,setPassword] = useState('');
    const {setToken,setEmail,setRole} = UseAuth();
    const [_is_loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const [msg,setMsg] = useState('');
    const loginReq = (d) => {setLoading(true);axios.post(process.env.REACT_APP_API+"/login",d).then((s)=>{
        const handleLogin = () => {
             const decodedToken = decodeJWT(s.data.token);
             let role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
             let email = decodedToken.email;
             if(decodedToken){
                setToken(s.data.token);
                setRole(role);
                setEmail(email);
             }
            navigate("/", { replace: true });
            setLoading(false);
        };
        setTimeout(() => {
            handleLogin();
          }, 3 * 1000);
            return;
    }).catch((e)=>{setLoading(false); if(e.response.status === 400  && e.response.data.errors){setMsg("empty fields");return;}setMsg(e.response.data)})}
    const login = (e) => {
        e.preventDefault();
        var d={
            email : email,
            password: password
        }
        loginReq(d);
    }



    return (
<body className="bodyL" style={{backgroundImage: `url(${img})`,backgroundSize: 'cover'}}>
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
                            <input type="email" className="form-control rounded-pill" placeholder="example@gmail.com" name="email"  onChange={(e)=>setEmail1(e.target.value)} />
                        </div>
                        <div className="input-group form-group mt-3">                           
                            <input type="password" className="form-control rounded-pill" placeholder="password" name="password"  onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <div className="form-group mt-4 ">
                        {(!_is_loading? <input type="submit" value="Login" className="btn login_btn" onClick={login}/>:<CircularProgress color="secondary" />)}
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