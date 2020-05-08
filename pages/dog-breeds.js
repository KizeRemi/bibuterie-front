import Head from 'next/head';
import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_DOG_BREEDS = gql`
  query getDogBreeds {
    getDogBreeds {
      id
      name
    }
  }
`;

const dogBreeds = () => {
  const { loading, error, data: { getDogBreeds } = {} } = useQuery(GET_DOG_BREEDS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Head>
        <title>La bibuterie - Toutes les races</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="h-screen bg-gray-100">
          {getDogBreeds.map(dogBreed => (
            <div>{dogBreed.name}</div>
          ))}
        </div>
      </div>
    </>
  )
}

export default dogBreeds;