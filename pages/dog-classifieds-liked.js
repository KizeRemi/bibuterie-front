import Head from 'next/head';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER_DOG_CLASSIFIEDS_LIKED } from '../graphql/dogClassifiedsLike';
import { Favorite } from 'grommet-icons';


const dogClassifiedsLiked = () => {
  const { loading, data: { getUserDogClassifiedsLiked: userDogClassifiedsLiked } = {}, error } = useQuery(GET_USER_DOG_CLASSIFIEDS_LIKED, { ssr: false });

  return (
    <>
      <Head>
        <title>La bibuterie - Mes annonces favorites</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container lg:mx-auto py-2 lg:py-12">
        <h2 className="px-2 lg:px-0 text-2xl leading-tight font-bold tracking-wider py-4">Vos annonces favorites</h2>
        <div className="grid grid-cols-1 gap-16">
          {loading ? (
            <>
              <div className="transition h-64 bg-gray-200 overflow-hidden border-2"/>
              <div className="transition h-64 bg-gray-200 overflow-hidden border-2"/>
              <div className="transition h-64 bg-gray-200 overflow-hidden border-2"/>
              <div className="transition h-64 bg-gray-200 overflow-hidden border-2"/>
              <div className="transition h-64 bg-gray-200 overflow-hidden border-2"/>
              <div className="transition h-64 bg-gray-200 overflow-hidden border-2"/>
            </>
          ) : (
            <>
              {userDogClassifiedsLiked.length === 0 && (
                <div className="flex p-4 flex-col flex-1 justify-center items-center text-center text-gray-600">
                  <Favorite size="xlarge" className="mb-1 lg:mb-3" />
                  <p>Vous n'avez aucune annonce dans vos favoris.</p>
                </div>
              )}
              {userDogClassifiedsLiked.map(({ dogClassifiedId, dogClassified }) => (
                <div key={dogClassifiedId} className="max-w-sm w-full lg:max-w-full lg:flex">
                  <div className="w-full lg:w-4/12 flex-none bg-cover text-center overflow-hidden">
                    <img className="h-full" src="/sample.jpg" />
                  </div>
                  <div className="border-r w-full border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                      <div className="text-sm text-gray-600 flex items-center flex flex-row justify-between">
                        Donation par un Particulier
                      </div>
                      <div className="text-pink-900 font-bold text-xl mb-2">
                        {dogClassified.name}, {dogClassified.dogBreed.name}
                      </div>
                      <p className="text-gray-700 text-base">{dogClassified.description}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="text-sm flex flex-row items-center">
                        <img className="w-10 h-10 rounded-full mr-4" src="" alt="Avatar of Jonathan Reinink" />
                        <p className="text-gray-900 leading-none"></p>
                      </div>
                      <div className="bg-blue-900 self-end w-32 transform md:translate-x-8 text-center text-white p-2">
                        DONATION
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

export default dogClassifiedsLiked;