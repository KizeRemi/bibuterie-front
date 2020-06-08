import Head from 'next/head';
import React from 'react';
import gql from 'graphql-tag';
import { Emoji } from 'emoji-mart';
import { useQuery } from '@apollo/react-hooks';

const GET_DOG_BREEDS = gql`
  query getDogBreeds {
    getDogBreeds {
      id
      name
      image
    }
  }
`;

const dogBreeds = () => {
  const { loading, error, data: { getDogBreeds } = {} } = useQuery(GET_DOG_BREEDS);
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Head>
        <title>La bibuterie - Toutes les races</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto py-16">
        <h2 className="text-2xl font-bold tracking-wider">Toutes les races de chiens</h2>
        <p className="text-m text-gray-600 mt-3 mb-12">
          Découvrez toutes les races de chiens, avec de nombreux détails sur leurs comportements, l'éducation, etc.
          Vous pourrez également accéder aux commentaires de nombreux maitres chiens qui peuvent partager leurs expériences canines ! 
          <Emoji emoji={{ id: 'dog2' }} size={24} />
        </p>
        <div class="grid xl:grid-cols-5 sm:grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <>
              <div class="transition h-56 bg-gray-200 overflow-hidden border-2"/>
              <div class="transition h-56 bg-gray-200 overflow-hidden border-2"/>
              <div class="transition h-56 bg-gray-200 overflow-hidden border-2"/>
              <div class="transition h-56 bg-gray-200 overflow-hidden border-2"/>
              <div class="transition h-56 bg-gray-200 overflow-hidden border-2"/>
              <div class="transition h-56 bg-gray-200 overflow-hidden border-2"/>
            </>
          ) : (
            <>
            {getDogBreeds.map(dogBreed => (
              <div class="text-sm tracking-wider font-medium bg-white overflow-hidden border hover:shadow-outline">
                <img className="h-56 w-full" src={dogBreed.image} />
                <div class="flex text-gray-700 px-2 my-3">
                  <a className="hover:text-pink-500" href="#">{dogBreed.name}</a>
                </div>
              </div>
            ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default dogBreeds;