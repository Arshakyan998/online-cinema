 import React from "react";
 


export const Posts = async ({params }:any) => {
 
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${params}`);
  const data = await response.json();

  return <div>{data.title}</div>;
};

export default Posts;
