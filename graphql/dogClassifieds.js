import gql from 'graphql-tag';

export const GET_DOG_CLASSIFIEDS = gql`
  query getDogClassifieds($type: DogClassifiedType, $limit: Int, $dogBreedId: ID, $gender: String) {
    getDogClassifieds(type: $type, limit: $limit, dogBreedId: $dogBreedId, gender: $gender) {
      id
      name
      description
      classifiedUser {
        name
        picture
      }
      dogBreed {
        name
      }
    }
  }
`;
