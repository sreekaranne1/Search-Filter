import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import ElementsList from "./ElementsList";
import NavBar from "./NavBar";

const Search = () => {
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
    <div>
      <div className="main">
        <NavBar
          data={data}
          setData={setData}
          searchData={searchData}
          scrollWithOffset={scrollWithOffset}
        />
        <ElementsList data={data} />
      </div>
    </div>
  );
};

export default Search;
