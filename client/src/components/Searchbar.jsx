import { ReactSearchAutocomplete } from "react-search-autocomplete";

const Searchbar = ({ handleOnSearch, formatResult, users, styling }) => {
  return (
    <div className="w-1/2">
      <ReactSearchAutocomplete
        items={users}
        onSearch={handleOnSearch}
        formatResult={formatResult}
        styling={styling}
        placeholder="Users"
        autoFocus
      />
    </div>
  );
};

export default Searchbar;
