import { UseAuth } from "../../Services/AuthProvider/AuthProvider";

export const PassengerPage = () => {
    const {setToken} = UseAuth();
    const {setRole} = UseAuth();
    const {setEmail} = UseAuth();
    return <>
    <p> Hello Passenger </p>
    <button onClick={()=>{setToken();}}>logout</button>
    </>
}