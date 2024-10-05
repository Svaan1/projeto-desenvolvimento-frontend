<script>
  /** @type {import('./$types').PageData} */
  export let data;

  let debounceTimer;
  let currentSearchedValues = [];

  let isFocused = false;
  let guessedCorrectly = false;

  function handleFocus() {
    isFocused = true;
  }

  function handleBlur(e) {
    if (!e.relatedTarget || !e.relatedTarget.classList.contains("track-item")) {
      isFocused = false;
    }
  }

  const debounce = async (v) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      if (v) {
        let response = await fetch(`/api/search?q=${v}&t=track`);
        if (response.ok) {
          let data = await response.json();
          currentSearchedValues = data.tracks.items;
          return;
        }
      }
      currentSearchedValues = [];
    }, 750);
  };

  const checkTrack = (item) => {
    if (
      item.album.artists[0].name == data.music.artists[0].name &&
      item.name == data.music.track.name
    ) {
      guessedCorrectly = true;
    }

    isFocused = false;
  };
</script>

<div class="outer-container">
  <div class="top-text">
    <h3>I think today's music is</h3>
  </div>

  <div>
    <div class="search-bar">
      <input
        type="text"
        class="search-input"
        on:focus={handleFocus}
        on:focusout={handleBlur}
        on:keyup={({ target: { value } }) => debounce(value)}
      />
      <button class="search-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          {...$$props}
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path stroke-dasharray="20" stroke-dashoffset="20" d="M21 12h-17.5">
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.2s"
                values="20;0"
              />
            </path>
            <path
              stroke-dasharray="12"
              stroke-dashoffset="12"
              d="M3 12l7 7M3 12l7 -7"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.2s"
                dur="0.2s"
                values="12;0"
              />
            </path>
          </g>
        </svg>
      </button>
    </div>
  </div>

  {#if data.music.message == null}
    <div class="inner-container">
      <div
        class="correct-music-data"
        style="display: {guessedCorrectly ? 'block' : 'none'}"
      >
        <div class="music-thumb">
          <img src={data.music.album.image} alt="music-thumb" />
        </div>
        <div class="music-related">
          <h3>{data.music.track.name}</h3>
          <p>{data.music.artists[0].name}</p>
        </div>
      </div>

      <audio controls>
        <source src={data.music.track.audio_preview} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>

      {#if isFocused}
        <div class="search-results">
          {#each currentSearchedValues as item}
            <button
              class="track-item"
              on:click={() => {
                checkTrack(item);
              }}
            >
              <img src={item.album.images[2].url} alt="" />
              {item.name}
              {item.album.artists[0].name}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .outer-container {
    width: 100%;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgb(14, 14, 14);
  }

  .track-item {
    width: 300px; /* Set a fixed width for each button */
    display: flex; /* Flexbox for alignment */
    align-items: center; /* Center items vertically */
    justify-content: flex-start; /* Align items to the start */
    padding: 10px; /* Add some padding */
    margin: 5px 0; /* Add space between buttons */
    background-color: rgba(
      255,
      255,
      255,
      0.1
    ); /* Optional background color for contrast */
    border: none; /* Remove default button border */
    border-radius: 5px; /* Optional: rounded corners */
    color: white; /* Set text color */
    cursor: pointer; /* Change cursor to pointer */
    transition: background-color 0.3s; /* Smooth background transition */
    z-index: 1000;
  }

  .track-item:hover {
    background-color: rgba(255, 255, 255, 0.2); /* Change background on hover */
  }

  .search-results {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    color: white; /* Set text color to white for better contrast */
    background-color: rgba(0, 0, 0, 0.8); /* Dark background for the results */
    z-index: 1001; /* Higher than the overlay to ensure it appears above */
    /* position: relative; */
    width: 100%;
    height: 100%;
    position: absolute;
    overflow-y: auto; /* Optional: allow vertical scrolling */
  }
  .top-text h3 {
    font-family: "Roboto", sans-serif;
    color: white;
    font-size: 2em;
    position: absolute;
    top: 5vh;
  }

  .top-text h3::after {
    content: ".";
    display: inline-block;
    animation: dots 1.5s steps(5, end) infinite;
  }

  @keyframes dots {
    0%,
    20% {
      color: rgba(255, 255, 255, 0);
      text-shadow:
        0.25em 0 0 rgba(255, 255, 255, 0),
        0.5em 0 0 rgba(255, 255, 255, 0);
    }
    40% {
      color: white;
      text-shadow:
        0.25em 0 0 rgba(255, 255, 255, 0),
        0.5em 0 0 rgba(255, 255, 255, 0);
    }
    60% {
      text-shadow:
        0.25em 0 0 white,
        0.5em 0 0 rgba(255, 255, 255, 0);
    }
    80%,
    100% {
      text-shadow:
        0.25em 0 0 white,
        0.5em 0 0 white;
    }
  }

  .search-bar {
    top: 13vh;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    flex-direction: row;
  }

  .search-input {
    width: 100%;
    font-size: 2em;
    padding: 2px;
    border: none;
    outline: none;
    border-radius: 0;
    background: transparent;
    color: #808080;
    border-bottom: 1px solid white;
  }

  .search-btn {
    margin-bottom: 5px;
    border: none;
    background-color: rgb(255, 255, 255);
    transition: background-color 0.3s;
    color: rgb(0, 0, 0);
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1em;
  }

  .search-btn:hover {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    transition: background-color 0.3s;
  }

  .search-btn svg {
    transform: rotate(0deg);
    transition: transform 0.3s;
  }

  .search-btn:hover svg {
    transform: rotate(180deg);
    transition: transform 0.3s;
  }

  .search-btn:active {
    transform: scale(0.9);
    transition: transform 0.1s;
  }

  .inner-container {
    border: 1px solid white;
    width: 50%;
    height: 70%;
    top: 20vh;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .music-thumb {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
  }

  .music-thumb img {
    width: 200px;
    height: 200px;
  }

  @keyframes spin {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(-180deg);
    }
  }
  .music-related {
    color: white;
    font-size: 2em;
    font-family: "Roboto", sans-serif;
    text-align: center;
  }
</style>
