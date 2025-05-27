import { FaLaptopCode } from "react-icons/fa6";
function SpecificationCard({children,title,note}) {
    return ( 
        <div className="w-40 border-1 p-2 text-center">
            {children}
            <p className="font-semibold mt-5">{title}</p> 
            <p className="text-sm font-extralight">
                {note}
            </p>
        </div>
     );
}

export default SpecificationCard;