import Head from 'next/head';
import React from 'react';
import Link from 'next/link'
import { Emoji } from 'emoji-mart';

const VALUES = [
  { label: 'Donner une chien', value: 'DONATION', condition: 'Gratuite et illimitée.', url: '/add-classified-donation' },
  { label: 'Vendre une chien', value: 'SELL', condition: 'Une seule par an si particulier.', url: '/add-classified-donation' },
  { label: 'Vendre une portée', value: 'LITTER', condition: 'Un numero de SIREN est nécessaire.', url: '/add-classified-donation' },
]
const addClassified = () => {
  return (
    <>
      <Head>
        <title>La bibuterie - Publier une annonce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto py-16">
        <h2 className="text-2xl font-bold tracking-wider">Publier une annonce</h2>
        <p className="text-m text-gray-600 mt-3 mb-12">
          La publication d'annonce sur la bibuterie est totalement gratuite!
          Sachez que depuis le 7 octobre 2015, de nouvelles réglementations sont entrées en vigueur dans la vente de chien
          mais ne vous inquiétez pas, nous allons vous accompagner jusqu'à ce que votre annonce soit en ligne ! <Emoji emoji={{ id: 'slightly_smiling_face' }} size={20} />
        </p>
        <div class="grid xl:grid-cols-3 sm:grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map(value => (
            <div>
              <Link href={value.url}>
                <a>
                  <div class="flex mb-2 bg-blue-900 justify-end pb-2 pr-4 items-end h-32 text-3xl tracking-wide font-medium overflow-hidden border-2 hover:shadow-outline">
                    <div class="text-white">
                      {value.label}
                    </div>
                  </div>
                </a>
              </Link>
              <div className="text-m italic text-gray-600">{value.condition}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default addClassified;