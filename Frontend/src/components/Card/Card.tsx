import { Postcode } from "../../schema/postcode";
import { postcodeUtils } from "../../services/postcode-utils";
import { useNavigate } from "react-router-dom";

interface Props {
  postcode: Postcode;
  onDelete: (id: number) => void;
}
const Card = ({ postcode, onDelete }: Props) => {
  const navigate = useNavigate();
  const handleDelete = (id: number) => {
    try {
      postcodeUtils.deletePostcodeById(id);
      onDelete(id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div>
        <p>
          {postcode.name}, {postcode.postcode}, {postcode.state}
        </p>
        <div>{postcode.population}</div>
      </div>
      <div>
        <p onClick={() => navigate(`/${postcode.id}`)}>Edit</p>
        <p onClick={() => handleDelete(postcode.id)}>Remove</p>
      </div>
    </div>
  );
};

export default Card;
