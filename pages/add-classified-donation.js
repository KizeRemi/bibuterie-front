import { useState } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Emoji } from 'emoji-mart';

import ClassifiedFormIdentification from '../components/ClassifiedFormIdentification';
import ClassifiedFormDescription from '../components/ClassifiedFormDescription';
import ClassifiedProgressBar from '../components/ClassifiedProgressBar';
import ClassifiedFormPictures from '../components/ClassifiedFormPictures';

const ADD_DOG_CLASSIFIED = gql`
  mutation addDogClassified($input: DogClassifiedInput!) {
    addDogClassified(input: $input)
  }
`;

const GET_DOG_BREEDS = gql`
  query getDogBreeds {
    getDogBreeds {
      id
      name
    }
  }
`;

const STEPS = {
  0: {
    description: <span>En quelques étapes seulement, nous allons pouvoir publier votre donation. 
    Tout d'abord, nous allons nous occuper de la partie administrative afin d'identifier légalement votre chien, cette étape est obligatoire
    mais rapide <Emoji emoji={{ id: 'wink' }} size={18} /> !</span>,
    fields: ['name', 'birthDate', 'isVaccinated', 'dogBreed', 'isLof', 'isDewormed', 'numberId']
  },
  1: {
    description:
    <span>
      Super! Nous allons maintenant passer aux informations sur votre chien afin que les internautes puissent en apprendre plus sur celui-ci.
      N'hésitez pas à donner un maximum d'informations sur lui (ses parents aussi), son caractère, etc afin d'avoir une annonce qui inspire confiance!
      Une annonce très remplie sera encore mieux mise en avant.
    </span>,
    fields: ['description']
  },
  2: {
    description:
    <span>
      Il faut désormais mettre en valeur votre chien, pour cela, vous pouvez uploader jusqu'à 10 photos.
      Devant, sur le coté, sur le ventre, pendant qu'il joue... des belles photos auront plus de chances de capter l'attention de l'internaute !
    </span>,
    fields: []
  },
  3: {
    description:
    <span>
      Nous avons maintenant besoin de connaitre l'emplacement de votre chien. Par défaut, les données sont celles liés à votre profil mais vous
      pouvez les modifier à votre convenance.
      Vous pouvez aussi spécifier les horaires de visites et si vous pouvez livrer le chien.
    </span>,
    fields: []
  },
  4: {
    description:
    <span>
      Merci, nous sommes à la dernière étape avant la mise en ligne de votre annonce ! Avant de valider, voici un récapitulatif
      des informations que vous avez fournies. Si besoin vous pouvez revenir aux précédentes étapes pour corriger sinon vous pouvez valider.
    </span>,
    fields: []
  },
};

const addClassifiedDonation = () => {
  const [addDogClassified, { data }] = useMutation(ADD_DOG_CLASSIFIED);
  const { loading, error, data: { getDogBreeds } = {} } = useQuery(GET_DOG_BREEDS);
  const [step, setStep] = useState(0);
  const { register, triggerValidation, handleSubmit, errors, getValues } = useForm({
    defaultValues: {
      name: '',
      birthDate: new Date().toISOString(),
      isVaccinated: false,
      isDewormed: false,
      isLof: false,
      numberId: '',
      dogBreed: null,
      description: '',
    }
  });
  const onSubmit = async (data) => {
    await addDogClassified({ variables: { input: { type: 'DONATION', data} } });
  };

  return (
    <>
      <Head>
        <title>La bibuterie - Publier une donation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold tracking-wider mb-2">Donation de chien <Emoji emoji={{ id: 'handshake' }} size={28} /></h1>
        <ClassifiedProgressBar percent={(step / 4) * 100} />
        <p className="text-sm text-gray-600 mb-6">
          {STEPS[step].description}
        </p>
        <form onSubmit={step === 4 ? handleSubmit(onSubmit) : null}>
          <div className={`grid ${step === 0 ? 'block': 'hidden' } grid-cols-2 gap-4`}>
            <ClassifiedFormIdentification dogBreeds={getDogBreeds} register={register} errors={errors} />
          </div>
          <div className={`grid ${step === 1 ? 'block': 'hidden' } grid-cols-2 gap-4`}>
            <ClassifiedFormDescription register={register} />
          </div>
          <div className={`grid ${step === 2 ? 'block': 'hidden' } grid-cols-2 gap-4`}>
            <ClassifiedFormPictures register={register} />
          </div>
          <div className={`grid ${step === 3 ? 'block': 'hidden' } grid-cols-2 gap-4`}>
            Position
          </div>
          <div className={`grid ${step === 4 ? 'block': 'hidden' } grid-cols-2 gap-4`}>
            Recap
          </div>
        <div className="flex justify-between col-span-2 my-12">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              type="button"
              className="bg-pink-900 text-white font-bold py-2 px-4 inline-flex items-center"
            >
              <span>Revenir à la précédente étape</span>
            </button>
          )}
          <button
            onClick={async () => {
              console.log(step);
              if (step === 4) {
                return;
              }
              if (await triggerValidation(STEPS[step].fields)) {
                setStep(step + 1);
              };
            }}
            type={step === 4 ? "submit": "button"}
            className={`bg-pink-900 text-white font-bold py-2 px-4 inline-flex items-center`}
          >
            <span>{step === 4 ? 'Enregistrer' : 'Passer à la prochaine étape'}</span>
          </button>
        </div>
        </form>
      </div>
    </>
  )
}

export default addClassifiedDonation;