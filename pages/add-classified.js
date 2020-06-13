import Head from 'next/head';
import React, { useState }  from 'react';
import Link from 'next/link'
import { Currency } from 'grommet-icons';
import { Emoji } from 'emoji-mart';

const VALUES = [
  { label: 'Donner un chiot', value: 'DONATION', condition: 'Gratuite et illimitée.', url: '/add-classified-donation' },
  { label: 'Vendre un chien', value: 'SELL', condition: 'Une seule par an si particulier.', url: '/add-classified-donation' },
  { label: 'Vendre une portée', value: 'LITTER', condition: 'Un numero de SIREN est nécessaire.', url: '/add-classified-donation' },
]
const addClassified = () => {
  const [type, setType] = useState(null);

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
        <div className="grid xl:grid-cols-3 sm:grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map(value => (
            <div>
              <Link href="/add-classified-donation">
                <div
                  onClick={() => setType(value.value)}
                  className={`border-2 border-indigo-900 rounded ${type === value.value && 'border-indigo-900 bg-purple-100'} flex flex-col mb-2 bg-white-900 justify-center items-center h-32 uppercase tracking-wide font-medium hover:shadow-outline`}
                >
                  <Currency size="large" color="#9172f7" />
                  <div className="text-indigo-900 mt-2 ">
                    {value.label}
                  </div>
                </div>
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