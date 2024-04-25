import axios from "axios";
import { useEffect, useState } from "react";
import { UseAuth } from "../../Services/AuthProvider/AuthProvider";



export const AdminPage =   () => {
    const {setToken} = UseAuth();
    
    return <>
    <p> Hello admin</p>
    <button onClick={()=>setToken()}>logout</button>
    </> 
}