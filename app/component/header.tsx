import { SignedIn, UserButton } from "@clerk/nextjs";

export const Header = () => {
  return (
    <div className="w-full h-14 pr-10 border-b-gray-200 border ">
      <div className="flex justify-between ">
        <p className="text-[24px] font-semibold pl-6 py-2.5 text-black">
          Quiz app
        </p>
        <SignedIn>
          <UserButton />
        </SignedIn>
        {/* <button className="w-10 h-10 rounded-full bg-black pr-6 py-2 "></button> */}
      </div>
    </div>
  );
};
