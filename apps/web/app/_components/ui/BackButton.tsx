import { useState } from 'react';
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
        window.location.href = '/';
    };

    return (
        <>
            <button
                className={`relative left-0 top-0 rounded-[3px] border-0 px-9 py-4 ${isHovered ? 'bg-[#FFEDDF] text-[#0D1321]' : 'bg-[#252525] text-[#FFEDDF]'}`}
                // style={buttonStyle}
                onMouseEnter={() => setisHovered(true)}
                onMouseLeave={() => setisHovered(false)}
                onClick={handleClick}
            >
                <i className='fas fa-arrow-left fa-xl'></i>
            </button>
        </>
    );
};

export default BackButton;
