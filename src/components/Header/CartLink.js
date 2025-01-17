import { Link } from "react-router";
import { CartIcon } from "./Icons";
import { useSelector } from "react-redux";

const CartLink = () => {
  const cartItems = useSelector((store) => store.cart?.items || []);
  return (
    <li className="flex items-center hover:text-orange-500">
      <CartIcon />
      <Link className="ml-1" to="/cart">Cart ({cartItems.length})</Link>
    </li>
  );
};

export default CartLink;
