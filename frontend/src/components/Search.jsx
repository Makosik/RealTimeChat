import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useClickOutside from '../hooks/useClickOutside';

const Search = ({ data, filterField }) => {

   const [search, setSearch] = useState('');
   const [filteredData, setFilteredData] = useState([]);
   const [isOpen, setOpen] = useState(false);
   const navigate = useNavigate();
   const searchRef = useRef(null)

   const sliceFiltData = filteredData.slice(0,5)


   useClickOutside(searchRef, () => {
      setOpen(false)
   })

   useEffect(() => {
      if (search !== '') {
         const filtered = data.filter(item =>
            item[filterField].toLowerCase().includes(search.toLowerCase())
         );
         setFilteredData(filtered);
         setOpen(filtered.length > 0);
      } else {
         setFilteredData([]);
         setOpen(false);
      }
   }, [search, data, filterField]);

   return (
      <div className="inputAreaWrap" >
         <input
            className='messageForm'
            type="text"
            placeholder='Поиск'
            value={search}
            onChange={(e) => {setSearch(e.target.value)}}
            onFocus={() => setOpen(sliceFiltData.length > 0)}
         />
         {isOpen &&(
         <div className={`options ${sliceFiltData.length > 0 ? "addOpt" : "noneOpt"}`} >
            <ul ref={searchRef}>
               {sliceFiltData.length > 0 ? (
                  
                  sliceFiltData.map((item) =>
                     data?.[0]?.title ? (
                        <li onClick={() => navigate(`/channel/${item.id}`)} key={item.id}>
                           {item[filterField]}
                        </li>
                     ) : data?.[0]?.name ? (
                        <li key={item.id}>{item[filterField]}</li>
                     ) : null
                  )
               ) : (
                  <li>Канал не найден</li>
               )}
            </ul>
         </div>
         )}
      </div>
   )
}

export default Search