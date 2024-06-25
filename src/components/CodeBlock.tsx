"use client";
import { ClipboardPaste } from "lucide-react";
import React, { useEffect, useState } from "react";
import hljs from "highlight.js";

type Props = {
  handleSave: () => void;
};

const CodeBlock = ({ handleSave }: Props) => {
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<string>("");
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setCode(e.currentTarget.value || "");
  };

  const handlePasteCode = async () => {
    try {
      const clipboardData = await navigator.clipboard.readText();
      setCode((prev) => prev + clipboardData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const highlighted = hljs.highlight(code, {
      language,
      ignoreIllegals: true,
    }).value;
    setHighlightedCode(highlighted);
    handleSave();
  }, [language, code, highlightedCode]);
  return (
    <div className="w-full">
      <div className="w-full relative bg-stone-100 rounded-sm p-5 focus:outline-none">
        <div>
          <select
            contentEditable={false}
            className="bg-gray-100 border-dotted border-2 rounded-sm p-1 text-stone-700"
            defaultValue={language}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setLanguage(e.target.value)
            }
          >
            <option value="javascript">Javascript</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="php">Php</option>
          </select>
        </div>
        <textarea
          className="focus:outline-none p-2 w-full mt-4"
          onChange={(e: any) => {
            e.preventDefault();
            handleCodeChange(e);
          }}
          onPaste={handlePasteCode}
        />
        <button
          className="absolute top-2 right-2 cursor-pointer"
          onClick={handlePasteCode}
        >
          <ClipboardPaste />
        </button>
        <div
          className={`language-${language} text-base block overflow-auto p-3 focus:outline-none`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
          style={{ whiteSpace: "pre-wrap" }}
        ></div>
      </div>
      <p data-p-placeholder="write a text"></p>
    </div>
  );
};

export default CodeBlock;
