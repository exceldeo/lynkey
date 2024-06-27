"use client";

import SearchBar from "@/components/SearchBar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Link } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const [error, setError] = useState<string>("");

  const [filterCategory, setFilterCategory] = useState<string>("0");

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxAyItD6xeSWmvjdYXEirqZ6krkgJVES9RyuC3Km9oOud80cHubac-YB8RHBt5umMs_/exec?path=categories"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setCategories(data.data);
          setIsLoadingCategories(false);
        });
    }
    async function fetchProducts() {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxAyItD6xeSWmvjdYXEirqZ6krkgJVES9RyuC3Km9oOud80cHubac-YB8RHBt5umMs_/exec?path=products"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setProducts(data.data);
          setFilteredProducts(data.data);
          setIsLoadingProducts(false);
        });
    }

    fetchCategories();
    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    setError("");
    if (query === "") {
      setFilteredProducts(products);
      return;
    }
    if (query.length < 3) {
      setError("Keyword must be at least 3 characters long");
      return;
    }
    const filtered = products.filter((product) =>
      product.nama_product.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    console.log(filtered);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 170;
      console.log(window.scrollY);
      setIsScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-slate-100">
      <main className="bg-white max-w-xl mx-auto dark:bg-slate-800 min-h-screen relative pt-5 px-5">
        <a
          href="https://www.instagram.com/amadeacornelia/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="grid grid-cols-4 gap-4 p-5 bg-glass backdrop-blur shadow-glass rounded-2xl">
            <div className="flex">
              <Image
                src="/image/photo_profile.jpg" // replace with your image path
                alt="Profile picture"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col col-span-3">
              <h2 className="mt-4 text-2xl font-bold">amadeacornelia</h2>
              {/* <p className="text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              bibendum, libero nec ultricies ultricies, nunc nisl aliquet justo,
              nec tincidunt purus turpis sit amet eros.
            </p> */}
            </div>
          </div>
        </a>

        <div
          className={`sticky top-0 z-10 pt-5 ${isScrolled ? "bg-white" : ""}`}
        >
          <div className="flex flex-col">
            <SearchBar onSearch={handleSearch} />
            {error && <p className="text-red-500 mt-1 px-1 text-sm">{error}</p>}
          </div>

          <div className="flex overflow-x-auto py-2 mb-4">
            {!isLoadingCategories &&
              [{ category_name: "All", ID: "0" }, ...categories].map(
                (category, idx) => (
                  <Badge
                    key={idx}
                    className="mr-2 flex whitespace-nowrap"
                    onClick={() => {
                      if ("ID" in category) {
                        setFilterCategory(category.ID);
                        if (category.ID === "0") {
                          setFilteredProducts(products);
                        } else {
                          setFilteredProducts(
                            products.filter(
                              (product) => product.category_id === category.ID
                            )
                          );
                        }
                      }
                    }}
                    variant={
                      filterCategory ===
                      (category as { category_name: string; ID: string }).ID
                        ? "defaultYellow"
                        : "outline"
                    }
                  >
                    {category.category_name}
                  </Badge>
                )
              )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 mt-5">
          {!isLoadingProducts ? (
            filteredProducts.map((product, idx) => {
              return (
                <a
                  href={product.link_product}
                  target="_blank"
                  rel="noreferrer"
                  key={idx}
                >
                  <Card className="p-3 flex flex-col space-y-1 h-80">
                    <div className="w-[100%] flex justify-center border border-red-950 overflow-hidden h-60">
                      <Image
                        src={
                          product.link_image
                            ? `https://drive.usercontent.google.com/download?id=${product.link_image
                                .replace("https://drive.google.com/file/d/", "")
                                .replace(
                                  "/view?usp=sharing",
                                  ""
                                )}&export=view&authuser=0`
                            : "/image/photo_profile.jpg"
                        } // replace with your image path
                        alt={product.nama_product}
                        width={240}
                        height={240}
                        className="max-h-60 overflow-hidden "
                      />
                    </div>
                    <CardTitle
                      className="text-lg font-semibold overflow-hidden overflow-ellipsis line-clamp-2"
                      title={product.nama_product}
                    >
                      {product.nama_product}
                    </CardTitle>
                  </Card>
                </a>
              );
            })
          ) : (
            <div className="col-span-2">
              <p className="text-center text-gray-500">Loading...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
