"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Photo, Category } from "@/app/utils/interfaces";
// import { trackedFetch } from "../utils/requestTracker"; // Imports the trackedFetch function

const CACHE_KEY = "polaroidData";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const Polaroid = () => {
  const [images, setImages] = useState<Photo[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true); // To fix race conditions messing with the front page

  useEffect(() => {
    let isMounted = true; // Flag

    const fetchData = async () => {
      setIsLoading(true); // Set loading state
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data, timestamp, categoryData } = JSON.parse(cachedData);
          // Check if cache is still valid (within 5 minutes)
          if (Date.now() - timestamp < CACHE_DURATION) {
            setImages(data);
            setCategories(categoryData);
            setIsLoading(false);
            return;
          }
        }

        const [imagesResponse, categoriesResponse] = await Promise.all([
          fetch("http://localhost:3000/photos/photos", {
            headers: { Accept: "application/json" },
          }),
          fetch("http://localhost:3000/categories", {
            headers: { Accept: "application/json" },
          }),
        ]);
        /* Using trackedFetch */
        // const [imagesResponse, categoriesResponse] = await Promise.all([
        //   trackedFetch("http://localhost:3000/photos/photos", {
        //     headers: { Accept: "application/json" },
        //   }),
        //   trackedFetch("http://localhost:3000/categories", {
        //     headers: { Accept: "application/json" },
        //   }),
        // ]);

        if (!isMounted) return; // Check

        if (!imagesResponse.ok || !categoriesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [imagesData, categoriesData] = await Promise.all([
          imagesResponse.json(),
          categoriesResponse.json(),
        ]);

        if (!isMounted) return; // Check

        setImages(imagesData);
        setCategories(categoriesData);
      } catch (error) {
        if (!isMounted) return; // Check
        console.error("Error fetching data:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false); // isLoading is set to false only if the component is still mounted
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCategoryChange = async (categoryId: string) => {
    setIsLoading(true);
    try {
      let url = "http://localhost:3000/photos/photos";
      if (categoryId !== "all") {
        url = `http://localhost:3000/photos_categories/category/${categoryId}`;
      }

      const response = await fetch(url, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch photos");
      }

      const data = await response.json();
      setImages(data);
      setSelectedCategory(categoryId);
    } catch (error) {
      console.error("Error filtering photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state handling in render
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-pulse text-gray-600">Loading photos...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end px-8 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="block w-48 bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap justify-around gap-[30px] mt-5 mx-2 md:mx-8">
        {images?.map((image) => (
          <div
            key={image.id}
            className="
        p-[15px] pb-[60px] 
        shadow-[5px_15px_15px_rgb(225,225,225)] 
        h-full relative
        hover:shadow-[-5px_15px_15px_rgb(225,225,225)] 
        hover:scale-[1.1] 
        transition-all duration-500 
        after:content-[attr(polaroid-caption)] 
        after:absolute after:bottom-0 after:left-0 
        after:w-full after:text-center 
        after:p-[10px] after:text-[30px]
        after:transition-all after:opacity-50 
        after:hover:opacity-100 after:duration-1000
        mx-auto
        border border-1 border-gray-100
        "
            polaroid-caption={image.name}
          >
            <Link href={`/photo/${image.id}`}>
              <Image
                src={image.path}
                width={0}
                height={0}
                alt={image.name}
                sizes="100vw"
                className="max-w-[250px] min-w-[250px] w-auto h-auto opacity-50 hover:opacity-100 transition-all duration-500 mx-auto"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
