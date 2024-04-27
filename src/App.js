import AuthProvider from "./Services/AuthProvider/AuthProvider";
import Routes from "./router";
import { UseAuth } from "./Services/AuthProvider/AuthProvider";
import { Navbar } from "./Pages/Admin_page/Admin_Navbar/Navbar";
import {BrowserRouter as Router} from 'react-router-dom';
function App() {
// const {role} = UseAuth();
// const fun = ()=>{
//   if(role && role === "Admin"){
//     return <Navbar/>
//   }


  return <>
    <AuthProvider>
      <Routes>
      </Routes>
    </AuthProvider>
    </>
}

export default App;