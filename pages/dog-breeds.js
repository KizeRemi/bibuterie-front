import Head from 'next/head';
import React from 'react';
import gql from 'graphql-tag';
import { Emoji } from 'emoji-mart';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { Chat, Favorite, FormSearch } from 'grommet-icons';
import { useForm } from "react-hook-form";
import Select from '../components/Select';

const GET_DOG_BREEDS = gql`
  query getDogBreeds($search: String, $orderBy: BREED_ORDER_BY) {
    getDogBreeds(search: $search, orderBy: $orderBy) {
      id
      name
      image
    }
  }
`;

const dogBreeds = () => {
  const { loading, error, data: { getDogBreeds } = {} } = useQuery(GET_DOG_BREEDS);
  const [getFilteredDogBreeds, {
    loading: filteredDogBreedsLoading, data: { getDogBreeds: filteredDogBreeds } = {}
  }] = useLazyQuery(GET_DOG_BREEDS);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      orderBy: 'ALPHABETIC',
      search: null,
    }
  });
  const submitSearch = values => getFilteredDogBreeds({ variables: values })
  const dogBreeds = filteredDogBreeds || getDogBreeds;

  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Head>
        <title>La bibuterie - Toutes les races</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto py-16">
        <h2 className="text-2xl font-bold tracking-wider">Toutes les races de chiens</h2>
        <p className="text-m text-gray-600 mt-3 mb-12 sm:mb-2">
          Découvrez toutes les races de chiens, avec de nombreux détails sur leurs comportements, l'éducation, etc.
          Vous pourrez également accéder aux commentaires de nombreux maitres chiens qui peuvent partager leurs expériences canines ! 
          <Emoji emoji={{ id: 'dog2' }} size={24} />
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-end mb-6">
          <div class="w-64 mx-4">
            <label className="uppercase text-sm text-gray-600">Rechercher: </label>
            <div className="relative">
              <input onChange={handleSubmit(submitSearch)} className="block appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register()}
                id="search"
                name="search"
                type="text"
                placeholder="Rechercher"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FormSearch size="medium" color="#666666" />
              </div>
            </div>
          </div>
          <Select register={register} id="orderBy" name="orderBy" label="Trier par:">
            <option value="POPULARITY">Popularité</option>
            <option value="ALPHABETIC">Ordre alphabétique</option>
            <option value="MOST_COMMENTS">Les plus commentés</option>
          </Select>
        </div>
        <div class="grid xl:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 gap-6">
          {(loading || filteredDogBreedsLoading) ? (
            <>
              <div class="transition h-56 bg-gray-200 overflow-hidden border-2"/>
              <div class="transition h-56 bg-gray-200 overflow-hidden border-2"/>
              <div class="transition h-56 bg-gray-200 overflow-hidden border-2"/>
              <div class="transition h-56 bg-gray-200 overflow-hidden border-2"/>
              <div class="transition h-56 bg-gray-200 overflow-hidden border-2"/>
              <div class="transition h-56 bg-gray-200 overflow-hidden border-2"/>
            </>
          ) : (
            <>
            {dogBreeds.map(dogBreed => (
              <div class="text-sm tracking-wider bg-white overflow-hidden border">
                <img className="h-56 w-full" src={dogBreed.image} />
                <div class="flex flex-col text-gray-800 px-2">
                  <a href="#" className="text-base font-medium uppercase py-2">{dogBreed.name}</a>
                  <div class="py-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2">#petit</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2">#mignon</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2">#rapide</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2">#rapide</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2">#rapide</span>
                  </div>
                  <div className="flex justify-end border-t py-2">
                    <div className="flex items-center mr-2 font-xs text-gray-700">
                      <Chat className="mr-1" />
                      <span>1k+</span>
                    </div>
                    <div className="flex items-center font-xs text-gray-700">
                      <Favorite className="mr-1" />
                      <span>312</span>
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

export default dogBreeds;