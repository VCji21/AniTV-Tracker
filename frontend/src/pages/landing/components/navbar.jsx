import { images } from "../../../data/images.js";

/* --- Navbar for landing page --- */
const Navbar = () => {
    return (
        <>
            <nav className="nav">
                <img src={images.logo} alt="AniTV Logo" className="logo" />
                <a href="/signin">
                    <button className="red-btn">
                        Sign-in
                    </button>
                </a>
            </nav>
        </>
    )
}

export default Navbar;