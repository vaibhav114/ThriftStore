import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export const ItemsForm = () => {
  const { id } = useParams();
  const [category, setCategory] = useState("upper");
  const [gender,setGender] = useState('male');
  const navigate = useNavigate();
  //   const [addedPhotos, setAddedPhotos] = useState([]);
  const [updateItem, setUpdateItem] = useState({});
  const { user } = useContext(UserContext);
  const [items, setItems] = useState({
    icategory: "upper",
    iname: "",
    imrp: "",
    isize: "",
    imaterial: "",
    icondition: "",
    prop1: "",
    prop2: "",
    prop3: "",
    prop4: "",
    prop5: "",
    photos: [],
    gender:"male",
    itype:""
  });

                                                                                
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }
      try {
        axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
        const response = await axios.get(`/items/getsingleitem/${id}`);
        const { _id, owner, createdAt, updatedAt, ...itemsData } =
          response.data;
        setItems({
          ...itemsData,
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id, user?.token]);

  const handleChange = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
    setItems({ ...items, icategory: e.target.value });
  };
  const handleGender = (e) => {
    setGender(e.target.value);
    setItems({ ...items, gender: e.target.value });
  };

  const uploadPhoto = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/uploads", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        console.log(filenames);
        setItems((prevItems) => ({
          ...prevItems,
          photos: [...prevItems.photos, ...filenames],
        }));
      });
  };

  const deletePhoto = (filename) => {
    setItems((prevItems) => ({
      ...prevItems,
      photos: prevItems.photos.filter((item) => item !== filename),
    }));
  };

  const starPhoto =(e,filename)=>{
    e.preventDefault()
    setItems((prevItems)=>({
      ...prevItems,
      photos:[filename ,...prevItems.photos.filter((item) => item !== filename)]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
    if (id) {
      try {
        await axios.patch(`/items/update/${id}`, items);
      } catch (error) {
        console.log(error);
        alert(error.response.data.msg)
      }
    } else {
      try {
        await axios.post("/items/add", items);
      } catch (error) {
        console.log(error);
        alert(error.response.data.msg)
      }
    }

    setItems({
      icategory: "upper",
      iname: "",
      imrp: "",
      isize: "",
      imaterial: "",
      icondition: "",
      prop1: "",
      prop2: "",
      prop3: "",
      prop4: "",
      prop5: "",
      photos: [],
      gender:"male",
      itype:""
    });
    navigate("/account/items");
  };
  return (
    <div>
      <h1 className="flex justify-center w-full mt-14 text-2xl font-bold mb-4">Create Your Listing</h1>
      <div className="m-20 ml-40 mr-40 border border-r-gray-300 p-10 ">
  
      <div className=" flex items-center gap-10">

        <div>
        <label htmlFor="icategory" className="text-lg font-semibold">Category : </label>
        <select name="icategory" id="icategory" onChange={handleCategory} className="p-2 cursor-pointer">
          <option value="upper" className="p-2">Upper Garment</option>
          <option value="lower">Lower Garment</option>
        </select>
        </div>

        <div>
        <label htmlFor="iname" className="text-lg font-semibold">Gender : </label>
            <select 
            name="gender"
            id="gender"
            onChange={handleGender}
            value={items.gender}
            className="cursor-pointer"
            >
            <option value="null">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
              </div>

      </div>

      <div>

        <form onSubmit={handleSubmit}>

        <div className="flex gap-16 mt-6 items-center" >
          
          <div>

         <label htmlFor="isize" className="text-lg font-semibold">Type : </label>
          <select
            name="itype"
            id="itype"
            onChange={handleChange}
            value={items.itype}
            className="cursor-pointer p-2"
          >
          {
            gender==="male" && category ==="upper" && (
              <>
             <option value="TSHIRT">T-Shirts</option>
            <option value="SHIRT">Shirts</option>
            <option value="SWEATSHIRT">Sweatshirt</option>
            <option value="JACKET">Jacket</option>
              </>
            )     }

            {
              (gender==="male" || gender==="female") && category ==="lower" && (
                <>
               <option value="TROUSERS">Trousers</option>
              <option value="JEANS">Jeans</option>
              <option value="SHORTS">Shorts</option>
                </>
              )  
            }
                        {
              gender==="female" && category ==="upper" && (
                <>
                  <option value="TOPS">Tops</option>
              <option value="DRESSES">Dresses</option>
              <option value="BLOUSES">Blouses</option>
                </>
              )  
            }
          
          </select>

          </div>

            <div>

          <label htmlFor="iname" className="text-lg font-semibold mr-4">Name : </label>
          <input
            type="text"
            name="iname"
            id="iname"
            onChange={handleChange}
            value={items.iname}
            placeholder="Item Name"
            className="border border-gray-300 p-2"
          />
                      </div>
<div>
            
          <label htmlFor="imrp" className="text-lg font-semibold mr-4">MRP : </label>
          <input
            type="text"
            name="imrp"
            id="imrp"
            onChange={handleChange}
            value={items.imrp}
            className="border border-gray-300 p-2"
            placeholder="Item Price"

          />
</div>

</div>

          <div className=" flex gap-16 mt-6 items-center">
          <div>

          <label htmlFor="isize" className="text-lg font-bold">Size : </label>
          <select
            name="isize"
            id="isize"
            onChange={handleChange}
            value={items.isize}
            className="p-2 cursor-pointer"
            >
            <option value="null">Select Size</option>
            <option value="LG">Large</option>
            <option value="MD">Medium</option>
            <option value="SM">Small</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
            </div>


            <div>

          <label htmlFor="imaterial" className="text-lg font-bold">Item Material : </label>
          <select
            name="imaterial"
            id="imaterial"
            onChange={handleChange}
            value={items.imaterial}
            className="cursor-pointer ml-4"
          >
            <option value="null">Select Material</option>
            <option value="COTTON">Cotton</option>
            <option value="SILK">Silk</option>
            <option value="NYLON">Nylon</option>
            <option value="OTHER">Other</option>
          </select>
          </div>

          <div>

          <label htmlFor="icondition" className="text-lg font-bold">Item Condition : </label>
          <select
            name="icondition"
            id="icondition"
            onChange={handleChange}
            value={items.icondition}
            className="cursor-pointer ml-4"
          >
            <option value="null">Select Condition</option>
            <option value="BRAND-NEW">Brand New</option>
            <option value="YEAR-OLD">A Year Old</option>
            <option value="COLOR-ISSUES">Color Issues </option>
          </select>
          
          </div>

          </div>

          <h2 className="text-xl font-bold tracking-wider mt-6 ">Upload Photos</h2>
          <h5 className="mb-6">more==better</h5>
          <div className="mt-2 grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-6 ">
            {items.photos.length > 0 &&
              items.photos.map((link) => (
                <div className="h-32 flex relative" key={link}>
                  <img
                    className="rounded-2xl w-full object-cover"
                    alt="img not found"
                    src={"http://localhost:5000/" + link}
                  />
                  <button 
                    onClick={() => deletePhoto(link)}
                    className="absolute bottom-1 right-1 text-white bg-black py-1 px-3 rounded-2xl bg-opacity-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => starPhoto( e,link)}
                    className="absolute bottom-1 left-1 text-white bg-black py-1 px-3 rounded-2xl bg-opacity-50"
                  >
                    {items.photos[0] === link && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {items.photos[0] !== link && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              ))}

            <label className="h-32 cursor-pointer border bg-transparent rounded-2xl p-8 text-2xl text-gray-500">
              <div className="flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
</svg>
Upload
              </div>
              <input
                type="file"
                multiple
                name="ifile"
                id="ifile"
                className="hidden"
                onChange={uploadPhoto}
              />
            </label>
          </div>
          <h3 className="mt-6 text-lg  font-bold">Measurements : </h3>

          <div className="flex items-center mt-6 gap-16">

            <div>
          <label htmlFor="prop1" className="text-lg font-bold">
            {category === "upper" ? "Shoulder : " : "Waist  : "}{" "}
          </label>
          <input
            type="text"
            name="prop1"
            id="prop1"
            onChange={handleChange}
            value={items.prop1}
            placeholder="Shoulder Length"
            className="border border-gray-300 ml-4 p-2"
            />
            </div>

            <div>
          <label htmlFor="prop2" className="text-lg font-bold">
            {category === "upper" ? "Sleeve Length : " : "Hip  : "}
          </label>
          <input
            type="text"
            name="prop2"
            id="prop2"
            onChange={handleChange}
            value={items.prop2}
            className="border border-gray-300 ml-4 p-2"
            placeholder="Sleeve Length"
            />
            </div>

</div>

<div className="flex items-center mt-6 gap-16">

<div>
          <label htmlFor="prop3"  className="text-lg font-bold">
            {category === "upper" ? "Chest : " : "Rise  : "}{" "}
          </label>
          <input
            type="text"
            name="prop3"
            id="prop3"
            onChange={handleChange}
            placeholder=  {category === "upper" ? "Chest " : "Rise  "}
            value={items.prop3}
            className="border border-gray-300 ml-11 p-2"
            />
            </div>
<div>

          <label htmlFor="prop4"  className="text-lg font-bold">
            {category === "upper" ? "Waist : " : "Length  : "}
          </label>
          <input
            type="text"
            name="prop4"
            id="prop4"
            onChange={handleChange}
            value={items.prop4}
            className="border border-gray-300 ml-20 p-2"
            placeholder= {category === "upper" ? "Waist " : "Length  "}
            />
            </div>
    
    </div>
          <div className="mt-6">
          <label htmlFor="prop5" className="text-lg font-bold">
            {category === "upper" ? "Length : " : "Thigh Round  : "}{" "}
          </label>
          <input
            type="text"
            name="prop5"
            id="prop5"
            onChange={handleChange}
            value={items.prop5}
            className="border border-gray-300 ml-8 p-2"
            placeholder= {category === "upper" ? "Length " : "Thigh Round"}
            />
            </div>
            <div className="mt-6 flex justify-center">
          <input type="submit" name="submit" id="submit"  className="border p-2 pl-6 pr-6 border-gray-400 bg-green-400 cursor-pointer"/>
            </div>
        </form>
      </div>
      </div>
    </div>
  );
};
