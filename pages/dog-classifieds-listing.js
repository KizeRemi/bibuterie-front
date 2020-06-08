import Head from 'next/head';
import React from 'react';
import gql from 'graphql-tag';
import { Emoji } from 'emoji-mart';
import { useQuery } from '@apollo/react-hooks';

const GET_DOG_CLASSIFIEDS = gql`
  query getDogClassifieds {
    getDogClassifieds {
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

const dogClassifiedsListing = () => {
  const { loading, error, data: { getDogClassifieds } = {} } = useQuery(GET_DOG_CLASSIFIEDS);
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Head>
        <title>La bibuterie - Annonces</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto py-16">
        <h2 className="text-2xl font-bold tracking-wider mb-12">Toutes les annonces de chiots</h2>
        <div class="grid grid-cols-1 gap-16">
          {loading ? (
            <div>loading</div>
          ) : (
            <>
              {getDogClassifieds.map(dogClassified => (
                <div class="max-w-sm w-full lg:max-w-full lg:flex">
                  <div class="w-4/12 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Woman holding a mug">
                    <img className="h-full" src="http://lorempixel.com/500/300/animals/" />
                  </div>
                  <div class="border-r w-full border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div class="mb-8">
                      <p class="text-sm text-gray-600 flex items-center">
                        Donation par un Particulier
                      </p>
                      <div class="text-gray-900 font-bold text-xl mb-2">{dogClassified.name}, {dogClassified.dogBreed.name}</div>
                      <p class="text-gray-700 text-base">{dogClassified.description}</p>
                    </div>
                    <div class="flex items-center">
                      <img class="w-10 h-10 rounded-full mr-4" src={dogClassified.classifiedUser.picture} alt="Avatar of Jonathan Reinink" />
                      <div class="text-sm">
                        <p class="text-gray-900 leading-none">{dogClassified.classifiedUser.name}</p>
                        <p class="text-gray-600">Aug 18</p>
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

export default dogClassifiedsListing;