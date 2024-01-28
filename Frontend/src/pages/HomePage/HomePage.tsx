import { useNavigate } from "react-router-dom";
import PostcodeContainer from "../../containers/PostcodeContainer/PostcodeContainer";
import Header from "../../components/Header/Header";
import styles from "./HomePage.module.scss";
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header text={"Postcode list"} />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <p>Please click on "Edit" to find more details of each postcode</p>
          <button onClick={() => navigate(`/add`)}> Add postcode</button>
        </div>
        <PostcodeContainer />
      </div>
    </div>
  );
};

export default HomePage;
