import { useState} from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './media.css';
import './style.css';
import img from '../../../Assets/img/blue-car.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import axios from "axios";
import { citiesMap } from "../../../data/citiesMap";

export const RegisterPage = () =>  {
const [userName, setUserName] = useState('');
const [email, setEmail] = useState('');
const [pass, setPass] = useState('');
const [passConf, setPassConf] = useState('');
const [role, setRole] = useState('Role');
const [carType, setCarType] = useState('Car Type');
const [city, setCity] = useState('City');
const [region, setRegion] = useState('Region');
const [smoker, setSmoker] = useState('');
const [gender, setGender] = useState('');
var [regions,setRegions] = useState([]);
const [msg,setMsg] = useState('');
const navigate = useNavigate();
const passengerRegister = (d) => axios.post(process.env.REACT_APP_API+"/Passanger/createPassenger",d).then(()=>{
    navigate('/login');
}).catch((e)=>{setMsg(e.response.data)});
const driverRegister = (d) => axios.post(process.env.REACT_APP_API+"/Driver/createDriver",d).then(()=>{
    navigate('/login');
}).catch((e)=>{setMsg(e.response.data)});
const singUp = (e) => {
    e.preventDefault();
    if(role === 'Passenger'){
        if( email.trim === "" || userName.trim === "" || gender.trim === "" || pass.trim === ""|| passConf.trim === ""){
            setMsg("Please fill all fields");
            return;
        }
        var p ={
            email : email,
            userName : userName,
            gender : gender,
            password : pass,
            confirmPassword : passConf
        }
        passengerRegister(p);
    }
    else if (role === 'Driver'){
        if( email.trim === "" || userName.trim === "" || gender.trim === "" || pass.trim === ""|| passConf.trim === "" || carType.trim === "" || city.trim === "" || region.trim === "" || smoker.trim === ""){
            setMsg("Please fill all fields");
            return;
        }
        var d ={
            email : email,
            userName : userName,
            gender : gender,
            carType : carType,
            city: city,
            smoking : smoker,
            region : region,
            password : pass,
            confirmPassword : passConf
        }
        driverRegister(d);
    }
};

function checkRole(){
    var cities=[];
    const regionFun =(city)=>{
        var regions2=[];
        const r = citiesMap[city].map((e)=>e["region"]);
        r.forEach(region => {
            regions2.push(<Dropdown.Item onClick={() => setRegion(region)}>{region}</Dropdown.Item>);
        })
        setRegions(regions2);
    }
    
    Object.keys(citiesMap).forEach(city => {
        cities.push(
        <Dropdown.Item onClick={() =>{setCity(city);regionFun(city)}}>{city}</Dropdown.Item>);
    });
    if(role === 'Driver'){
        return (<div style={{flexDirection:"row"}}>
            <div className="mt-3 d-flex justify-content-center">
                        <DropdownButton title={carType} style={{marginRight:5}} required>
                        <Dropdown.Item onClick={() => setCarType('SUV')}>SUV</Dropdown.Item>
                        <Dropdown.Item onClick={() => setCarType('Coupe')}>Coupe</Dropdown.Item>
                        <Dropdown.Item onClick={() => setCarType('Hatchback')}>Hatchback</Dropdown.Item>
                        <Dropdown.Item onClick={() => setCarType('Sedan')}>Sedan</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton title={city} style={{marginRight:5}} required>
                            {cities}
                        </DropdownButton>
                        <DropdownButton title={region} style={{marginRight:5}} required>
                        {regions}
                        </DropdownButton>
                        </div>
                        <div className="mt-3 d-flex ">
                            <label> Do You Smoke? </label>
                        <label className="ms-4" >Yes
                        <input className="ms-1" type="radio" name="smoker" value={smoker} onChange={() => setSmoker(true)}/></label>
                        <label className="ms-4" >No
                        <input className="ms-1" type="radio" name="smoker" value={smoker} onChange={() => setSmoker(false)}/></label>
                        </div>
                </div>
        );
    }
}

return (
    <body style={{backgroundImage: `url(${img})`,backgroundSize: 'cover'}}>
    <div className="container">
        <div className="d-flex justify-content-center h-100">
            <div className="card m-auto">
                <div className="card-header text-light">
                    <h3>Sign Up</h3>
                </div>
                {msg !== "" && <p style={{color:"red"}}>{msg}</p> }
                <div className="card-body">
                    <form onSubmit={singUp}>
                        <div className="input-group form-group mt-3">
                            <input type="text" className="form-control rounded-pill" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
                        </div>
                        <div className="input-group form-group mt-3">
                            <input type="email" className="form-control rounded-pill" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className="input-group form-group mt-3">                           
                            <input type="password" className="form-control rounded-pill" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} required minLength="8"/>
                        </div>
                        <div className="input-group form-group mt-3">                           
                            <input type="password" className="form-control rounded-pill" placeholder="Confirm Password" value={passConf} onChange={(e) => setPassConf(e.target.value)} required minLength="8"/>
                        </div>
                        <div className="mt-3 d-flex justify-content-center">
                        <label>Gender: </label>
                        <label className="ms-4">Male
                            <input className="ms-1" type="radio" value={gender} onChange={() => setGender(1)} required/>
                            </label>
                        <label className="ms-4">Female
                            <input className="ms-1" type="radio" value={gender} onChange={() => setGender(0)} required/>
                        </label>
                        </div>
                        <div className="mt-3 d-flex justify-content-center">
                        <DropdownButton title={role} required>
                        <Dropdown.Item onClick={() => setRole('Driver')}>Driver</Dropdown.Item>
                        <Dropdown.Item onClick={() => setRole('Passenger')}>Passenger</Dropdown.Item>
                        </DropdownButton> 
                        </div>
                        {checkRole()}
                        <div className="form-group mt-4 ">
                            <input type="submit" value="Register" className="btn login_btn"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
);
}
