import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import MyLoader from '../components/UI/loader/MyLoader';
import { useFetching } from '../hooks/useFetching';



const PostsIdPage = () => {
    const params = useParams()
    console.log(params);
    const [post,setPost]=useState([]);
    const [comments,setComments]=useState([])
    const [fetchPostById,load,error] = useFetching( async (id)=>{
        console.log(id);
        const response = await PostService.getById(id)
        setPost(response.data);
    })

    const [fetchComments,CommentsLoad,CommentsError] = useFetching( async (id)=>{
        console.log(id);
        const response = await PostService.getCommentsById(id)

        setComments(response.data);
    })


    useEffect(()=>{
        fetchPostById(params.id)
        fetchComments(params.id)
    },[])
    return (
        <div>
            <h1>Пост №{params.id}</h1>
            {load
                ? <MyLoader/>
                : <div>{post.id}.{post.title}</div>

                }
            <div>Коментарии</div>
            {CommentsLoad
                ? <MyLoader/>
                : <div>
                    {comments.map(comm =>
                        <div key={comm.id}  style={{marginTop: 15}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostsIdPage;