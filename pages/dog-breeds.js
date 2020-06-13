import Head from 'next/head';
import React from 'react';
import gql from 'graphql-tag';
import { Emoji } from 'emoji-mart';
import { useQuery } from '@apollo/react-hooks';
import { Chat, Favorite } from 'grommet-icons';

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
        <div class="grid xl:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 gap-6">
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
              <div class="text-sm tracking-wider bg-white overflow-hidden border">
                <img className="h-56 w-full" src={dogBreed.image} />
                <div class="flex flex-col text-gray-800 px-2">
                  <a href="#" className="text-base font-medium uppercase py-2">{dogBreed.name}</a>
                  <div class="py-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2">#petit</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2">#mignon</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2">#rapide</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2">#rapide</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2">#rapide</span>
                  </div>
                  <div className="flex justify-end border-t py-2">
                    <div className="flex items-center mr-2 font-xs text-gray-700">
                      <Chat className="mr-1" />
                      <span>1k+</span>
                    </div>
                    <div className="flex items-center font-xs text-gray-700">
                      <Favorite className="mr-1" />
                      <span>312</span>
                    </div>
                  </div>
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