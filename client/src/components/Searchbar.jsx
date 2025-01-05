import { ReactSearchAutocomplete } from "react-search-autocomplete";

const Searchbar = ({ handleOnSearch, formatResult, users }) => {
  return (
    <div className="w-1/2">
      <ReactSearchAutocomplete
        items={users}
        onSearch={handleOnSearch}
        formatResult={formatResult}
        styling={{ zIndex: 4 }}
        placeholder="Users"
        autoFocus
      />
    </div>
  );
};

export default Searchbar;
