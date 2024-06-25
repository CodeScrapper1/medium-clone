"use client";
import React from "react";
import { Input } from "./ui/input";
import { Bell, SquarePen } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { CreateStory } from "@/actions/story";
import { toast } from "./ui/use-toast";

const Header = () => {
  const { data, status }: { data: any; status: string } = useSession();
  console.log(data, status, "data");

  const MakeNewStory = async () => {
    const res = await CreateStory();
    if (res.error) toast({ title: res.error });
  };
  return (
    <div className="flex items-center justify-between space-x-4 py-1 px-4">
      <div className="flex items-center gap-2">
        <Link href="/">
          <img src="/logo.png" width={50} alt="" />
        </Link>
        <Input
          className="rounded-full w-60 bg-gray-100 border-none outline-none"
          placeholder="Search"
        />
      </div>
      <div className="text-gray-400 flex items-center gap-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={MakeNewStory}
        >
          <SquarePen size={25} />
          <span>Write</span>
        </div>
        <Bell size={25} />
        <Avatar>
          {data?.user ? (
            <AvatarImage src={data?.user?.image} alt={data?.user?.name} />
          ) : (
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          )}
        </Avatar>
        {status === "authenticated" ? (
          <div
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
            className="font-semibold text-sm cursor-pointer"
          >
            Logout
          </div>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
