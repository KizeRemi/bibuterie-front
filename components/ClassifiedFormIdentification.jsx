import React from 'react';
import { ErrorMessage } from "react-hook-form";


const ClassifiedFormIdentification = ({ register, errors, dogBreeds }) => {
  return (
    <>
      <h2 className="col-span-2 text-xl w-full font-bold tracking-wider mb-6">Identification du chien</h2>
      <div className="col-span-1">
        <label className="block text-gray-700 text-m font-bold mb-2" for="name">
          Nom du chien
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ref={register({ required: 'Le nom de votre chien est obligatoire.' })}
          id="name"
          name="name"
          type="text"
          placeholder="Name"
        />
        <ErrorMessage as="span"  className="text-red-500 text-xs italic"  errors={errors} name="name" />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="grid-state">
          Race
        </label>
        <div className="relative">
          <select
            ref={register({ required: 'La race est obligatoire.' })}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="dogBreed"
            name="dogBreed"
          >
            {dogBreeds && dogBreeds.map(dogBreed => <option key={dogBreed.id} value={dogBreed.id}>{dogBreed.name}</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <label className="block text-gray-700 text-m font-bold mb-2" for="birthDay">
          Date de naissance
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ref={register({ required: 'La date de naissance est obligatoire.' })}
          id="birthDate"
          name="birthDate"
          type="text"
          placeholder="Date de naissance"
        />
        <ErrorMessage as="span" className="text-red-500 text-xs italic" errors={errors} name="birthDate" />
      </div>
      <div className="col-span-1">
        <label className="md:w-2/3 block text-gray-500 font-medium">
          <input ref={register} className="mr-2 leading-tight" type="checkbox" name="isVaccinated" />
          <span className="text-sm">
            Le chien est vacciné.
          </span>
        </label>
      </div>
      <div className="col-span-1">
        <label className="md:w-2/3 block text-gray-500 font-bold">
          <input ref={register} className="mr-2 leading-tight" type="checkbox" name="isDewormed" />
          <span className="text-sm">
            Le chien est vermifugé.
          </span>
        </label>
      </div>
      <div className="col-span-2">
        <label className="md:w-2/3 block text-gray-500 font-bold">
          <input ref={register} className="mr-2 leading-tight" type="checkbox" name="isLof" />
          <span className="text-sm">
            Le chien appartient au LOF / LOOF.
          </span>
        </label>
      </div>
      <div>
        <label className="block text-gray-700 text-m font-bold mb-2" for="id">
          Numéro d'identification
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ref={register({ required: `Veuillez spécifier le numero d'identification du chien.` })}
          id="numberId"
          name="numberId"
          type="text"
          placeholder="Numéro d'identification"
        />
        <ErrorMessage as="span" className="text-red-500 text-xs italic"  errors={errors} name="numberId" />
      </div>
    </>
  )
}

export default ClassifiedFormIdentification;