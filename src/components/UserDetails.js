export const UserDetails = ({userInfo, signout}) => {
    return (
        <div>
                <div className="flex flex-col gap-2 items-center">
                    <img src={userInfo.photoURL} className="mt-10 mx-2 w-16 rounded-full" />
                    <p className="font-bold text-lg">{userInfo.displayName}</p>
                    <p className="opacity-60 text-sm">{userInfo.email}</p>
                    <button className="bg-red-500 p-2 rounded-md text-white" onClick={signout} > Logout </button>
                </div>
        </div>
    )
}