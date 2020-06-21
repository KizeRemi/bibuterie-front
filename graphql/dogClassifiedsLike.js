import gql from 'graphql-tag';

export const GET_DOG_CLASSIFIEDS_LIKED = gql`
  query getUserDogClassifiedsLiked {
    getUserDogClassifiedsLiked {
      dogClassifiedId
    }
  }
`;

export const TOGGLE_DOG_CLASSIFIED_LIKE = gql`
  mutation toggleDogClassifiedLike($dogClassifiedId: ID!) {
    toggleDogClassifiedLike(dogClassifiedId: $dogClassifiedId)
  }
`;