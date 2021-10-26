import { useEffect } from "react";
import { connect } from "react-redux";
import { createDir, getFiles, setCurrentDir, setDirStack, setPopupDisplay } from "../../redux/reducers/fileReducer";
import SvgSelector from "../svgselector/SvgSelector";
import "./content.scss";
import File from "./file/File";
import "./files.scss";
import Popup from "./popup/Popup";


const Content = (props) => {
    useEffect(() => {
        props.getFiles(props.currentDir);
    }, [props.currentDir])

    const files = props.files.map(({_id: id, name, type, date, size}) => 
        <File id={id} name={name} type={type} date={date} size={size} key={id} />
    )

    const createDirHandler = (name) => {
        props.createDir(props.currentDir, name)
    }
    
    const backClickHandler = () => {
        const copyDirStack = [...props.dirStack];
        const backDirId = copyDirStack.pop();

        props.setDirStack(copyDirStack);
        props.setCurrentDir(backDirId);
    }

    return (
        <>
            <Popup 
            setPopupDisplay={props.setPopupDisplay} 
            popupDisplay={props.popupDisplay}
            createDir={createDirHandler} />

            <div className="content">
                <div className="container content__container">
                    <div className="content__header header">
                        <div className="header__top">
                            <div className="header__nav">
                                <button className="header__back header__btn-1" onClick={backClickHandler}>
                                    <SvgSelector id="back" />
                                    Back
                                </button>
                                <button 
                                className="header__create-div header__btn-1"
                                onClick={() => props.setPopupDisplay(true)}>
                                    New Folder
                                </button>
                            </div>
                            <div className="header__options">
                                <button className="header__sort">Sort</button>
                                <button className="header__view">View</button>
                            </div>
                        </div>
                        <div className="header__bottom">
                            <div className="header__name view-flex__name">Name</div>
                            <div className="header__date view-flex__date">Date</div>
                            <div className="header__size view-flex__size">Size</div>
                        </div>
                    </div>

                    <ul className="files">
                        {files}           
                    </ul>
                </div>
            </div>
        </>
    )
}


const mapStateToProps = (state) => ({
    currentDir: state.disk.currentDir,
    files: state.disk.files,
    popupDisplay: state.disk.popupDisplay,
    dirStack: state.disk.dirStack,
})


export default connect(mapStateToProps, {
    getFiles, createDir, setPopupDisplay,
    setCurrentDir, setDirStack
})(Content) 