import Head from 'next/head';
import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { Emoji } from 'emoji-mart';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { Chat, Favorite, FormSearch } from 'grommet-icons';
import { useForm } from "react-hook-form";

import { GET_USER_LIKED } from '../graphql/dogClassifiedsLike';
import { TOGGLE_DOG_BREED_LIKE } from '../graphql/dogBreedsLike';
import Select from '../components/Select';
import { UserContext } from '../providers/UserProvider';

const GET_DOG_BREEDS = gql`
  query getDogBreeds($search: String, $orderBy: BREED_ORDER_BY) {
    getDogBreeds(search: $search, orderBy: $orderBy) {
      id
      name
      image
      like
    }
  }
`;

const dogBreeds = () => {
  const { dogBreedsLiked } = useContext(UserContext);
  const { loading, error, data: { getDogBreeds } = {} } = useQuery(GET_DOG_BREEDS);
  const [toggleDogbreedLike] = useMutation(TOGGLE_DOG_BREED_LIKE, {
    refetchQueries: [{ query: GET_USER_LIKED }, { query: GET_DOG_BREEDS }]
  });
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
      <div className="container lg:mx-auto py-2 lg:py-12">
        <h2 className="px-2 lg:px-0 text-2xl leading-tight font-bold tracking-wider py-4">Toutes les races de chiens</h2>
        <p className="px-2 lg:px-0 text-m leading-tight text-gray-600 mt-3 sm:mb-2">
          Découvrez toutes les races de chiens, avec de nombreux détails sur leurs comportements, l'éducation, etc.
          Vous pourrez également accéder aux commentaires de nombreux maitres chiens qui peuvent partager leurs expériences canines ! 
          <Emoji emoji={{ id: 'dog2' }} size={24} />
        </p>
        <div className="flex px-2 lg:px-0 flex-col sm:flex-row justify-end mt-4 lg:mt-8 mb-8">
          <div class="w-full lg:w-64 mx-0 lg:mx-4">
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
                      <Favorite
                        className="cursor-pointer mr-1"
                        color={dogBreedsLiked.includes(dogBreed.id) && '#e53e3e'}
                        onClick={() => toggleDogbreedLike({ variables: { dogBreedId: dogBreed.id } })}
                      />
                      <span>{dogBreed.like}</span>
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