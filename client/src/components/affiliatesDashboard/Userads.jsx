import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
const Userads = () => {
    // ---------------allcategory--------------
    const base_url = import.meta.env.VITE_API_KEY_Base_URL;
    const [category, set_category] = useState([]);
    const get_category = () => {
      axios
        .get(`${base_url}/admin/all-ads`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.success) {
            set_category(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err.name);
        });
    };
    useEffect(() => {
      get_category();
    }, []);
  return (
    <section>
             <section className="w-full mt-[20px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                category?.map((data)=>{
                  return(
                    <NavLink to=""className="w-full bg-[#AB1E1E] p-[5px] rounded-[10px]">
                    <div className="w-full bg-[#AB1E1E] rounded-[10px]">
                      <img className='w-full rounded-[10px] h-[200px] lg:h-[250px]'     src={`${base_url}/images/${data.image}`} alt="" />
                    </div>
                    </NavLink>
                  )
                })
              }
     </section>
    </section>
  )
}

export default Userads
