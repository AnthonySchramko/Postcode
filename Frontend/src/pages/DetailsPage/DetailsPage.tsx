import { useEffect, useState } from "react";
import { Postcode } from "../../schema/postcode";
import { useNavigate, useParams } from "react-router-dom";
import { postcodeUtils } from "../../services/postcode-utils";
import { FormSchema } from "../../schema/form-data";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";

const DetailsPage = () => {
  const [currentPostcode, setCurrentPostcode] = useState<Postcode>();
  const { id } = useParams();
  const idAsNum = id ? parseInt(id) : undefined;
  const navigate = useNavigate();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postcodeData = await postcodeUtils.getById(idAsNum);
        setCurrentPostcode(postcodeData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [idAsNum]);

  const handleUpdatePostcode = (data: FormSchema) => {
    try {
      console.log(data);
      postcodeUtils.updatePostcodeById(idAsNum, data);
    } catch (e) {
      console.error(e);
    } finally {
      navigate(`/`);
    }
  };
  return (
    <div>
      <button onClick={() => navigate(`/`)}>&lt; Back</button>
      <Header text={"Suburb Details"} />
      {currentPostcode !== undefined ? (
        <Form
          defaultValues={{
            name: currentPostcode.name,
            postcode: currentPostcode.postcode,
            state: currentPostcode.state,
            lga: currentPostcode.lga,
            population: currentPostcode.population || 0,
          }}
          onSubmit={handleUpdatePostcode}
        />
      ) : (
        <p>Loading suburb information...</p>
      )}
    </div>
  );
};

export default DetailsPage;
