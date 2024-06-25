import Link from "next/link";
import React from "react";

const Ads = () => {
  return (
    <div className="border my-10 p-4 rounded-lg bg-blue-200">
      <h3 className="text-lg font-semibold">Writing on Medium</h3>
      <ul className="space-y-2 mt-4">
        <li>
          <Link className="text-sm" href="#">
            New Writer FAQ
          </Link>
        </li>
        <li>
          <Link className="text-sm" href="#">
            Expert writing advice
          </Link>
        </li>
        <li>
          <Link className="text-sm" href="#">
            Grow your readership
          </Link>
        </li>
        <button className="mt-4 rounded-full text-xs bg-green-500 text-white p-2">
          Start writing
        </button>
      </ul>
    </div>
  );
};

export default Ads;
