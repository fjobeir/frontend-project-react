import Menu from "../Menu/Menu"
import './Wrapper.css'

const Wrapper = ({children}) => {
    return (
        <div className="wrapper">
            <Menu />
            <div className="content">
            {children}
            </div>
        </div>
    )
}

export default Wrapper