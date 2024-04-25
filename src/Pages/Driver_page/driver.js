import { UseAuth } from "../../Services/AuthProvider/AuthProvider";
export const DriverPage = () => {
    const {setToken} = UseAuth();
    const {setRole} = UseAuth();
    const { setEmail} = UseAuth();
    return <>
    <p> Hello Driver </p>
    <button onClick={()=>{setToken();}}>logout</button>
    </>

}