import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Hero = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Tech Pack</h1>
                        <p className="mb-5"><span className="text-2xl  mb-3">A sister organization of mPair.</span> <br />Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus dolore cumque aperiam doloremque eaque, dolorum ea natus? Suscipit, hic consectetur?</p>
                        <Link to="user"><button className="btn btn-primary">All Users</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;