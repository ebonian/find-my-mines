import Button from "../../../node_modules/react-bootstrap/esm/Button";
import { useState } from "react";
// import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";

const backHomeButton = () => {
    // const navigate = useNavigate();
    const [isHovered, setisHovered] = useState(false);
    const buttonStyle = {
        backgroundColor: isHovered ? "#FFEDDF" : "#252525",
        color: isHovered ? "#0D1321" : "#FFEDDF",
        borderWidth: "0px",
        padding: "16px 36px 16px 36px",
        position: "relative",
        top: "0px",
        left: "0px",
    };

    const handleClick = () => {
        // navigate("/");
        window.location.href = "/";
    }

    return (<>
        <Button style={buttonStyle} 
        onMouseEnter={() => setisHovered(true)}
        onMouseLeave={() => setisHovered(false)}
        onClick={handleClick}><i className="fas fa-arrow-left fa-xl"></i></Button>
    </>);
}

export default backHomeButton