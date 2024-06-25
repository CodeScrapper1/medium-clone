import React from "react";
import SidebarStories from "./SidebarStories";
import Link from "next/link";
import Ads from "./Ads";

const Sidebar = ({ stories }: any) => {
  return (
    <div>
      <h3 className="font-semibold">Staff Picks</h3>
      <div>
        {stories?.map((story: any, index: number) => (
          <SidebarStories key={index} story={story} />
        ))}
      </div>
      <Link className="text-green-500 text-xs" href="#">
        See the full list
      </Link>
      <Ads />
    </div>
  );
};

export default Sidebar;
