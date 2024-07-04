import React from 'react'

export const AccNav = () => {
    function linkClasses(type = null) {
        let classes = "py-2 px-6 ";
        if (type === subpage) {
          classes += "bg-green-400 rounded-full";
        }
        return classes;
      }
  return (
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

    </div>
  )
}
