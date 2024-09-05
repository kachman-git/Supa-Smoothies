"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../config/supabaseConfig";

type paramsProp = {
  params: { id: string };
};

const Update = ({ params }: paramsProp) => {
  const { id } = params;
  const [title, setTitle] = useState<string>("");
  const [method, setMethod] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setError("Please fill all filled");
      return;
    }

    if (Number(rating) > 10 || Number(rating) < 0) {
      setError("Value must be greater than 0 or lesser than 10 ");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .update([{ title, method, rating }])
      .eq("id", id)
      .select();

    if (error) {
      setError("Please fill all filled");
      return;
    }

    if (data) {
      setError("");
      router.push("/");
    }
  };

  const errorNotify = () => {
    error.length > 0
      ? toast.error(error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
      : toast.success("Sucessfully Updated", {
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

    setError("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        setError("Please fill all filled");
        return;
      }

      if (data) {
        setError("");
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="max-w-xl rounded md:max-w-2xl mx-auto mt-9 shadow bg-white p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center content-start w-full space-y-5"
      >
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="method">Method:</label>
          <textarea
            id="method"
            className="h-40"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <button
          onClick={errorNotify}
          className="py-3 bg-green-600 rounded-3xl text-white"
        >
          Update
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Update;
