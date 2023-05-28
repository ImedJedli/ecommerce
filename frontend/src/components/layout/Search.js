import React, {useState} from "react";
import '../../App.css'
import { useNavigate } from "react-router-dom";

function Search() {

      const navigate = useNavigate();

      const [keyword, setKeyword] = useState("");
      const searchHandler=(e) =>{
            e.preventDefault();

            if(keyword.trim()){
                  navigate(`/search/${keyword}`);
            }
            else {
                  navigate('/')
            }
      }
  return (
    <form onSubmit={searchHandler}>
      <div className="input-group d-flex align-items-center ">
        <input
          className="form-control"
          type="text"
          id="search_field"
          placeholder="Enter Product Name"
          
          value={keyword}
          onChange={(e)=>setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn" id="">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
}

export default Search;
