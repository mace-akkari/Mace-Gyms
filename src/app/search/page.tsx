'use client'

import { FormEvent } from "react";

export default function Search() {

const submitHandler = (e:FormEvent) => {
  e.preventDefault();
  console.log("hello")
}

  return (
    <>
    <h2>Search</h2>
    <form onSubmit={submitHandler}>
      <input type="search" placeholder="Search" className="border border-sky-500"></input>
      <button>Search</button>
    </form>
    <output>output:</output>
    </>
  );
}

// colour scheme
// display fake api and apply styling 
// route handler in Next.js to display jason