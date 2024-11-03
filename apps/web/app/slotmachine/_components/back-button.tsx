import { useState, useEffect, useRef } from 'react';
import { useRouter } from '../../../node_modules/next/navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';

type CustomBackButtonProps = {
    actionBeforeBack?: () => void;
    confirmation?: boolean;
    setShow?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomBackButton: React.FC<CustomBackButtonProps> = ({
    actionBeforeBack,
    confirmation = false,
    setShow,
}) => {
    const router = useRouter();
    const [isHovered, setisHovered] = useState(false);
    const [confirmBack, setconfirmBack] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
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

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            // If the click is outside the button, reset confirmBack to false
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setconfirmBack(false);
                if (setShow) setShow(false);
            }
        };

        // Add event listener to detect outside clicks
        document.addEventListener('mousedown', handleOutsideClick);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleClick = () => {
        if (confirmation) {
            if (!confirmBack) {
                setconfirmBack(true);
                if (actionBeforeBack) {
                    actionBeforeBack();
                }
            } else {
                router.push("/");
            }
        } else {
            if (actionBeforeBack) {
                actionBeforeBack();
            }

            router.push("/");
        }
    };

    return (
        <>
            <button
                ref={buttonRef}
                className={`relative left-0 top-0 rounded-[3px] border-0 px-9 py-4 ${isHovered ? 'bg-[#FFEDDF] text-[#0D1321]' : 'bg-[#252525] text-[#FFEDDF]'}`}
                // style={buttonStyle}
                onMouseEnter={() => setisHovered(true)}
                onMouseLeave={() => setisHovered(false)}
                onClick={handleClick}
            >
                {confirmBack ? (
                    'Are you sure?'
                ) : (
                    <i className='fas fa-arrow-left fa-xl'></i>
                )}
            </button>
        </>
    );
};

export default CustomBackButton;
