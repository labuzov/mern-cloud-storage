import { connect, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../redux/reducers/fileReducer";
import SvgSelector from "../../svgselector/SvgSelector";
import "./file.scss";


const File = (props) => {
    const currentDir = useSelector(state => state.disk.currentDir)

    const openDirHandler = () => {
        if (props.type === 'dir') {
            // пушим id для навигации
            props.pushToStack(currentDir)
            props.setCurrentDir(props.id)
        }
    }

    return (
        <li className="file">
            <div className="file__name view-flex__name" onClick={openDirHandler}>
                <SvgSelector id={props.type === 'dir' ? "folder" : "file"} />
                {props.name + (props.type !== 'dir' ? `.${props.type}` : '')}
            </div>
            <div className="file__date view-flex__date">{props.date.slice(0, 10)}</div>
            <div className="file__size view-flex__size">{props.size}</div>
        </li>
    )
}

export default connect(null, {
    setCurrentDir, pushToStack
})(File)