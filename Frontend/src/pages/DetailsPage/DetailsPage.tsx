import { useEffect, useState } from "react";
import { Postcode } from "../../schema/postcode";
import { useNavigate, useParams } from "react-router-dom";
import { postcodeUtils } from "../../services/postcode-utils";
import { FormSchema } from "../../schema/form-data";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import styles from "./DetailsPage.module.scss";
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
      <Header text={"Suburb Details"} />
      <p className={styles.button} onClick={() => navigate(`/`)}>
        &lt; Back
      </p>
      <div className={styles.container}>
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
    </div>
  );
};

export default DetailsPage;
