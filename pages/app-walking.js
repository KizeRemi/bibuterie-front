import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Emoji } from 'emoji-mart';

import WalkingDog from '../components/WalkingDog';
import AppleStoreButton from '../components/AppleStoreButton';


const appWalking = () => {
  return (
    <>
      <Head>
        <title>La bibuterie - Toutes les races</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="px-16 h-screen flex bg-gray-100">
          <div className="flex-1 text-left px-12 py-24 m-2">
            <h1 className="text-5xl my-2 font-bold">Application Walking Dog</h1>
            <div className="text-xl mb-12 text-gray-700">
              Téléchargez notre application afin de sociabiliser et promener votre chien avec des personnes de votre quartier ! <Emoji emoji={{ id: 'dog2' }} size={24} />
            </div>
            <ul className="text-lg text-gray-600 my-12"> 
              <li>- Trouver facilement des personnes proches de vous</li>
              <li>- Promenades et sociabilisations</li>
              <li>- Photos </li>
              <li>- Système de notations</li>
            </ul>
            <div className="flex">
              <Link href="#" className="mr-8">
                <AppleStoreButton />
              </Link>
              <Link href="#">
                <a>
                  <img src="/google-play-badge.png" className="h-16 w-42 mt-2" />
                </a>
              </Link>
            </div>
          </div>
          <div className="flex-1 text-gray-700 text-center px-4 pt-5 m-2">
            <WalkingDog />
          </div>
        </div>
    </>
  )
}

export default appWalking;