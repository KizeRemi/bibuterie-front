import React from 'react';
import { ErrorMessage } from "react-hook-form";


const ClassifiedFormIdentification = ({ register, errors, dogBreeds }) => {
  return (
    <>
      <h2 className="col-span-2 text-xl w-full font-bold tracking-wider mb-2">Identification du chien</h2>
      <div className="col-span-2 lg:col-span-1 mb-0 lg:mb-4">
        <label className="block text-gray-700 mb-2 text-sm uppercase" for="name">
          Nom complet
        </label>
        <input className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ref={register({ required: 'Le nom de votre chien est obligatoire.' })}
          id="name"
          name="name"
          type="text"
          placeholder="Name"
        />
        <ErrorMessage as="span"  className="text-red-500 text-xs italic"  errors={errors} name="name" />
      </div>
      <div className="col-span-2 lg:col-span-1 mb-2 lg:mb-4">
        <label className="block text-gray-700 mb-2 text-sm uppercase" htmlFor="grid-state">
          Race
        </label>
        <div className="relative">
          <select
            ref={register({ required: 'La race est obligatoire.' })}
            className="block appearance-none w-full bg-gray-200 border text-gray-700 py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="dogBreed"
            name="dogBreed"
            placeholder="Sélectionner la race..."
          >
            <option value="">Sélectionnez une race...</option>
            {dogBreeds && dogBreeds.map(dogBreed => <option key={dogBreed.id} value={dogBreed.id}>{dogBreed.name}</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
        <ErrorMessage as="span" className="text-red-500 text-xs italic" errors={errors} name="dogBreed" />
      </div>
      <div className="col-span-2 lg:col-span-1 mb-2 lg:mb-4">
        <div className="block text-gray-700 text-sm uppercase" htmlFor="grid-state">Sexe</div>
        <div class="inline-flex">
          <label htmlFor="ok1" className="mr-6" >
            <input className="mr-2" name="gender" type="radio" ref={register({ required: 'Le sexe est obligatoire.' })} value="MALE" />
            Male
          </label>
          <label for="ok2">
            <input className="mr-2" name="gender" type="radio" ref={register({ required: 'Le sexe est obligatoire.' })} value="FEMALE" />
            Femelle
          </label>
        </div><br />
        <ErrorMessage as="span" className="text-red-500 text-xs italic" errors={errors} name="gender" />
      </div>
      <div className="col-span-2 mb-2 lg:mb-4">
        <label className="block text-gray-700 mb-2 text-sm uppercase" for="birthDay">
          Date de naissance
        </label>
        <input className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ref={register({ required: 'La date de naissance est obligatoire.' })}
          id="birthDate"
          name="birthDate"
          type="text"
          placeholder="Date de naissance"
        />
        <ErrorMessage as="span" className="text-red-500 text-xs italic" errors={errors} name="birthDate" />
      </div>
      <div className="col-span-2 lg:col-span-1">
        <label className="md:w-2/3 block text-gray-700 font-medium">
          <input ref={register} className="mr-2 leading-tight" type="checkbox" name="isVaccinated" />
          <span className="text-sm">
            Le chien est vacciné.
          </span>
        </label>
      </div>
      <div className="col-span-2 lg:col-span-1">
        <label className="md:w-2/3 block text-gray-700 font-medium">
          <input ref={register} className="mr-2 leading-tight" type="checkbox" name="isDewormed" />
          <span className="text-sm">
            Le chien est vermifugé.
          </span>
        </label>
      </div>
      <div className="col-span-2 mb-2 lg:mb-4">
        <label className="md:w-2/3 block text-gray-700 font-medium">
          <input ref={register} className="mr-2 leading-tight" type="checkbox" name="isLof" />
          <span className="text-sm">
            Le chien appartient au LOF / LOOF.
          </span>
        </label>
      </div>
      <div className="col-span-2 lg:col-span-1 mb-2 lg:mb-4">
        <label className="block text-gray-700 mb-2 text-sm uppercase" for="id">
          Numéro d'identification
        </label>
        <input className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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