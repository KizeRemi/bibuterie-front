import Head from 'next/head';
import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useForm } from "react-hook-form";
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { Favorite } from 'grommet-icons';

import Select from '../components/Select';
import { GET_USER_LIKED, TOGGLE_DOG_CLASSIFIED_LIKE } from '../graphql/dogClassifiedsLike';
import { GET_DOG_CLASSIFIEDS } from '../graphql/dogClassifieds';
import { UserContext } from '../providers/UserProvider';

const GET_DOG_BREEDS = gql`
  query getDogBreeds {
    getDogBreeds {
      id
      name
    }
  }
`;

const dogClassifiedsListing = () => {
  const { dogClassifiedsLiked } = useContext(UserContext);
  const { data: { getDogBreeds: dogBreeds } = {} } = useQuery(GET_DOG_BREEDS);
  const [toggleDogClassifiedLike] = useMutation(TOGGLE_DOG_CLASSIFIED_LIKE, {
    refetchQueries: [{ query: GET_USER_LIKED }]
  });
  const [getFilteredDogClassifieds, {
    loading: filteredDogClassifiedsLoading, data: { getDogClassifieds: filteredDogClassifieds } = {}
  }] = useLazyQuery(GET_DOG_CLASSIFIEDS);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      dogBreedId: '',
      orderBy: 'MOST_RECENT',
      gender: '',
    }
  });
  const { loading, error, data: { getDogClassifieds } = {} } = useQuery(GET_DOG_CLASSIFIEDS);

  if (error) return `Error! ${error.message}`;

  const submitSearch = values => getFilteredDogClassifieds({ variables: values })
  const dogClassifieds = filteredDogClassifieds || getDogClassifieds;

  return (
    <>
      <Head>
        <title>La bibuterie - Annonces</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container lg:mx-auto py-2 lg:py-16">
        <h2 className="px-2 lg:px-0 text-2xl leading-tight font-bold tracking-wider">Toutes nos annonces de chiots</h2>
        <div className="flex px-2 lg:px-0 flex-col sm:flex-row items-center justify-end mt-2 lg:mt-8 mb-8">
          <div className="mx-4 w-full lg:w-64">
            <Select
              onChange={handleSubmit(submitSearch)}
              register={register}
              id="dogBreed"
              name="dogBreedId"
              label="Race: "
            >
              <option value="">Toutes les races</option>
              {dogBreeds && dogBreeds.map(dogBreed => (
                  <option key={dogBreed.id} value={dogBreed.id}>{dogBreed.name}</option>)
              )}
            </Select>
          </div>
          <div className="mx-4 w-full lg:w-64">
            <Select
              onChange={handleSubmit(submitSearch)}
              register={register}
              id="gender"
              name="gender"
              label="Genre: "
            >
              <option value="">Tous les genres</option>
              <option value="MALE">Mâle</option>
              <option value="FEMALE">Femelle</option>
            </Select>
          </div>
          <div className="ml-0 lg:ml-4 w-full lg:w-64">
            <Select register={register} id="orderBy" name="orderBy" label="Trier par: ">
              <option value="MOST_RECENT">Plus récent</option>
              <option value="POPULARITY">Popularité</option>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-16">
          {loading || filteredDogClassifiedsLoading ? (
            <>
              <div className="transition h-64 bg-gray-200 overflow-hidden border-2"/>
              <div className="transition h-64 bg-gray-200 overflow-hidden border-2"/>
              <div className="transition h-64 bg-gray-200 overflow-hidden border-2"/>
              <div className="transition h-64 bg-gray-200 overflow-hidden border-2"/>
              <div className="transition h-64 bg-gray-200 overflow-hidden border-2"/>
              <div className="transition h-64 bg-gray-200 overflow-hidden border-2"/>
            </>
          ) : (
            <>
              {dogClassifieds.map(dogClassified => (
                <div key={dogClassified.id} className="max-w-sm w-full lg:max-w-full lg:flex">
                  <div className="w-full lg:w-4/12 flex-none bg-cover text-center overflow-hidden" title="Woman holding a mug">
                    <img className="h-full" src="/sample.jpg" />
                  </div>
                  <div className="border-r w-full border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                      <div className="text-sm text-gray-600 flex items-center flex flex-row justify-between">
                        Donation par un Particulier
                        <Favorite
                          className="cursor-pointer"
                          color={dogClassifiedsLiked.includes(dogClassified.id) && '#e53e3e'}
                          onClick={() => toggleDogClassifiedLike({ variables: { dogClassifiedId: dogClassified.id } })}
                        />
                      </div>
                      <div className="text-pink-900 font-bold text-xl mb-2">
                        {dogClassified.name}, {dogClassified.dogBreed.name}
                      </div>
                      <p className="text-gray-700 text-base">{dogClassified.description}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="text-sm flex flex-row items-center">
                        <img className="w-10 h-10 rounded-full mr-4" src={dogClassified.classifiedUser.picture} alt="Avatar of Jonathan Reinink" />
                        <p className="text-gray-900 leading-none">{dogClassified.classifiedUser.name}</p>
                      </div>
                      <div className="bg-blue-900 self-end w-32 transform md:translate-x-8 text-center text-white p-2">
                        DONATION
                      </div>
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

export default dogClassifiedsListing;