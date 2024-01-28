import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
  const { register, handleSubmit } = useForm();

  const handleSearch: SubmitHandler<FieldValues> = (data) => {
    onSearch(data.searchTerm);
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <label>Search:</label>
      <input {...register("searchTerm")} type="text" />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
