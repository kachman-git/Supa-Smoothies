"use client";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import supabase from "./config/supabaseConfig";

type dataProp = {
  id: number;
  created_at: string;
  title: string;
  method: string;
  rating: string;
};
export default function Home() {
  const [smoothies, setSmoothies] = useState<dataProp[] | null>();
  const [orderBy, setOrderBy] = useState<string>("created_at");

  const onDelect = (id: number) => {
    setSmoothies((preSmoothies) => {
      return preSmoothies?.filter((sm) => sm.id !== id);
    });
  };

  useEffect(() => {
    const getsmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false });

      setSmoothies(data);
    };

    getsmoothies();
  }, [orderBy]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row space-x-4 p-3">
        <button
          className="p-3 bg-green-600 text-white
        rounded-full"
          onClick={() => setOrderBy("created_at")}
        >
          created at
        </button>
        <button
          className="p-3 bg-green-600 text-white
        rounded-full"
          onClick={() => setOrderBy("title")}
        >
          title
        </button>
        <button
          className="p-3 bg-green-600 text-white
        rounded-full"
          onClick={() => setOrderBy("rating")}
        >
          rating
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {smoothies &&
          smoothies.map((sm) => (
            <Card
              key={sm.id}
              id={sm.id}
              created_at={sm.created_at}
              title={sm.title}
              method={sm.method}
              rating={sm.rating}
              onDelect={onDelect}
            />
          ))}
      </div>
    </div>
  );
}
