import React from 'react'
import './Button.css'

function shareButton() {
  return (
    <div>
            <button type="button" class="share-button">
  <span class="button__text">Share</span>
  <span class="button__icon"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 134 134"
      class="svg"
    >
      <circle
        stroke-width="13"
        stroke="white"
        r="20.5"
        cy="27"
        cx="107"
      ></circle>
      <circle
        stroke-width="13"
        stroke="white"
        r="20.5"
        cy="107"
        cx="107"
      ></circle>
      <circle
        stroke-width="13"
        stroke="white"
        r="20.5"
        cy="67"
        cx="27"
      ></circle>
      <line
        stroke-width="13"
        stroke="white"
        y2="36.1862"
        x2="88.0931"
        y1="56.1862"
        x1="48.0931"
      ></line>
      <line
        stroke-width="13"
        stroke="white"
        y2="97.6221"
        x2="89.0893"
        y1="78.1486"
        x1="48.8304"
      ></line>
    </svg>
  </span>
</button>
    </div>
  )
}

export default shareButton;

