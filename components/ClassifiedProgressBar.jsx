import React from 'react';

const ClassifiedProgressBar = ({ percent }) => {
  return (
    <div className="shadow w-full bg-grey-light my-2">
      <div className="gradient h-5 text-xs leading-none py-1 text-center text-white" style={{ width: `${percent}%`}} />
    </div>
  )
}

export default ClassifiedProgressBar;