import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import styles from "./SearchBar.module.scss";
interface SearchProps {
  onSearch: (
    searchTerm: string,
    stateFilter: string,
    populationSort: string
  ) => void;
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
  const { register, handleSubmit } = useForm();

  const handleSearch: SubmitHandler<FieldValues> = (data) => {
    onSearch(data.searchTerm, data.stateFilter, data.populationSort);
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <div className={styles.container}>
        <div>
          <input
            className={styles.input}
            placeholder="Search..."
            {...register("searchTerm")}
            type="text"
          />
        </div>
        <div>
          <label className={styles.text}>State:</label>
          <select className={styles.input} {...register("stateFilter")}>
            <option value="">All</option>
            <option value="NSW">NSW</option>
            <option value="VIC">VIC</option>
            <option value="QLD">QLD</option>
            <option value="NT">NT</option>
            <option value="SA">SA</option>
            <option value="WA">WA</option>
            <option value="TAS">TAS</option>
          </select>
        </div>
        <div>
          <label className={styles.text}>Population: </label>
          <select className={styles.input} {...register("populationSort")}>
            <option value="ascending">ASC.</option>
            <option value="descending">DES.</option>
          </select>
        </div>
        <button className={styles.button} type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
