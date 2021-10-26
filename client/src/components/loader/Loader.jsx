import gif from '../../images/gifs/loader.gif';

const Loader = (props) => {
    return (
        <img className={`loader ${props.optionalClass}`} 
            src={gif} alt="Loader" />
    )
}

export default Loader