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

export const GET_USER_DOG_CLASSIFIEDS_LIKED = gql`
  query getUserDogClassifiedsLiked {
    getUserDogClassifiedsLiked {
      dogClassifiedId
      dogClassified {
        id
        name
        gender
        description
        dogBreed {
          name
        }
        classifiedUser {
          name
          picture
        }
      }
    }
  }
`;

export const TOGGLE_DOG_CLASSIFIED_LIKE = gql`
  mutation toggleDogClassifiedLike($dogClassifiedId: ID!) {
    toggleDogClassifiedLike(dogClassifiedId: $dogClassifiedId)
  }
`;