import ItemList from "./ItemList"

const RestaurantCategory = ({data, showItems, setShowIndex}) => {

    const handleClick = () => {
        setShowIndex();
    }
    const arrow = showItems ? '⬆️' : '⬇️';
    return (
        <div className="w-6/12 mx-auto mt-6 flex flex-col border-solid border-black border-opacity-10 border-b-[12px]">
          <div className="flex justify-between cursor-pointer" onClick={handleClick}>
            <span className="font-bold text-lg m-2"> {data.title} ({data.itemCards.length}) </span>
            <span>{arrow}</span>
          </div>
           {showItems && <ItemList items = {data.itemCards} />} 
        </div>
    )
} 

export default RestaurantCategory