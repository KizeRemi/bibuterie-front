import Head from 'next/head';
import React from 'react';
import { Emoji } from 'emoji-mart';

import WalkingDog from '../components/WalkingDog';

const appWalking = () => {
  return (
    <>
      <Head>
        <title>La bibuterie - Toutes les races</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto py-16">
        <div className="container flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold tracking-wider mb-4">Application Walking dog</h1>
          <WalkingDog />
        </div>
        <p className="text-m text-gray-600 mt-3 mb-12">
          Téléchargez sur Android et iOS notre application afin de sociabiliser votre chien
          et promener votre chien avec des personnes de votre quartier ! <Emoji emoji={{ id: 'dog2' }} size={24} />

          <ul>
            <li>- Trouver des personnes proches de vous</li>
            <li>- Promenades et sociabilisations</li>
            <li>- Photos </li>
            <li>- Système de notations</li>
          </ul>
        </p>
      </div>
    </>
  )
}

export default appWalking;