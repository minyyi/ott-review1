import { styled } from "styled-components"
import { BiSearch } from "react-icons/bi"


export default function SearchBar({onClick}) {


  return (
    <>
      <SearchDiv>
       <SearchInputButton onClick={onClick} >            
            <BiSearch  className="search"/>
          </SearchInputButton>
      </SearchDiv>
    </>
  )
}


const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

`

const SearchInputButton = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;


  border: none;
  background-color: white;

  cursor: pointer;
    &:focus-visible {
      outline: 2px solid gray;;
    }


  .search {
    width: 23px;
    height: 22px;
    border: 1px solid gray;
    background-color: white;
    &:hover {
      border: 3px solid gray;
      outline: none;
    }

  }
  
`

