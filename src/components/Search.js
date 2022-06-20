import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";

const Search = () => {
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

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -165;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  return (
    <BrowserRouter>
      <div className="main">
        <NavBar data={data} setData={setData} searchData={searchData} scrollWithOffset={scrollWithOffset}/>
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
};

export default Search;
