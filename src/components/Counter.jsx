import React, {useState} from "react";

const Counter = function (){
    const [likes, setLikes] = useState(0)

    function plus() {
        setLikes(likes + 1)
      }
    function minus() {
        setLikes(likes - 1)
      }

    return(
        <div>
            <button onClick={plus}>Вхуи</button>
            <button onClick={minus}>Трихуи</button>
            <h1>{likes}</h1>
        </div>
    )
}

export default Counter;