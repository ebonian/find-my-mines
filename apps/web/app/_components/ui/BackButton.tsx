import { useState } from "react";
// import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";

const BackButton = () => {
    // const navigate = useNavigate();
    const [isHovered, setisHovered] = useState(false);
    // const buttonStyle = {
    //     backgroundColor: isHovered ? "#FFEDDF" : "#252525",
    //     color: isHovered ? "#0D1321" : "#FFEDDF",
    //     borderWidth: "0px",
    //     borderRadius: "3px",
    //     padding: "16px 36px 16px 36px",
    //     position: "relative",
    //     top: "0px",
    //     left: "0px",
    // };

    const handleClick = () => {
        // navigate("/");
        window.location.href = "/";
    }

    return (<>
        <button className={`border-0 rounded-[3px] px-9 py-4 relative top-0 left-0 ${ isHovered ? "text-[#0D1321] bg-[#FFEDDF]" : "text-[#FFEDDF] bg-[#252525]" }`}
        // style={buttonStyle} 
        onMouseEnter={() => setisHovered(true)}
        onMouseLeave={() => setisHovered(false)}
        onClick={handleClick}><i className="fas fa-arrow-left fa-xl"></i></button>
    </>);
}

export default BackButton