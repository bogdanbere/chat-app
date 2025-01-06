import { ReactSearchAutocomplete } from "react-search-autocomplete";

const Searchbar = ({
  handleOnSearch,
  handleOnSelect,
  formatResult,
  users,
  styling,
}) => {
  return (
    <div className="w-1/2">
      <ReactSearchAutocomplete
        fuseOptions={{ keys: ["name"] }}
        resultStringKeyName="name"
        items={users}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        formatResult={formatResult}
        styling={styling}
        placeholder="Users"
        autoFocus
      />
    </div>
  );
};

export default Searchbar;
