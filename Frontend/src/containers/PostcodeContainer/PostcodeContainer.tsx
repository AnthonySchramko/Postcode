import { useEffect, useState } from "react";
import { Postcode } from "../../schema/postcode";
import { postcodeUtils } from "../../services/postcode-utils";
import Card from "../../components/Card/Card";

const PostcodeContainer = () => {
  const [postcodeList, setPostcodeList] = useState<Postcode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    postcodeUtils
      .get()
      .then((data) => {
        setPostcodeList(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id: number) => {
    try {
      setPostcodeList((prevPostcodeList) =>
        prevPostcodeList.filter((postcode) => postcode.id !== id)
      );
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
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
