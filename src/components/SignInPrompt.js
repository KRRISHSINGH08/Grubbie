export const SignInPrompt = ({toggleSidebar, signin}) => {
    return(
        <div className="flex flex-col items-center">
            <button className="absolute right-4 top-4 font-bold text-gray-600 text-lg" onClick={toggleSidebar} > x</button>
            <h2 className="font-semibold mt-12 text-xl"> Sign in with Google </h2>
            <button className="bg-blue-500 p-2 rounded-md text-white mt-4" onClick={signin}>Sign in with Google</button>
          </div>
    )
}