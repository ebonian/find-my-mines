import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
    // const navigate = useNavigate();
    const router = useRouter();
    const [isHovered, setisHovered] = useState(false);
    const [confirmBack, setconfirmBack] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

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
                router.push('/');
            }
        } else {
            if (actionBeforeBack) {
                actionBeforeBack();
            }

            router.push('/');
        }
    };

    return (
        <>
            <button
                ref={buttonRef}
                className={`relative left-0 top-0 rounded-full border-0 px-9 py-4 bg-brown text-white bg-opacity-10 ${ isHovered ? "opacity-90" : "" }`}
                // style={buttonStyle}
                onMouseEnter={() => setisHovered(true)}
                onMouseLeave={() => setisHovered(false)}
                onClick={handleClick}
            >
                {confirmBack ? (
                    'Are you sure?'
                ) : (
                    <div className='aspect-square h-full'>
                        <Image
                            src='/arrow-left.svg'
                            alt='arrow-left'
                            width={24}
                            height={24}
                            className='object-contain'
                        />
                    </div>
                )}
            </button>
        </>
    );
};

export default CustomBackButton;
