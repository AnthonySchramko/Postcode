import { useNavigate } from "react-router-dom";
import { postcodeUtils } from "../../services/postcode-utils";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import { FormSchema } from "../../schema/form-data";
import styles from "./CreatePage.module.scss";
const CreatePage = () => {
  const navigate = useNavigate();
  const handleCreatePostcode = (data: FormSchema) => {
    try {
      postcodeUtils.createPostcode(data);
      navigate("/");
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <div>
        <Header text={"Suburb Information"} />

        <p className={styles.button} onClick={() => navigate(`/`)}>
          &lt; Back
        </p>
      </div>
      <div className={styles.container}>
        <Form
          defaultValues={{
            name: "",
            postcode: "",
            lga: "",
            state: "",
            population: 0,
          }}
          onSubmit={handleCreatePostcode}
        />
      </div>
    </div>
  );
};

export default CreatePage;
