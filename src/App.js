import AuthProvider from "./Services/AuthProvider/AuthProvider";
import Routes from "./router";
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