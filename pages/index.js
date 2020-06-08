import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
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

export default function Home() {
  const { loading, error, data: { getDogClassifieds } = {} } = useQuery(GET_DOG_CLASSIFIEDS);
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Head>
        <title>La bibuterie - Accueil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto h-screen">
        <div className="flex">
          <div className="flex-1 text-left px-12 py-24 m-2">
            <h2 className="text-4xl my-2">Bienvenue sur la bibuterie !</h2>
            <div className="text-2xl mb-12">Prêts à avoir à avoir un nouveau membre dans la famille?</div>
            <Link href="/dog-classifieds-listing">
              <a className="bg-blue-900 border-blue-900 hover:bg-white text-white hover:text-blue-900 border-2 hover:border-blue-900 font-bold py-4 px-12 inline-flex items-center">
                <span>Adopter un chiot</span>
              </a>
            </Link>
            <div className="my-4">
              <Link href="/add-farm">
                <a className="text-pink-900">Trouver la race qui me correspond</a>
              </Link>
            </div>
          </div>
          <div className="flex-1 text-gray-700 text-center px-4 py-2 m-2">
            her iage
          </div>
        </div>
        <div class="grid grid-cols-5 gap-8">
          {loading ? (
            <div>loading</div>
          ) : (
            <>
              {getDogClassifieds.map(dogClassified => (
                <div class="max-w-sm overflow-hidden shadow-lg">
                  <img className="w-full" src="http://lorempixel.com/500/300/animals/" />
                  <div class="border-r w-full border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div class="mb-8">
                      <div class="text-gray-900 font-bold text-xl mb-2">{dogClassified.name}, {dogClassified.dogBreed.name}</div>
                    </div>
                    <div class="flex items-center">
                      <img class="w-10 h-10 rounded-full mr-4" src={dogClassified.classifiedUser.picture} alt="Avatar of Jonathan Reinink" />
                      <div class="text-sm">
                        <p class="text-gray-900 leading-none">{dogClassified.classifiedUser.name}</p>
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
