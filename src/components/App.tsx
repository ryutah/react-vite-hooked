import {useReducer, useEffect} from "react";
import styled from "styled-components";

import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const Wrapper = styled.div`
  text-align: center;
`;
const AppIntro = styled.p`
  font-size: large;
`;
const Movies = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;
const ErrorMessage = styled.div`
  margin: auto;
  font-weight: bold;
  color: rgb(161, 15, 15);
`;

// should be set VITE_MOVIE_API_KEY envifonment varialbles
const movieApiUrl = (value: string): string =>
  `https://www.omdbapi.com/?s=${value}&apikey=${import.meta.env.VITE_MOVIE_API_KEY}`;

type MovieResponse = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

type State = {
  loading: boolean;
  movies: Array<MovieResponse>;
  errorMessage: string | null;
};

const initialState: State = {
  loading: true,
  movies: Array<MovieResponse>(),
  errorMessage: null,
};

const reducer = (
  state = initialState,
  action: Partial<{
    type: string;
    payload: Array<MovieResponse>;
    error: string | null;
  }>
): State => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload ?? Array<MovieResponse>(),
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error ?? null,
      };
    default:
      return state;
  }
};

const App = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const resp = await fetch(movieApiUrl("man"));
      const payload = await resp.json();
      if (payload.Response === "True") {
        dispatch({type: "SEARCH_MOVIES_SUCCESS", payload: payload.Search});
      } else {
        dispatch({type: "SEARCH_MOVIES_FAILURE", error: payload.Error});
      }
    })();
  }, []);

  // TODO(ryutah): should be use https://github.com/mojotech/json-type-validation
  const search = async (value: string) => {
    dispatch({type: "SEARCH_MOVIES_REQUEST"});

    const resp = await fetch(movieApiUrl(value));
    const payload = await resp.json();
    if (payload.Response === "True") {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: payload.Search,
      });
    } else {
      dispatch({
        type: "SEARCH_MOVIES_FAILURE",
        error: payload.Error,
      });
    }
  };

  const {movies, errorMessage, loading} = state;

  return (
    <Wrapper>
      <Header text="HOOKED" />
      <Search search={search} />
      <AppIntro>haring a few of our favourite movies</AppIntro>
      <Movies>
        {loading && !errorMessage ? (
          <span>loading ...</span>
        ) : errorMessage ? (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </Movies>
    </Wrapper>
  );
};

export default App;
