import { images } from "../data/images.js"
import "./herobg.css"

const Herobg = () => {
    return (
        <>
            <div className="bg-img pos-0">
                <div className="bg-shadow pos-0" />
                <img src={images.herobg} alt="background image" />
            </div>
        </>
    )
}

export default Herobg;