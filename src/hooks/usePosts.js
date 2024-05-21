import React, { useMemo, useRef, useState } from "react";

export const useSortedPosts = (posts,sort)=>{
    const sortedPosts = useMemo(()=>{
        console.log('oprimizeido');
        if(sort){
          return [...posts].sort((a,b)=>a[sort].localeCompare(b[sort]))
      }
        return posts;

      },[sort,posts]);

    return sortedPosts;
}

export const usePosts=(posts,sort,query)=>{
    const sortedPosts = useSortedPosts(posts,sort)
    const sortedAndSearchpost=useMemo(()=>{
        return sortedPosts.filter(post=>post.title.toLowerCase().includes(query.toLowerCase()))
      },[query,sortedPosts])

      return sortedAndSearchpost;
}