import { useEffect, useState } from "react";
import { Postcode } from "../../schema/postcode";
import { postcodeUtils } from "../../services/postcode-utils";
import Card from "../../components/Card/Card";
import SearchBar from "../../components/Search Bar/SearchBar";

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
  const handleSearch = (searchTerm: string) => {
    const filteredResults = originalPostcodeList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.postcode.includes(searchTerm) ||
        item.lga.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPostcodeList(filteredResults);
  };
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {postcodeList.map((postcode: Postcode) => {
        return (
          <Card key={postcode.id} postcode={postcode} onDelete={handleDelete} />
        );
      })}
    </div>
  );
};

export default PostcodeContainer;
