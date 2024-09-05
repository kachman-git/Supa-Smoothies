import Link from "next/link";
import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import { FaPenToSquare } from "react-icons/fa6";
import { Bounce, toast, ToastContainer } from "react-toastify";
import supabase from "../config/supabaseConfig";

type dataProp = {
  id: number;
  created_at: string;
  title: string;
  method: string;
  rating: string;
  onDelect: (id: number) => any;
};

const Card = (props: dataProp) => {
  const handleDelect = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", props.id)
      .select();

    if (data) {
      props.onDelect(props.id);
    }

    data &&
      toast.success("Sucessfully Delect", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
  };
  return (
    <div className="w-full p-4 hover:-translate-y-3 mt-4 transition shadow relative text-start bg-white space-y-4 rounded ">
      <h1 className="font-semibold md:text-xl">{props.title}</h1>
      <p className="text-gray-800">{props.method}</p>
      <div className="absolute -top-6 -right-3 px-4 py-2 rounded-lg text-white bg-blue-600">
        {props.rating}
      </div>
      <div className="flex flex-row space-x-4 justify-end">
        <Link href={"/" + props.id}>
          <FaPenToSquare className="text-green-500 transition hover:text-green-800 text-xl" />
        </Link>
        <FaTrashCan
          onClick={handleDelect}
          className="text-green-500 transition hover:text-green-800 cursor-pointer text-xl"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Card;
