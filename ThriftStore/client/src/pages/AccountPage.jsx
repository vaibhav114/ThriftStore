import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import ItemsPage from "./ItemsPage";
import OrdersPage from './OrdersPage'
import ProfilePage from "./ProfilePage";

const AccountPage = () => {
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  const { user, ready } = useContext(UserContext);
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  function linkClasses(type = null) {
    let classes = "py-2 px-6 ";
    if (type === subpage) {
      classes += "bg-green-400 rounded-full";
    }
    return classes;
  }
  return (
    <div>
      <div>
        <nav className="w-full flex justify-center gap-2 mt-8">
          <Link className={linkClasses("profile")} to={"/account"}>
            {" "}
            My Profile
          </Link>
          <Link className={linkClasses("orders")} to={"/account/orders"}>
            My Orders
          </Link>
          <Link className={linkClasses("items")} to={"/account/items"}>
            My Items{" "}
          </Link>
        </nav>
        {
            subpage==='profile' && (
               <ProfilePage />
            )
        }
        {
           subpage==="items" && (
              <ItemsPage />
            )
        }
        {
          subpage==="orders" && (
            <OrdersPage />
          )
        }
      </div>
    </div>
  );
};

export default AccountPage;
