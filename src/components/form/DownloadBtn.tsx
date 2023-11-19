// DownloadButton.tsx
import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface DownloadButtonProps {
    handleCSVDownload: () => Promise<void>;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ handleCSVDownload }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        await handleCSVDownload();
        setIsLoading(false);
    };

    return (
        <button 
            className="w-[150px] outline-black hover:bg-green-400 hover:cursor-pointer hover:border-dashed p-2 bg-green-500 text-sm rounded-md text-white"
            onClick={handleClick}
            disabled={isLoading}>
            {isLoading ? <FaSpinner className="animate-spin" /> : 'Download CSV'}
        </button>
    );
};

export default DownloadButton;
