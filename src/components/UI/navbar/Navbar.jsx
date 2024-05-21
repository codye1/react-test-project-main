import React, { useContext } from "react";
import { Link} from "react-router-dom";
import { AuthContext } from "../../../context/context";
import MyButton from "../button/MyButton";



const Navbar = () => {
    const {setIsAuth}=useContext(AuthContext)

    const logut=()=>{
        setIsAuth(false)
        localStorage.removeItem('auth')
    }
    return (
        <div className="navbar">
            <MyButton onClick={()=>logut()}>
                Выйти
            </MyButton>
        <div className="navbar__links">
            <Link to="/posts">Посты</Link>
            <Link to='/pogoda'>Погода</Link>
            <Link to='/converter'>Конвертер</Link>
        </div>
    </div>
    );
};

export default Navbar;