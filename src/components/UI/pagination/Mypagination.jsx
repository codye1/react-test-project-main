import React from 'react';
import { getPagesArray } from '../../../utils/page';

const Mypagination = ({totalPages,page,changePage}) => {
    let pagesArray = getPagesArray(totalPages);
    return (
        <div className="page__wrapper">
        {pagesArray.map( p =>
            <span
            key={p}
            className={page=== p ? 'page page__current ':'page'}
            onClick={()=>{changePage(p)}}
            >{p}</span>)}
        </div>
    );
};

export default Mypagination;