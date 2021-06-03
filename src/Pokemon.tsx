import React, { ReactElement } from "react";
import styled from "styled-components";
import { usePokemons } from "./usePokemons";
import Pagination from "@material-ui/lab/Pagination";

const Pokemon: React.FC = (): ReactElement => {
  const { pokemonsRender, setKeySearch, setPage, page, totalPages } = usePokemons();

  return (
    <Container>
      <div className="search-pokemon">
        <input
          type="text"
          name="keySearch"
          onChange={(evt) => setKeySearch(evt.target.value)}
          placeholder="Search pokemon..."
          autoComplete="off"
        />
      </div>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, newPage) => setPage(newPage)}
      />
      <PokemonContainer>
        {pokemonsRender.map((el, index) => {
          return (
            <Card key={index}>
              <img src={el.sprites.back_default} alt={el.name} />
              <span>Id: {el.id}</span>
              <span>Name: {el.name}</span>
              <span>Base Experience: {el.base_experience}</span>
              <span>Height: {el.height}</span>
              <span>Types: {el.types[0]?.type?.name}</span>
              <span>Weight: {el.weight}</span>
            </Card>
          );
        })}
      </PokemonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 500px;
    height: 30px;
    margin-top: 1rem;
    border-radius: 4px;
    border-width: 1px;
    outline: none;
  }
`;

const PokemonContainer = styled.div`
  display: flex;
  width: 1500px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 1rem;
  cursor: pointer;
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2),
    0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  transition: all 3s ease-in-out;
  background-color: #f9e0dd;

  img {
    width: 300px;
    height: 150px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  span {
    color: #000;
    font-size: 1rem;
    font-family: "Monsterrat";
    font-weight: 500;
    line-height: 2;
  }

  :hover {
    /* transform: scale(1.167); */
    animation: pokemon 3s infinite;
  }

  @keyframes pokemon {
    from {
      transform: rotateY(0deg);
    }

    to {
      transform: rotateY(180deg);
    }
  }
`;

export default Pokemon;
