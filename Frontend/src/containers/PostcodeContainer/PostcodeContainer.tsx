import { useEffect, useState } from "react";
import { Postcode } from "../../schema/postcode";
import { postcodeUtils } from "../../services/postcode-utils";
import Card from "../../components/Card/Card";
import SearchBar from "../../components/Search Bar/SearchBar";
import styles from "./PostcodeContainer.module.scss";
const PostcodeContainer = () => {
  const [originalPostcodeList, setOriginalPostcodeList] = useState<Postcode[]>(
    []
  );
  const [postcodeList, setPostcodeList] = useState<Postcode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    postcodeUtils
      .get()
      .then((data) => {
        setOriginalPostcodeList(data);
        setPostcodeList(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id: number) => {
    try {
      setOriginalPostcodeList((prevPostcodeList) =>
        prevPostcodeList.filter((postcode) => postcode.id !== id)
      );
      setPostcodeList((prevPostcodeList) =>
        prevPostcodeList.filter((postcode) => postcode.id !== id)
      );
    } catch (e) {
      console.error(e);
    }
  };
  const handleSearch = (
    searchTerm: string,
    stateFilter: string,
    populationSort: string
  ) => {
    let filteredResults = originalPostcodeList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.postcode.includes(searchTerm) ||
        item.lga.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (stateFilter) {
      filteredResults = filteredResults.filter(
        (item) => item.state === stateFilter
      );
    }

    if (populationSort === "ascending") {
      filteredResults.sort((a, b) => a.population - b.population);
    } else if (populationSort === "descending") {
      filteredResults.sort((a, b) => b.population - a.population);
    }

    setPostcodeList(filteredResults);
  };
  return (
    <div>
      <div className={styles.search}>
        <SearchBar onSearch={handleSearch} />
      </div>
      {loading && <p>Loading...</p>}
      <div className={styles.wrapper}>
        {postcodeList.map((postcode: Postcode) => {
          return (
            <Card
              key={postcode.id}
              postcode={postcode}
              onDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostcodeContainer;
