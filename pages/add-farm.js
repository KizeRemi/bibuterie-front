import Head from 'next/head';
import gql from 'graphql-tag';
import { useForm } from "react-hook-form";
import { useMutation } from '@apollo/react-hooks';
import { Emoji } from 'emoji-mart';

const ADD_DOG_FARM = gql`
  mutation addDogFarm($input: DogFarmInput!) {
    addDogFarm(input: $input)
  }
`;

const AddDogFarm = () => {
  const [addDogFarm, { data }] = useMutation(ADD_DOG_FARM);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      description: '',
      name: '',
      town: '',
      address: '',
      hasShop: false,
      zipCode: '',
    }
  });

  const onSubmit = async ({ zipCode, ...data }) => {
    await addDogFarm({ variables: { input: { zipCode: parseInt(zipCode), ...data } } });
  };

  return (
    <>
      <Head>
        <title>La bibuterie - Ajouter mon élevage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold tracking-wider mb-12">Ajouter votre élevage<Emoji emoji={{ id: 'house_with_garden' }} size={28} /></h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full bg-gray-100" />
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <h2 className="text-xl font-bold tracking-wider mb-6">Informations générales</h2>
              <label class="block text-gray-700 text-m font-bold mb-2" for="name">
                Nom de votre élevage
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register}
                id="name"
                name="name"
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="col-span-2">
              <label class="block text-gray-700 text-m font-bold mb-2" for="address">
                Adresse
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register}
                id="address"
                name="address"
                type="text"
                placeholder="Adresse"
              />
            </div>
            <div>
              <label class="block text-gray-700 text-m font-bold mb-2" for="town">
                Ville
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register}
                id="town"
                name="town"
                type="text"
                placeholder="Ville"
              />
            </div>
            <div>
              <label class="block text-gray-700 text-m font-bold mb-2" for="zipCode">
                Code Postal
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register}
                type="number"
                id="zipCode"
                name="zipCode"
                type="text"
                placeholder="Code postal"
              />
            </div>
            <div className="col-span-2">
              <label class="md:w-2/3 block text-gray-500 font-bold">
                <input ref={register} class="mr-2 leading-tight" type="checkbox" name="hasShop" />
                <span class="text-sm">
                  il s'agit une boutique physique !
                </span>
              </label>
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 text-m font-bold mb-2" name="description">
                Décrivez votre élevage
              </label>
              <textarea
                ref={register}
                rows={6}
                name="description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="col-span-2 my-6">
            <button type="submit" class="bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              <span>Étape suivante</span>
            </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddDogFarm;