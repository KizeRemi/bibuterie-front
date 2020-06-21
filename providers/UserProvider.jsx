
import React, { createContext, useState, useEffect } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { useLazyQuery } from '@apollo/react-hooks';

import { GET_USER_LIKED } from '../graphql/dogClassifiedsLike';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [getUserDogClassifiedsLiked, { data: {
    getUserDogClassifiedsLiked: dogClassifiedsLiked = [],
    getUserDogBreedsLiked: dogBreedsLiked = [],
  } = {} }] = useLazyQuery(GET_USER_LIKED);

  const signIn = (provider) => async () => {
    await Auth.federatedSignIn({ provider });
  };

  const signOut = (e) => {
    e.stopPropagation();
    Auth.signOut();
    setUser({ user: null });
  }

  useEffect(() => {
    Hub.listen('auth', async (data) => {
      const { payload } = data
       if (payload.event === 'signIn') {
        const user = await Auth.currentAuthenticatedUser();
        getUserDogClassifiedsLiked();
        setUser({ ...user.attributes });
       }
    })
    const loginIn = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser({ ...user.attributes });
        getUserDogClassifiedsLiked();
      } catch (e) {
        console.log(e);
      }
    };
    loginIn();
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      signOut,
      signIn,
      dogClassifiedsLiked: dogClassifiedsLiked.map(dogClassifiedLiked => dogClassifiedLiked.dogClassifiedId),
      dogBreedsLiked: dogBreedsLiked.map(dogBreedLiked => dogBreedLiked.dogBreedId),
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;