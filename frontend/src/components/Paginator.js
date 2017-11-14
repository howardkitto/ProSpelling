import React from 'react'
import {Pagination, 
        PaginationItem,
        PaginationLink} from 'reactstrap'

        
const Paginator = (props)=>{

    let pagingArray = []
    
    for (var p=0; p<props.count/props.limit; p++){
        pagingArray.push(p)
    }

    return <div>
        <Pagination>
            {pagingArray.map((p, index)=>
                <PaginationItem key={index}>
                <PaginationLink onClick={(page, limit)=>props.onClick(p, 5)}>
                    {p}
                </PaginationLink>
            </PaginationItem>
            )}
        </Pagination>
    </div>
}

export default Paginator