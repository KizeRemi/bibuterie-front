import Head from 'next/head';
import React, { useContext } from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Compliance, Chat, Validate, Group, Favorite } from 'grommet-icons';

import Dog from '../components/Dog';
import { UserContext } from '../providers/UserProvider';
import { GET_DOG_CLASSIFIEDS } from '../graphql/dogClassifieds';
import { GET_DOG_CLASSIFIEDS_LIKED, TOGGLE_DOG_CLASSIFIED_LIKE } from '../graphql/dogClassifiedsLike';

export default function Home() {
  const { dogClassifiedsLiked } = useContext(UserContext);
  const [toggleDogClassifiedLike] = useMutation(TOGGLE_DOG_CLASSIFIED_LIKE, {
    refetchQueries: [{ query: GET_DOG_CLASSIFIEDS_LIKED }]
  });
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
      <div className="md:px-16 flex flex-col-reverse sm:flex-row bg-gray-100">
        <div className="py-6 flex-1 text-left container lg:py-24 p-2">
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight my-2">Bienvenue sur la bibuterie !</h2>
          <div className="leading-tight md:text-2xl mb-4 lg:mb-12">Prêts à avoir à avoir un nouveau membre dans la famille?</div>
          <Link href="/dog-classifieds-listing">
            <a className="gradient text-white uppercase tracking-wider font-bold py-3 px-8 lg:py-4 lg:px-12 inline-flex items-center">
              <span>Adopter un chiot</span>
            </a>
          </Link>
          <div className="my-4">
            <Link href="/add-farm">
              <a className="text-gray-600 underline">Découvrir la race qui me correspond</a>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 text-gray-700 text-center px-4 pt-5">
          <Dog />
        </div>
      </div>
      <div className="container my-8 px-2 lg:mx-auto h-screen">
        <h2 className="text-2xl font-bold mb-1 tracking-wider">Nos dernières annonces</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-8">
          {loading ? (
            <div>loading</div>
          ) : (
            <>
              {getDogClassifieds.map(dogClassified => (
                <div key={dogClassified.id} className="border">
                  <div className="flex items-center p-2">
                    <img className="w-8 h-8 rounded-full mr-4" src={dogClassified.classifiedUser.picture} alt="Avatar of Jonathan Reinink" />
                    <div className="text-sm flex-1">
                      <p className="text-gray-900 leading-none">{dogClassified.classifiedUser.name}</p>
                    </div>
                  </div>
                  <img className="w-full" src="/dog-min.jpg" />
                  <div className="w-full bg-white p-4 flex flex-col justify-between leading-normal">
                    <div className="flex flex-row justify-between text-gray-800 uppercase font-bold text-base mb-2">
                      <span>{dogClassified.name}, {dogClassified.dogBreed.name}</span>
                      <Favorite
                        color={dogClassifiedsLiked.includes(dogClassified.id) && '#e53e3e'}
                        onClick={() => toggleDogClassifiedLike({ variables: { dogClassifiedId: dogClassified.id } })}
                      />
                    </div>
                    <div className="text-gray-600 text-sm">
                      {`${dogClassified.gender} - 2 mois`}
                    </div>
                    <div className="bg-blue-800 self-end w-32 transform md:translate-x-8 text-center text-white p-2">
                      DONATION
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <h1 className="text-xl md:text-2xl my-12 font-bold uppercase text-center tracking-wider">La bibuterie - Annonces de chiots et balades</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 text-center uppercase text-xs md:text-sm text-pink-900 font-semibold gap-4">
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
