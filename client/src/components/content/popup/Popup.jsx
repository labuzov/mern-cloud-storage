import { useState } from "react";
import "./popup.scss";


const Popup = (props) => {
    const [name, setName] = useState('');

    const createDirHandler = () => {
        props.createDir(name);
        props.setPopupDisplay(false);
        setName('');
    }

    return (
        <div className={"popup" + (!props.popupDisplay ? " hidden" : "")}>
            <div className="popup__content">
                <div className="popup__title">New Folder</div>
                <button className="popup__close" onClick={() => props.setPopupDisplay(false)}>&#10006;</button>
                <input 
                type="text" 
                className="popup__input" 
                placeholder="Name..."
                value={name}
                onChange={(e) => setName(e.currentTarget.value)} />
                <div className="popup__buttons">
                    <button className="popup__cancel" onClick={() => props.setPopupDisplay(false)}>Cancel</button>
                    <button className="popup__apply" onClick={createDirHandler}>Create</button>
                </div>
            </div>
        </div>
    )
}

export default Popup