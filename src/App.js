import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { HashLink as Link } from "react-router-hash-link";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    loadsearches();
  }, []);

  const loadsearches = async (value) => {
    try {
      const response = await axios.get(
        "https://win.justdial.com/api/india_api_read/20march2020/group_cat.php?city=Mumbai&wap=2&source=2&jdlite=0&pathname=/Mumbai/all-hotkeys/show-more&&version=2.5&searchReferrer=gen|hk&utmCampaign=&utm_source=&utm_medium=&enc=1"
      );

      setData(response?.data?.results?.res);
      setSearchData(response?.data?.results?.res);
    } catch (error) {}
  };

  // const searchHere = (text) => {
  //   let Matches = search.filter((search) => {
  //     const regex = new RegExp( '${text}', "gi");
  //     return search.name.match(regex);
  //   })

  //   //setSearchMatch(matches);
  // };

  const handleSearch = (e) => {
    // setSearch(value)
    // loadsearches(value)
    if (e.target.value.length !== 0) {
      const arrFinal = [];
      for (const elem of searchData) {
        if (elem.tab.toLowerCase().includes(e.target.value.toLowerCase())) {
          arrFinal.push(elem);
        } else {
          let arr = [];
          let copy = { ...elem };
          for (let i in elem.data) {
            if (
              elem.data[i].name
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            ) {
              arr.push(elem.data[i]);
            }
          }

          if (arr.length > 0) {
            copy.data = arr;
            arrFinal.push(copy);
          }
        }
      }
      setData(arrFinal);
    } else if (e.target.value.length === 0) {
      setData(searchData);
    }
    // const list = data.filter((elem)=>{
    //   if(elem.tab.toLowerCase().includes(value.toLowerCase())){
    //     return elem;
    //   }
    //   else{
    //     let arr=[];
    //     let copy = {...elem};
    //     for(let i in elem.data){
    //       if(elem.data[i].name.toLowerCase().includes(value.toLowerCase())){
    //         arr.push(elem.data[i]);
    //       }
    //     }

    //     if(arr.length>0){
    //       copy.data=arr;
    //       return {copy};
    //     }
    //   }
    // })
  };
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -165;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  return (
    <BrowserRouter>
      <div className="main">
        <div className="App">
          <h3 style={{ marginBottom: "10px", marginTop: "10px" }}>
            SEARCH BAR
          </h3>
          <div class="sb-example-1">
            <div class="search">
              <input
                type="text"
                class="searchTerm"
                placeholder="Search.."
                onChange={(e) => handleSearch(e)}
              ></input>
              <button type="submit" class="searchButton">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          {/* <input
            type="search"
            placeholder="Search.."
            onChange={(e) => handleSearch(e)}
          ></input> */}
          <div className="scrollmenu">
            {data?.length > 0 &&
              data.map((elem) => {
                return (
                  <span key={`${elem.tab}${elem.tab_ln}`}>
                    <Link
                      to={`#${elem.tab}`}
                      smooth
                      scroll={(el) => scrollWithOffset(el)}
                    >
                      {elem.tab}
                    </Link>
                  </span>
                );
              })}
          </div>
        </div>
        <div>
          <div className="container">
            {data?.length > 0 &&
              data.map((elem) => {
                return (
                  <div
                    key={`${elem.tab}${elem.tab_ln}`}
                    id={elem.tab}
                    className="wrpr"
                  >
                    <span>{elem.tab}</span>
                    <div className="wrprCnt">
                      {elem?.data?.length > 0 &&
                        elem.data.map((child) => (
                          <p key={child.name}>{child?.vname}</p>
                        ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
