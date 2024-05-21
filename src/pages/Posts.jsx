import React, {useEffect, useRef, useState} from 'react';
import PostService from "../API/PostService";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/page";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import MyModal from "../components/UI/modal/MyModal";
import MyFilter from "../components/UI/Filter/MyFilter";
import PostList from "../components/PostList";
import MyLoader from "../components/UI/loader/MyLoader";

import MySelect from "../components/UI/select/MySelect";
import Mypagination from '../components/UI/pagination/Mypagination';
import { getPagesArray} from '../utils/page';
import { useObserver } from '../hooks/useObserver';



function Posts() {
  const [posts,setPosts]= useState([])
  const [filter,setFilter]=useState({sort:'',query:''});
  const [modal,setModal]=useState(false);
  const [totalPages,setTotalPages]=useState(0);
  const [limit,setLimit]=useState(10);
  const [page,setPage]=useState(1);
  const sortedAndSearchpost = usePosts(posts,filter.sort,filter.query);
  let pagesArray = getPagesArray(totalPages)
  const lastElement=useRef()


  const [fetchPosts,postload,postError] = useFetching(async()=>{
    const response = await PostService.getAll(limit,page);
    setPosts([...posts,...response.data])
    const totalCount = (response.headers['x-total-count'])
    setTotalPages(getPageCount(totalCount,limit))
  })

  useObserver(lastElement,page<totalPages,postload,()=>{
    setPage(page + 1)
  })

  useEffect(()=>{
    fetchPosts(limit,page)
  },[page,limit])


  const createPost=(newPost)=>{
    setPosts([...posts,newPost])
    setModal(false)
  }


  const removePost=(post) =>{
    setPosts(posts.filter(p=>p.id !== post.id))
  }

  const changePage=(page)=>{
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton onClick={fetchPosts} >Загрузить посты</MyButton>
      <MyButton style={{marginTop: '50px'}} onClick={()=>setModal(true)}>Создать Пост</MyButton>
      <MyModal visible={modal} setVisible={setModal} ><PostForm create={createPost}/></MyModal>

      <hr style={{margin:'15px'}}/>
      <MyFilter filter={filter} setFilter={setFilter}/>
      <MySelect
        value={limit}
        onChange={value=>setLimit(value)}
        defaultValue='Кол-во элементов на странице'
        option={[
          {value: 5,name:'5'},
          {value: 10,name:'10'},
          {value: 20,name:'20'},
          {value: -1,name:'Показать все посты'},
        ]}
      />
      {postError && <h1>Ошибка {postError}</h1>}
      <PostList remove={removePost} posts={sortedAndSearchpost} title= "Список 1" />
      <div ref={lastElement} style={{height:20,background:'red'}}> </div>
      {postload && <div style={{display: 'flex',justifyContent:'center',marginTop:'50px'}}><MyLoader/></div>}

      <Mypagination page={page} changePage={changePage} totalPages={totalPages}/>
    </div>
  );
}
export default Posts;
