import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import HomeImage from '../components/HomeImg';
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
            <Dog />
          </div>
        </div>

        <h1 className="text-2xl font-bold uppercase text-center tracking-wider">La bibuterie - Annonces de chiots et balades</h1>
        <div className="my-8 flex justify-around h-32 uppercase text-sm text-gray-600 font-semibold items-center">
          <div className="flex items-center flex-col">
            <svg class="fill-current inline-block h-12 w-12 my-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M18 9.87V20H2V9.87a4.25 4.25 0 0 0 3-.38V14h10V9.5a4.26 4.26 0 0 0 3 .37zM3 0h4l-.67 6.03A3.43 3.43 0 0 1 3 9C1.34 9 .42 7.73.95 6.15L3 0zm5 0h4l.7 6.3c.17 1.5-.91 2.7-2.42 2.7h-.56A2.38 2.38 0 0 1 7.3 6.3L8 0zm5 0h4l2.05 6.15C19.58 7.73 18.65 9 17 9a3.42 3.42 0 0 1-3.33-2.97L13 0z"/>
            </svg>
            Annonce de qualité
          </div>
          <div className="flex items-center text-bold flex-col">
            <svg class="fill-current inline-block h-12 w-12 my-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M18 9.87V20H2V9.87a4.25 4.25 0 0 0 3-.38V14h10V9.5a4.26 4.26 0 0 0 3 .37zM3 0h4l-.67 6.03A3.43 3.43 0 0 1 3 9C1.34 9 .42 7.73.95 6.15L3 0zm5 0h4l.7 6.3c.17 1.5-.91 2.7-2.42 2.7h-.56A2.38 2.38 0 0 1 7.3 6.3L8 0zm5 0h4l2.05 6.15C19.58 7.73 18.65 9 17 9a3.42 3.42 0 0 1-3.33-2.97L13 0z"/>
            </svg>
            Race adapté pour vous
          </div>
          <div className="flex items-center flex-col">
            <svg class="fill-current inline-block h-12 w-12 my-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M18 9.87V20H2V9.87a4.25 4.25 0 0 0 3-.38V14h10V9.5a4.26 4.26 0 0 0 3 .37zM3 0h4l-.67 6.03A3.43 3.43 0 0 1 3 9C1.34 9 .42 7.73.95 6.15L3 0zm5 0h4l.7 6.3c.17 1.5-.91 2.7-2.42 2.7h-.56A2.38 2.38 0 0 1 7.3 6.3L8 0zm5 0h4l2.05 6.15C19.58 7.73 18.65 9 17 9a3.42 3.42 0 0 1-3.33-2.97L13 0z"/>
            </svg>
            Balade proche de chez vous
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
                  <img className="w-full" src="http://lorempixel.com/500/300/animals/" />
                  <div class="w-full bg-white p-4 flex flex-col justify-between leading-normal">
                    <div class="text-pink-900 uppercase font-bold text-sm mb-2">
                      {dogClassified.name}, {dogClassified.dogBreed.name}
                    </div>
                    <div class="text-gray-600 text-sm">
                      2 mois
                    </div>
                    <div class="text-gray-600 text-sm mb-2">
                      Disponible
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
