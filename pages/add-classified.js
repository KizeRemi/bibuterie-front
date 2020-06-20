import Head from 'next/head';
import React, { useState }  from 'react';
import Link from 'next/link'
import { Currency } from 'grommet-icons';
import { Emoji } from 'emoji-mart';
import GiveImage from '../components/Give';

const addClassified = () => {
  const [type, setType] = useState(null);

  return (
    <>
      <Head>
        <title>La bibuterie - Publier une annonce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container px-2 lg:mx-auto py-16">
        <h2 className="text-2xl font-bold tracking-wider">Publier une annonce</h2>
        <p className="text-m text-gray-600 mt-3 mb-12">
          La publication d'annonce sur la bibuterie est totalement gratuite!
          Sachez que depuis le 7 octobre 2015, de nouvelles réglementations sont entrées en vigueur dans la vente de chien
          mais ne vous inquiétez pas, nous allons vous accompagner jusqu'à ce que votre annonce soit en ligne ! <Emoji emoji={{ id: 'slightly_smiling_face' }} size={20} />
        </p>
        <div class="mx-0 lg:mx-64 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
          <div class="text-base my-2 lg:my-6 px-2 py-6 tracking-wider bg-white overflow-hidden border text-center">
            <div class="w-full text-gray-700 px-4">
              <h3 class="text-2xl font-bold tracking-wider">
                Chiot
              </h3>
              <div></div>
              <ul className="list-inside sm:list-inside text-left m-3">
                <li className="my-4 lg:my-1">- Annonce gratuite</li>
                <li className="my-4 lg:my-1">- Illimité</li>
                <li className="my-4 lg:my-1">- Jusqu'à 10 photos</li>
              </ul>
            </div>
            <div className="flex justify-center my-12"><GiveImage /></div>
            <Link href="/add-classified-donation">
              <a class="gradient w-full text-center inline-block text-white px-4 py-4 leading-none rounded-full font-bold uppercase">
                Donner un chiot
              </a>
            </Link>
          </div>
          <div class="text-base my-2 lg:my-6 px-2 py-6 tracking-wider bg-white overflow-hidden border text-center">
            <div class="w-full text-gray-700 px-4">
              <h3 class="text-2xl font-bold tracking-wider">
                Portée de chiots
              </h3>
              <div></div>
              <ul className="list-inside sm:list-inside text-left m-3">
                <li className="my-4 lg:my-1">- Annonce gratuite</li>
                <li className="my-4 lg:my-1">- Numéro de siren nécessaire</li>
                <li className="my-4 lg:my-1">- Options disponibles</li>
                <li className="my-4 lg:my-1">- Jusqu'à 30 photos</li>
              </ul>
            </div>
            <div className="flex justify-center my-12"><GiveImage /></div>
            <button class="gradient w-full text-center inline-block text-white px-4 py-4 leading-none rounded-full font-bold uppercase">
              Vendre une portée
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default addClassified;