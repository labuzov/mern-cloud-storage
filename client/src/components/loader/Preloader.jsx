import Loader from "./Loader"
import "./preloader.scss";


const Preloader = (props) => {
    return (
        <div className="preloader">
            <Loader />
        </div>
    )
}

export default Preloader