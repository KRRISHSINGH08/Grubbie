import { SignInPrompt } from "./SignInPrompt"
import { UserDetails } from "./UserDetails"

export const Sidebar = ({isOpen, toggleSidebar, userInfo, signout, signin}) => {
    return (
        <>
        <div className={`z-10 fixed top-0 right-0 h-full w-[36%] bg-white text-black transform ${isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out`} >
            {userInfo ? (
            <div className="flex flex-col gap-2 items-center">
            <button className="absolute right-4 top-4 font-bold text-gray-600 text-lg" onClick={toggleSidebar} > x </button>
            <UserDetails userInfo={userInfo} signout={signout} />
            </div>
                ) : (
          <SignInPrompt toggleSidebar={toggleSidebar} signin={signin} />
             )}
        </div>
        </>
    )
}