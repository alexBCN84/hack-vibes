import React, { useState } from 'react';

function Pagination({totalItems, firstItemIndex, setFirstItemIndex, itemsPerPage}) {
    const PREV = 'prev', NEXT = 'next';
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.floor(totalItems / itemsPerPage) + 1;

    function paginate(direction) {
        const directionOptions = {
            next: () => {
                setFirstItemIndex(firstItemIndex + itemsPerPage);
                setCurrentPage(currentPage + 1);
            },
            prev: () => {
                setFirstItemIndex(firstItemIndex - itemsPerPage);
                setCurrentPage(currentPage - 1);
            }
        }
 
        directionOptions[direction]();
    }

    const PrevButton = () => <button onClick={() => paginate(PREV)}>Prev</button>
    const NextButton = () => <button onClick={() => paginate(NEXT)}>Next</button>

    return (
        <section>
            {
                firstItemIndex === 0 ? <NextButton/> 
                    : firstItemIndex + itemsPerPage >= totalItems ? <PrevButton />
                    : <><PrevButton /><NextButton /></>      
            }
            <div><h1>{`Page ${currentPage} of ${totalPages}`}</h1></div>
        </section>
    )
}

export default Pagination;