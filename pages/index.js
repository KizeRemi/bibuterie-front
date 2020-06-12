import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Compliance, Chat, Validate, Group, Favorite } from 'grommet-icons';
import Dog from '../components/Dog';

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
              <a className="bg-blue-900 border-blue-900 hover:bg-white text-white hover:text-blue-900 border-2 uppercase tracking-wider hover:border-blue-900 font-bold py-4 px-12 inline-flex items-center">
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
            <Dog />
          </div>
        </div>

        <h1 className="text-2xl font-bold uppercase text-center tracking-wider">La bibuterie - Annonces de chiots et balades</h1>
        <div className="my-12 flex justify-around h-32 uppercase text-sm text-pink-900 font-semibold items-center">
          <div className="flex items-center flex-col">
            <Compliance size="large" color="#C2908d" />
            <div className="m-5">Annonce de qualité</div>
          </div>
          <div className="flex items-center text-bold flex-col">
            <Validate size="large" color="#C2908d" />
            <div className="m-5">Race adapté pour vous</div>
          </div>
          <div className="flex items-center flex-col">
            <Chat size="large" color="#C2908d" />
            <div className="m-5">Messagerie interne</div>
          </div>
          <div className="flex items-center flex-col">
            <Group size="large" color="#C2908d" />
            <div className="m-5">Promenades collectives</div>
          </div>
        </div>
        <h2 className="text-2xl mb-4 font-bold tracking-wider">Dernières annonces de chiots</h2>
        <div class="grid grid-cols-4 gap-8">
          {loading ? (
            <div>loading</div>
          ) : (
            <>
              {getDogClassifieds.map(dogClassified => (
                <div class="max-w-sm border">
                  <div class="flex items-center p-2">
                    <img class="w-8 h-8 rounded-full mr-4" src={dogClassified.classifiedUser.picture} alt="Avatar of Jonathan Reinink" />
                    <div class="text-sm flex-1">
                      <p class="text-gray-900 leading-none">{dogClassified.classifiedUser.name}</p>
                    </div>
                    <div class="border border-red-500 font-semibold rounded-full px-3 text-xs self-end text-red-500 text-white">
                      Urgent
                    </div>
                  </div>
                  <img className="w-full" src="https://loremflickr.com/500/400/dog" />
                  <div class="w-full bg-white p-4 flex flex-col justify-between leading-normal">
                    <div class="flex flex-row justify-between text-pink-900 uppercase font-bold text-sm mb-2">
                      <span>{dogClassified.name}, {dogClassified.dogBreed.name}</span>
                      <Favorite size="medium" />
                    </div>
                    <div class="text-gray-600 text-sm">
                      2 mois
                    </div>
                    <div class="bg-blue-900 self-end w-32 transform translate-x-8 text-center text-white p-2">
                      DONATION
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
