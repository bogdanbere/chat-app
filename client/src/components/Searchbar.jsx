import { useSelector } from "react-redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const Searchbar = ({
  handleOnSearch,
  handleOnSelect,
  formatResult,
  items = [],
  placeholder,
}) => {
  const theme = useSelector((state) => state.theme);
  const styling =
    theme === "fantasy"
      ? {
          border: "1px solid #dfe1e5",
          backgroundColor: "white",
          boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
          hoverBackgroundColor: "#f5f5f5",
          color: "#212121",
          fontSize: "16px",
          fontFamily: "Arial",
          iconColor: "#808080",
          lineColor: "#e8eae3",
          placeholderColor: "#b0b0b0",
          clearIconMargin: "3px 14px 0 0",
          searchIconMargin: "0 0 0 16px",
        }
      : {
          border: "1px solid #555",
          backgroundColor: "#1c1c1c",
          boxShadow: "rgba(255, 255, 255, 0.15) 0px 1px 6px 0px",
          hoverBackgroundColor: "#333",
          color: "#e0e0e0",
          fontSize: "16px",
          fontFamily: "Arial",
          iconColor: "#ccc",
          lineColor: "#444",
          placeholderColor: "#888",
          clearIconMargin: "3px 14px 0 0",
          searchIconMargin: "0 0 0 16px",
        };
  return (
    <div className="w-1/2">
      <ReactSearchAutocomplete
        items={items}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        formatResult={formatResult}
        styling={styling}
        placeholder={placeholder}
        autoFocus
      />
    </div>
  );
};

export default Searchbar;
