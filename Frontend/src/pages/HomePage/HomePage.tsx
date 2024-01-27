import { useNavigate } from "react-router-dom";
import PostcodeContainer from "../../containers/PostcodeContainer/PostcodeContainer";
import Header from "../../components/Header/Header";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <Header text={"Postcode list"} />
        <div>
          <div>
            <p>Please click on "Edit" to find more details of each postcode</p>
            <button onClick={() => navigate(`/add`)}> Add postcode</button>
          </div>
          <PostcodeContainer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
