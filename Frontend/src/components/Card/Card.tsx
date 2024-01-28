import { Postcode } from "../../schema/postcode";
import { postcodeUtils } from "../../services/postcode-utils";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.scss";
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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.container__text}>
          {postcode.name}, {postcode.postcode}, {postcode.state}
        </p>
        <p className={styles.container__subtext}>
          Population: {postcode.population}
        </p>
      </div>
      <div className={styles.wrapper__button}>
        <p
          className={styles.button}
          onClick={() => navigate(`/${postcode.id}`)}
        >
          Edit
        </p>
        <p>|</p>
        <p
          className={styles.button}
          onClick={() => {
            handleDelete(postcode.id);
          }}
        >
          Remove
        </p>
      </div>
    </div>
  );
};

export default Card;
