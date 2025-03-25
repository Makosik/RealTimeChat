import React from 'react';

const Pagination = ({ channelsPerPage, totalChannels, paginate }) => {

   const pageNumbers = [];

   for (let i = 1; i <= Math.ceil(totalChannels / channelsPerPage); i++) {
      pageNumbers.push(i);
   }

   return (
      <div className='paginationWrap'>
         <ul className="pagination">
            {
               pageNumbers.map(number => (
                  <li className="page-number" onClick={() => paginate(number)} key={number}>
                     {number}
                  </li>
               ))
            }
         </ul>
      </div>
   )
}

export default Pagination