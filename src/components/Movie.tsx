import styled from "styled-components";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

interface Props {
  movie: MovieProps;
}

interface MovieProps {
  Title: string;
  Year: string;
  Poster: string;
}

const Wrapper = styled.div`
  padding: 5px 25px 10px 25px;
  max-width: 25%;

  @media screen and (min-width: 694px) and (max-width: 915px) {
    .movie {
      max-width: 33%;
    }
  }

  @media screen and (min-width: 652px) and (max-width: 693px) {
    .movie {
      max-width: 50%;
    }
  }

  @media screen and (max-width: 651px) {
    .movie {
      max-width: 100%;
      margin: auto;
    }
  }
`;

const Movie = (props: Props): JSX.Element => {
  const poster =
    props.movie.Poster === "N/A"
      ? DEFAULT_PLACEHOLDER_IMAGE
      : props.movie.Poster;
  return (
    <Wrapper>
      <h2>{props.movie.Title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${props.movie.Title}`}
          src={poster}
        />
      </div>
      <p>({props.movie.Year})</p>
    </Wrapper>
  );
};

export default Movie;
