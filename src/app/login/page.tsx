"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Login = () => {
  const router = useRouter();
  const { status } = useSession();
  console.log(status);

  if (status === "authenticated") {
    router.push("/");
  }
  return (
    <div className="grid place-content-center h-screen bg-slate-100">
      <div className="flex flex-col justify-center gap-5 items-center h-[50vh] w-[400px] bg-white shadow-md">
        <img src="/logo.png" alt="" className="h-10 w-auto" />
        <p className="tet-md font-bold">Login into continue</p>
        <div
          className="py-1 px-26 rounded cursor-pointer flex justify-center items-center gap-2 bg-white border-[1px] border-gray-200 font-medium w-5/6"
          onClick={() => signIn("google")}
        >
          <img
            src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo.png"
            className="h-10"
            alt=""
          />
          <span>Sign in with Google</span>
        </div>
        <Link
          href="/"
          className="text-center text-xs text-blue-800 cursor-pointer underline"
        >
          Go to Home page
        </Link>
      </div>
    </div>
  );
};

export default Login;
