import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Compliance, Chat, Validate, Group, Favorite } from 'grommet-icons';
import Dog from '../components/Dog';

const GET_DOG_CLASSIFIEDS = gql`
  query getDogClassifieds($type: DogClassifiedType!, $limit: Int) {
    getDogClassifieds(type: $type, limit: $limit) {
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
  const { loading, error, data: { getDogClassifieds } = {} } = useQuery(GET_DOG_CLASSIFIEDS, {
    variables: { type: "DONATION", limit: 4 },
  });
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Head>
        <title>La bibuterie - Accueil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="md:px-16 flex bg-gray-100">
        <div className="flex-1 text-left container py-24 m-2">
          <h2 className="text-4xl my-2">Bienvenue sur la bibuterie !</h2>
          <div className="text-2xl mb-12">Prêts à avoir à avoir un nouveau membre dans la famille?</div>
          <Link href="/dog-classifieds-listing">
            <a className="gradient w-full md:w-auto text-white uppercase tracking-wider font-bold py-4 px-12 inline-flex items-center">
              <span>Adopter un chiot</span>
            </a>
          </Link>
          <div className="my-4">
            <Link href="/add-farm">
              <a className="text-gray-600 underline">Découvrir la race qui me correspond</a>
            </Link>
          </div>
        </div>
        <div className="hidden md:flex flex-1 text-gray-700 text-center px-4 pt-5 m-2">
          <Dog />
        </div>
      </div>
      <div className="container mx-auto h-screen">
        <h2 className="text-xl md:text-2xl my-6 font-bold tracking-wider">Dernières annonces de chiots</h2>
        <div class="grid sm:grid-cols-1 md:grid-cols-4 gap-8">
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
                  </div>
                  <img className="w-full" src="/dog-min.jpg" />
                  <div class="w-full bg-white p-4 flex flex-col justify-between leading-normal">
                    <div class="flex flex-row justify-between text-gray-800 uppercase font-bold text-base mb-2">
                      <span>{dogClassified.name}, {dogClassified.dogBreed.name}</span>
                      <Favorite size="medium" />
                    </div>
                    <div class="text-gray-600 text-sm">
                      2 mois
                    </div>
                    <div class="bg-blue-800 self-end w-32 transform md:translate-x-8 text-center text-white p-2">
                      DONATION
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <h1 className="text-xl md:text-2xl my-12 font-bold uppercase text-center tracking-wider">La bibuterie - Annonces de chiots et balades</h1>
        <div className="flex flex-col sm:flex-row justify-around uppercase text-sm text-pink-900 font-semibold items-center">
          <div className=" mb-8 md:mb-0 flex items-center flex-col">
            <Compliance size="large" color="#a0aec0" />
            <div className="mt-1 md:mt-5 text-gray-500">Annonce de qualité</div>
          </div>
          <div className="mb-8 md:mb-0 flex items-center text-bold flex-col">
            <Validate size="large" color="#a0aec0" />
            <div className="mt-1 md:mt-5 text-gray-500">Race adapté pour vous</div>
          </div>
          <div className="mb-8 md:mb-0 flex items-center flex-col">
            <Chat size="large" color="#a0aec0" />
            <div className="mt-1 md:mt-5 text-gray-500">Messagerie interne</div>
          </div>
          <div className="mb-8 md:mb-0 flex items-center flex-col">
            <Group size="large" color="#a0aec0" />
            <div className="mt-1 md:mt-5 text-gray-500">Promenades collectives</div>
          </div>
        </div>
      </div>
    </>
  )
}
