"use client";
import React, { useEffect, useRef, useState } from "react";
import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import "../lib/style.css";
import "highlight.js/styles/github.css";
import { updateStory } from "@/actions/story";
import { Code, Image, MoreHorizontal, Plus } from "lucide-react";
import { createRoot } from "react-dom/client";
import ImageComp from "./ImageComp";
import Separator from "./Separator";
import CodeBlock from "./CodeBlock";

interface Props {
  storyId: string;
  storyContent: string;
}
const NewStory = ({ storyId, storyContent }: Props) => {
  const [saving, setSaving] = useState<boolean>(false);
  const [tools, setTools] = useState<boolean>(false);
  const [buttonPosition, setButtonPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const contentEditRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  const debounceHandle = useRef(
    debounce(() => {
      handleSave();
    }, 1000)
  ).current;

  const handleSave = async () => {
    const content = contentEditRef.current?.innerHTML;
    setSaving(true);

    try {
      await updateStory(storyId, content);
    } catch (error) {
      console.log("content not save");
    }
    setSaving(false);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const editor = new MediumEditor(".editable", {
        elementsContainer: document.getElementById("container") as HTMLElement,
        toolbar: {
          buttons: [
            "bold",
            "italic",
            "underline",
            "anchor",
            "h1",
            "h2",
            "h3",
            "quote",
          ],
        },
      });
      return () => {
        editor.destroy();
      };
    }
  }, []);

  const getPosition = () => {
    let y = 0;
    const isSupport = typeof window.getSelection !== "undefined";

    if (isSupport) {
      const selection = window.getSelection() as Selection;
      if (selection?.rangeCount > 0) {
        const range = selection.getRangeAt(0).cloneRange();
        const rect = range.getClientRects()[0];
        if (rect) {
          y = rect.top + window.scrollY - 80;
        }
      }
    }
    return y;
  };
  useEffect(() => {
    const handleInput = () => {
      const y = getPosition();
      console.log(y, "y");
      setButtonPosition({ top: y, left: -50 });
      debounceHandle();
    };
    contentEditRef.current?.addEventListener("input", handleInput);
  }, []);

  const InsertImage = () => {
    fileRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTools(false);

      const imageUrl = URL.createObjectURL(file);
      if (typeof window !== "undefined") {
        const divWrapper = document.createElement("div");
        const root = createRoot(divWrapper);
        root.render(
          <ImageComp
            imageUrl={imageUrl}
            file={file}
            handleSave={debounceHandle}
          />
        );
        contentEditRef.current?.appendChild(divWrapper);
      }
    }
  };

  // insert separator
  const InsertSeparator = () => {
    setTools(false);
    if (typeof window !== "undefined") {
      const divWrapper = document.createElement("div");
      const root = createRoot(divWrapper);
      root.render(<Separator />);
      contentEditRef.current?.appendChild(divWrapper);
      handleSave();
    }
  };

  // insert code
  const InsertCode = () => {
    setTools(false);
    if (typeof window !== "undefined") {
      const divWrapper = document.createElement("div");
      const root = createRoot(divWrapper);
      root.render(<CodeBlock handleSave={debounceHandle} />);
      contentEditRef.current?.appendChild(divWrapper);
    }
  };
  return (
    <div id="container" className="max-w-6xl mx-auto relative font-mono mt-8">
      <p className="absolute -top-[72px] opacity-30">
        {saving ? "saving..." : "saved"}
      </p>
      <div
        id="editable"
        ref={contentEditRef}
        contentEditable
        suppressContentEditableWarning
        className="outline-none focus:outline-none editable max-w-7xl prose"
        style={{ whiteSpace: "pre-line" }}
      >
        {storyContent ? (
          <div dangerouslySetInnerHTML={{ __html: storyContent }}></div>
        ) : (
          <div>
            <h1
              className="font-medium"
              data-h1-placeholder="New Story Title"
            ></h1>
            <p
              className="font-medium"
              data-p-placeholder="Write your story"
            ></p>
          </div>
        )}
      </div>

      {/* // button position  */}
      <div
        className={`z-10 ${buttonPosition.top == 0 ? "hidden" : ""}`}
        style={{
          position: "absolute",
          top: buttonPosition.top,
          left: buttonPosition.left,
        }}
      >
        <button
          onClick={() => setTools(!tools)}
          id="tooltip"
          className="border-[1px] border-neutral-500 p-1 rounded-full inline-block"
        >
          <Plus
            className={`duration-300 ease-linear ${tools ? "rotate-90" : ""}`}
          />
        </button>
        <div
          className={`flex items-center space-x-4 absolute top-0 left-14 ${
            tools ? "visible" : "invisible"
          }`}
        >
          <span
            onClick={InsertImage}
            className={`border-[1.5px] border-green-500 rounded-full block p-2 ${
              tools ? "scale-100 visible" : "scale-0 invisible"
            } ease-linear duration-100 bg-white cursor-pointer`}
          >
            <Image size={25} className="opacity-60 text-green-800" />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileRef}
              onChange={handleFileChange}
            />
          </span>
          <span
            onClick={InsertSeparator}
            className={`border-[1.5px] border-green-500 rounded-full block p-2 ${
              tools ? "scale-100 visible" : "scale-0 invisible"
            } ease-linear duration-100 bg-white cursor-pointer`}
          >
            <MoreHorizontal size={25} className="opacity-60 text-green-800" />
          </span>
          <span
            onClick={InsertCode}
            className={`border-[1.5px] border-green-500 rounded-full block p-2 ${
              tools ? "scale-100 visible" : "scale-0 invisible"
            } ease-linear duration-100 bg-white cursor-pointer`}
          >
            <Code size={25} className="opacity-60 text-green-800" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewStory;
