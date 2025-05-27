import { useState } from "react";
import { FaCopy } from "react-icons/fa";

function SnippetHeader({ language, onLanguageChange, snippetCode, version }) {
  // const [version, setVersion] = useState('');
  const [showCopy, setShowCopy] = useState(false);
  const onCopy = () => {
    setShowCopy(true);
    console.log(showCopy, snippetCode);
    window.navigator.clipboard.writeText(snippetCode);
    setTimeout(() => {
      setShowCopy(false);
      console.log(showCopy, snippetCode);
    }, 1000);
  };
  return (
    <div className="flex items-center justify-between bg-pink-700 text-white px-4 py-2 rounded-t-md">
      {/* Language Selector */}
      <select
        disabled
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="bg-pink-600 text-white px-2 py-1 rounded mr-4 focus:outline-none"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
      </select>

      {/* Version Input */}
      <input
        disabled
        type="text"
        value={version}
        // onChange={(e) => setVersion(e.target.value)}
        placeholder="1.0.0"
        className="bg-pink-600 text-white px-2 py-1 rounded w-24 text-sm focus:outline-none placeholder-white"
      />

      {/* Copy Button */}
      <button onClick={onCopy} className="ml-4">
        <FaCopy color={showCopy?'green':'white'}
          className={` hover:text-gray-200 `}
        />
      </button>
    </div>
  );
}

export default SnippetHeader;
