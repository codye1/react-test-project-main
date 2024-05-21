import React from "react";
import { CSSTransition,TransitionGroup} from "react-transition-group";
import Post from "./Post";

const PostList=function({posts,title,remove}){
    if(!posts.length){
        return(
            <h1 style={{textAlign:'center'}}>Постов нет!</h1>
        )
    }
    return(
    <div>
        <h1 style={{textAlign: 'center'}}>
            {title}
        </h1>
        <TransitionGroup>
        {posts.map((post,index)=>
            <CSSTransition
            key={post.id}
            timeout={500}
            classNames='post'
            >
                <Post remove={remove} number={index + 1} post={post} />
            </CSSTransition>

        )}
        </TransitionGroup>
    </div>
    )
}

export default PostList;