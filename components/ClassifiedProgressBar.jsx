import React from 'react';
import { Emoji } from 'emoji-mart';
import { ProgressBar, Step } from "react-step-progress-bar";

const ClassifiedProgressBar = ({ percent }) => {
  return (
   <div className="my-8">
      <ProgressBar
        percent={percent}
        height={15}
        filledBackground="linear-gradient(to right, #C2908d, #24214C)"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <span style={{ filter: `grayscale(${accomplished ? 0 : 1})` }}><Emoji emoji={{ id: 'ledger' }} size={32} /></span>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <span style={{ filter: `grayscale(${accomplished ? 0 : 1})` }}><Emoji emoji={{ id: 'dog' }} size={32} /></span>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <span style={{ filter: `grayscale(${accomplished ? 0 : 1})` }}><Emoji emoji={{ id: 'camera' }} size={32} /></span>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <span style={{ filter: `grayscale(${accomplished ? 0 : 1})` }}><Emoji emoji={{ id: 'house_with_garden' }} size={32} /></span>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <span style={{ filter: `grayscale(${accomplished ? 0 : 1})` }}><Emoji emoji={{ id: 'white_check_mark' }} size={32} /></span>
          )}
        </Step>
      </ProgressBar>
    </div>
  )
}

export default ClassifiedProgressBar;