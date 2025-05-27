import { FiX, FiCheckCircle } from "react-icons/fi";

const ConfirmPopUp = ({
    open,
    header = "Confirm Action",
    message = "Are you sure you want to proceed?",
    onCancel,
    onConfirm,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-[#23272f] text-white rounded-2xl shadow-2xl px-8 py-7 min-w-[340px] max-w-[90vw] text-center animate-fadeIn">
                <div className="flex flex-col items-center">
                    <FiCheckCircle className="text-4xl text-indigo-400 mb-2" />
                    <div className="text-xl font-bold mb-2 tracking-wide">{header}</div>
                </div>
                <div className="text-base mb-6 text-[#bfc9d1]">{message}</div>
                <div className="flex gap-4">
                    <button
                        className="flex-1 py-2 rounded-lg bg-[#353b48] text-[#bfc9d1] font-semibold transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-400 flex items-center justify-center gap-2"
                        onClick={onCancel}
                    >
                        <FiX className="text-lg" />
                        Cancel
                    </button>
                    <button
                        className="flex-1 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-300 text-white font-semibold transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-400 flex items-center justify-center gap-2"
                        onClick={onConfirm}
                    >
                        <FiCheckCircle className="text-lg" />
                        Confirm
                    </button>
                </div>
            </div>
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95);}
                    to { opacity: 1; transform: scale(1);}
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s;
                }
                `}
            </style>
        </div>
    );
};

export default ConfirmPopUp;
