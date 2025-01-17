import './shimmer.css'
const Shimmer = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-72 w-full loader bg-slate-900">
        <img className="w-10 mb-6" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa" />
        <p className="text-white text-2xl">Looking for great food near you...</p>
      </div> 
      
      <div className="shimmer-container flex flex-wrap m-4 justify-center">
      {Array(20).fill("").map((_, index) => (
          <div className="bg-[#f0f0f0] w-96 h-48 rounded-md m-4 relative overflow-hidden" key={index}>
            <div className="bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 bg-[#e1dfdf] w-[26%] h-[100%] absolute animate-shimmer opacity-20"></div>
          </div>
        ))}
    </div>
    </>
  );
};
export default Shimmer;
