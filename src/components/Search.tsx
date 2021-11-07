import { useState, MouseEvent, ChangeEvent } from "react";
import styled from "styled-components";
import { Submit } from "./Inputs";

interface SearchProps {
  search: (value: string) => void;
}

const Wrapper = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
`;

const SearchText = styled.input.attrs({ type: "text" })`
  width: 40%;
  min-width: 170px;
`;

const Search = (props: SearchProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <Wrapper>
      <SearchText value={searchValue} onChange={handleSearchInputChanges} />
      <Submit onClick={callSearchFunction} value="SEARCH" />
    </Wrapper>
  );
};

export default Search;
