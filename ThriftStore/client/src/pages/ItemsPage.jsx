import React from "react";
import { Link, useParams } from "react-router-dom";
import { UsersListing } from "../components/UsersListing";
import { ItemsForm } from "../components/ItemsForm";

export default function ItemsPage() {
  const { action } = useParams();
//   const [addedPhotos, setAddedPhotos] = useState([]);

  return (
      <div>
      {action !== "new" && (
        <>
        <div className="flex justify-center">
        <Link
          className=" p-2 pl-4 pr-4 mt-8 border border-gray-400"
          to={"/account/items/new"}
          >
          Add New Item
        </Link>
            </div>
        {
          <UsersListing />
        }
          </>
      )}
      {action === "new" && (
        <div>
         <ItemsForm />
        </div>
      )}
    </div>
  );
}
