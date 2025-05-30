// SearchContext
// Used for storing the current search input so all pages/components can access it.
// Makes the search bar work globally.

import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [search, setSearch] = useState("");
  
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}