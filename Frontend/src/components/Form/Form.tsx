import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postcodeSchema } from "../../schema/form-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../../schema/form-data";
import styles from "./Form.module.scss";
interface FormProps {
  defaultValues: FormSchema;
  onSubmit: SubmitHandler<FormSchema>;
}
const Form = ({ defaultValues, onSubmit }: FormProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postcodeSchema),
    defaultValues,
  });
  const formSubmit = (data: FormSchema) => {
    onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit(formSubmit)} className={styles.container}>
      <h2>Suburb details</h2>
      <div className={styles.container__input}>
        <label>Suburb name</label>
        <div className={styles.wrapper}>
          <input {...register("name")} className={styles.input} />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>
      </div>
      <div>
        <label>Postcode</label>
        <div className={styles.wrapper}>
          <input {...register("postcode")} className={styles.input} />
          {errors.postcode && (
            <span className={styles.error}>{errors.postcode.message}</span>
          )}
        </div>
      </div>
      <div className={styles.container__input}>
        <label>State</label>
        <div className={styles.wrapper}>
          <select {...register("state")} className={styles.input}>
            <option value="NSW">NSW</option>
            <option value="VIC">VIC</option>
            <option value="QLD">QLD</option>
            <option value="NT">NT</option>
            <option value="SA">SA</option>
            <option value="WA">WA</option>
            <option value="TAS">TAS</option>
          </select>
          {errors.state && (
            <span className={styles.error}>{errors.state.message}</span>
          )}
        </div>
      </div>
      <div className={styles.container__input}>
        <label>Local Government</label>
        <div className={styles.wrapper}>
          <input {...register("lga")} className={styles.input} />
          {errors.lga && (
            <span className={styles.error}>{errors.lga.message}</span>
          )}
        </div>
      </div>
      <div className={styles.container__input}>
        <label>Population</label>
        <div className={styles.wrapper}>
          <input
            {...register("population", {
              setValueAs: (value) => parseFloat(value) || 0,
            })}
            type="number"
            className={styles.input}
          />
          {errors.population && (
            <span className={styles.error}>{errors.population.message}</span>
          )}
        </div>
      </div>
      <div className={styles.container_button}>
        <button type="submit" className={styles.button__save}>
          Save
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => navigate(`/`)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
