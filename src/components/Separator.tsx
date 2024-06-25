import { MoreHorizontal } from "lucide-react";
import React from "react";

const Separator = () => {
  return (
    <div className="py-3 w-full">
      <div className="text-center flex items-center justify-center">
        <MoreHorizontal size={32} />
      </div>
      <p data-p--placeholder="Write a text"></p>
    </div>
  );
};

export default Separator;
