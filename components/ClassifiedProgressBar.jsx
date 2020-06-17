import React from 'react';

const ClassifiedProgressBar = ({ percent }) => {
  return (
    <div className="shadow w-full bg-grey-light mt-2">
      <div className="gradient text-xs leading-none py-1 text-center text-white" style={{ width: `${percent}%`}}>
        {`${percent}%`}
      </div>
    </div>
  )
}

export default ClassifiedProgressBar;