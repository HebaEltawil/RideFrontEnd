import Nav from 'react-bootstrap/Nav';
import { Link ,useNavigate} from 'react-router-dom';
import './NavbarStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { UseAuth } from '../../../Services/AuthProvider/AuthProvider';
import { useEffect } from 'react';
export const Navbar = () => {
    const {setToken,setRole,setEmail} = UseAuth();
    const navigate= useNavigate();

    useEffect(()=>{
        navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div>
        <Nav variant="pills" defaultActiveKey="link-0" style={{ backgroundColor: "#86dcdc" ,position:"fixed",width:"100%",top:"0",zIndex:"1",marginBottom:"5px"}} className="justify-content-start">
            <Nav.Item>
                <Nav.Link eventKey="link-0" as={Link} to="/" className='inactive'>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1" as={Link} to="/blockPage" className='inactive'>Blocks</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2" as={Link} to="/pendingPage" className='inactive'>Pending Accounts</Nav.Link>
            </Nav.Item>
            <Nav.Item className="right">
            <FontAwesomeIcon icon={faUserCircle} inverse size='lg'></FontAwesomeIcon>
            <Link className='signout'onClick={()=>{setToken();setRole();setEmail()}}>sign out</Link>
            </Nav.Item>
        </Nav>
        </div>
    );
}
