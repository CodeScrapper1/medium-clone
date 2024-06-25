import Image from "next/image";
import React from "react";

type Props = {
  user: any;
  createdAt: Date;
};
const UserBadget = ({ user, createdAt }: Props) => {
  const calculateDaysAgo = () => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference: number =
      currentDate.getTime() - createdDate.getTime();
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  };
  return (
    <div className="px-4 text-sm">
      <div className="flex items-center space-x-3">
        <Image
          src={user?.image}
          width={32}
          height={32}
          alt="user image"
          className="rounded-full object-cover"
          priority
        />
        <div>
          <p>{user?.name}</p>
          <p className="text-xs text-slate-400">{calculateDaysAgo()}</p>
        </div>
      </div>
    </div>
  );
};

export default UserBadget;
