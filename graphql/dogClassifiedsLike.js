import gql from 'graphql-tag';

export const GET_USER_LIKED = gql`
  query getUserLiked {
    getUserDogClassifiedsLiked {
      dogClassifiedId
    }
    getUserDogBreedsLiked {
      dogBreedId
    }
  }
`;

export const TOGGLE_DOG_CLASSIFIED_LIKE = gql`
  mutation toggleDogClassifiedLike($dogClassifiedId: ID!) {
    toggleDogClassifiedLike(dogClassifiedId: $dogClassifiedId)
  }
`;