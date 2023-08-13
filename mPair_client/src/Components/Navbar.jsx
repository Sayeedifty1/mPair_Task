import { Link } from "react-router-dom";
import { useUser } from "../Providers/UserProvider";

const Navbar = () => {
    const { user ,  logout } = useUser();

//    logout function
    const signOut = () => {
       logout();
    }


    console.log(user)
    return (
        <div>
            <div className="navbar fixed w-full  opacity-60 bg-black z-10  text-white">
                <div className="flex-1">
                    <a href="/" className="btn btn-ghost normal-case text-xl">Tech Pack</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 gap-10">
                        {user ? <><li>{user.name}</li> <button onClick={signOut}>Logout</button> </> :

                            <Link to='/login'><button>Login</button></Link>
                        }


                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;