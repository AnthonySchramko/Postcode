import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postcodeSchema } from "../../schema/form-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../../schema/form-data";

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
    <form onSubmit={handleSubmit(formSubmit)}>
      <h2>Suburb details</h2>
      <div>
        <label>Suburb name</label>
        <div>
          <input {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
      </div>
      <div>
        <label>Postcode</label>
        <div>
          <input {...register("postcode")} />
          {errors.postcode && <span>{errors.postcode.message}</span>}
        </div>
      </div>
      <div>
        <label>State</label>
        <div>
          <input {...register("state")} />
          {errors.state && <span>{errors.state.message}</span>}
        </div>
      </div>
      <div>
        <label>Local Government</label>
        <div>
          <input {...register("lga")} />
          {errors.lga && <span>{errors.lga.message}</span>}
        </div>
      </div>
      <div>
        <label>Population</label>
        <div>
          <input
            {...register("population", {
              setValueAs: (value) => parseFloat(value) || 0,
            })}
            type="number"
          />
          {errors.population && <span>{errors.population.message}</span>}
        </div>
      </div>
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(`/`)}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
