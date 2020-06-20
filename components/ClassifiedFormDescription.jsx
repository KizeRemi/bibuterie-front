import React from 'react';

const ClassifiedFormDescription = ({ register }) => {
  return (
    <div className="col-span-2">
      <label className="block text-gray-700 mb-2 text-sm uppercase" name="description">
        Décrivez votre chien
      </label>
      <textarea
        ref={register}
        rows={12}
        name="description"
        className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  )
}

export default ClassifiedFormDescription;