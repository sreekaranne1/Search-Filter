import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import ElementsList from "./ElementsList";
import NavBar from "./NavBar";
import DisplayMore from "./DisplayMore";

const Search = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [more, setMore] = useState(false);
  const [tab, setTab] = useState("");
  const [moreContent, setMoreContent] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadsearches();
  }, []);
  useEffect(() => {
    if (count) {
      setMoreContent(searchData.filter((elem) => elem.tab == tab));
    }
  }, [tab]);
  useEffect(() => {
    if (count) {
      setMore(true);
    }
  }, [moreContent]);

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
        {!more ? (
          <>
            <NavBar
              data={data}
              setData={setData}
              searchData={searchData}
              scrollWithOffset={scrollWithOffset}
            />
            <ElementsList data={data} setTab={setTab} setCount={setCount} />
          </>
        ) : (
          <DisplayMore tabData={tab} data={moreContent} setMore={setMore} />
        )}
      </div>
    </div>
  );
};

export default Search;
