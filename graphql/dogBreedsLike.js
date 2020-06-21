import gql from 'graphql-tag';

export const GET_DOG_BREEDS_LIKED = gql`
  query getUserDogBreedsLiked {
    getUserDogBreedsLiked {
      dogBreedId
    }
  }
`;

export const TOGGLE_DOG_BREED_LIKE = gql`
  mutation toggleDogBreedLike($dogBreedId: ID!) {
    toggleDogBreedLike(dogBreedId: $dogBreedId)
  }
`;