<script>
    import Banners from '$components/music_banner.svelte';

    export let data;

    import { onMount } from 'svelte';

    export let display_arrow_hit = "block";
    export let is_near_music_color_date = "orange";

    export let display_correct_icon = "none";

    let total_time = "99.99";
    let current_time = "0";

    let debounceTimer;
    let musics = [];

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
                musics = data.tracks.items;
            return;
            }
        }
        musics = [];
        }, 750);
    };

    const checkTrack = (item) => {
        if (item.album.artists[0].name == data.music.artists[0].name &&
            item.name == data.music.track.name) {
            guessedCorrectly = true;
        }

        isFocused = false;
    };

    const calc_date_time = (item) => {
        const itemReleaseDate = new Date(item.album.release_date);
        const musicReleaseDate = new Date(data.music.album.release_date);

        if (itemReleaseDate.getTime() === musicReleaseDate.getTime()) {
            is_near_music_color_date = "green";
            display_arrow_hit = "none";
            display_correct_icon = "block";
        }
    };

    let audio;
    let audioVolume = 0.7;
    let isPlaying = false;
    let mute_audio = false;

    const play_or_stop = () => {
        if (!audio) {
            audio = new Audio(data.music.track.audio_preview);
            audio.volume = mute_audio ? 0 : audioVolume;

            audio.ontimeupdate = () => {
                current_time = audio.currentTime.toFixed(2);
            };
            audio.onloadedmetadata = () => {
                total_time = audio.duration.toFixed(2);
            };
        }

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        
        isPlaying = !isPlaying;
    };

    onMount(() => {
        if (audio) {
            audio.volume = mute_audio ? 0 : audioVolume;
            audio.ontimeupdate = () => {
                current_time = audio.currentTime.toFixed(2);
            };
            audio.onloadedmetadata = () => {
                total_time = audio.duration.toFixed(2);
            };
        }
    });

    const return_five = () => {
        console.log("clicked");
        if (audio) {
            audio.currentTime = Math.max(0, audio.currentTime - 5);
        }
    };

    const move_five = () => {
        console.log("clicked");
        if (audio) {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
        }
    };

    const mute_the_audio = () => {
        mute_audio = !mute_audio;
        if (audio) {
            audio.volume = mute_audio ? 0 : audioVolume;
        }
    };

    // Ensure audio volume is updated when the component is mounted
    onMount(() => {
        if (audio) {
            audio.volume = mute_audio ? 0 : audioVolume;
        }
    });
    
</script>
<!-- <audio controls>
<source src={data.music.track.audio_preview} type="audio/mpeg" />
Your browser does not support the audio tag.
</audio> -->

<div class="container">
    <div class="holder">
        <div class="music-popup">
            {#each musics as music}
                <Banners banner={music.album.images[0].url} music_name={music.name} artist_name={music.album.artists[0].name} 
                music_date={music.album.release_date} data={data}/>
            {/each}
        </div>
    </div>
    <div class="right-side">
        <div class="type-area">
            <input class="input-box" type="text" placeholder="Your guess goes here." 
            on:focus={handleFocus}
            on:focusout={handleBlur}
            on:keyup={({ target: { value } }) => debounce(value)}
            />
        </div>
        <div class="sub-text">
            <h2>now playing <span>guess the music</span></h2>
        </div>
        <div class="controls-container">
            <button on:click={return_five} class="return_five">
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" {...$$props}>
                    <g fill="none" stroke="white" stroke-linecap="round" stroke-width="1">
                        <path stroke-linejoin="round" d="M14 4.5L12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-4.1 2.468-7.625 6-9.168" />
                        <path d="M14 8.5h-2.64a.5.5 0 0 0-.474.342l-.667 2a.5.5 0 0 0 .475.658H12a2 2 0 1 1 0 4h-2" />
                    </g>
                </svg>
            </button>
            <button on:click={play_or_stop} class="play_or_stop">
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" {...$$props}>
                    <g fill="none" stroke="white" stroke-width="1">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M15.414 10.941c.781.462.781 1.656 0 2.118l-4.72 2.787C9.934 16.294 9 15.71 9 14.786V9.214c0-.924.934-1.507 1.694-1.059z" />
                    </g>
                </svg>
            </button>
            <button on:click={move_five} class="move_five">
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" {...$$props}>
                    <g fill="none" stroke="white" stroke-linecap="round" stroke-width="1">
                        <path stroke-linejoin="round" d="M10 4.5L12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10c0-4.1-2.468-7.625-6-9.168" />
                        <path d="M14 8.5h-2.64a.5.5 0 0 0-.474.342l-.667 2a.5.5 0 0 0 .475.658H12a2 2 0 1 1 0 4h-2" />
                    </g>
                </svg>
            </button>
        </div>
        <div class="volume">
            {#if !mute_audio}
                <button on:click={mute_the_audio} class="volume-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" {...$$props}>
                        <g fill="none">
                            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                            <path fill="white" d="M13.26 3.3a1.1 1.1 0 0 1 1.734.78l.006.114v15.612a1.1 1.1 0 0 1-1.643.957l-.096-.062L6.68 16H4a2 2 0 0 1-1.995-1.85L2 14v-4a2 2 0 0 1 1.85-1.995L4 8h2.68zm6.407 3.483A7 7 0 0 1 22 12a7 7 0 0 1-2.333 5.217a1 1 0 1 1-1.334-1.49A5 5 0 0 0 20 12c0-1.48-.642-2.81-1.667-3.727a1 1 0 1 1 1.334-1.49m-2 2.236A4 4 0 0 1 19 11.999a4 4 0 0 1-1.333 2.982a1 1 0 0 1-1.422-1.4l.088-.09c.41-.368.667-.899.667-1.491a2 2 0 0 0-.548-1.376l-.119-.115a1 1 0 1 1 1.334-1.49" />
                        </g>
                    </svg>
                </button>
            {:else}
                <button on:click={mute_the_audio} class="volume-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 20 20" {...$$props}>
                        <path fill="white" fill-rule="evenodd" d="M9.383 3.076A1 1 0 0 1 10 4v12a1 1 0 0 1-1.707.707L4.586 13H2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2.586l3.707-3.707a1 1 0 0 1 1.09-.217m2.91 4.217a1 1 0 0 1 1.414 0L15 8.586l1.293-1.293a1 1 0 1 1 1.414 1.414L16.414 10l1.293 1.293a1 1 0 0 1-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 0 1-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 0 1 0-1.414" clip-rule="evenodd" />
                    </svg>
                </button>
            {/if}
            <input type="range" class="range-bar" min="0" max="1" step="0.01" bind:value={audioVolume} on:input={() => { if (audio) audio.volume = audioVolume; }} />
        </div>
        <div class="bar-container">
            <progress class="progress-bar" value={current_time} max={total_time}></progress>
        </div>
    </div>
</div>

<style>

    *{
        font-family: "Inter", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
    }

    .container {
        width: 100vw;
        height: 100vh;
    }
    
    .music-popup {
        background-color: #8d1832;
        border-radius: 25px;
        gap: 20px 20px;
        right: 0;
        width: 55%;
        max-width: 55%;
        min-height: 90vh;
        max-height: 90vh;
        display: flex;
        flex-wrap: wrap;
        position: absolute;
        align-items: center;
        justify-content: center;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 30px;
        margin-top: 10px;
        box-shadow: inset 0 0 20px rgba(0, 0, 0, 1);
    }

    .music-popup::-webkit-scrollbar {
        width: 10px;
    }

    .music-popup::-webkit-scrollbar-track {
        background: #141414;
    }

    .music-popup::-webkit-scrollbar-thumb {
        background: #888;
    }

    .music-popup::-webkit-scrollbar-thumb:hover {
        background: #1ED760;
    }

    .right-side{
        width: 45%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }

    .type-area{
        width: 90%;
        height: 100%;
        display: flex;
        font-size: 2.5em;
    }

    .input-box{
        width: 100%;
        height: auto;
        border: none;
        background-color: transparent;
        color: white;
        font-size: 1.5em;
        padding: 10px;
        margin-top: 10px;
        border-bottom: 2px solid transparent;
        transition: border-bottom 0.3s ease-out;
    }

    .input-box:focus{
        outline: none;
        border-bottom: 2px solid white !important;
    }

    .input-box:hover{
        border-bottom: 2px solid #1ED760;
    }

    .input-box::placeholder{
        user-select: none;
    }

    .sub-text{
        width: 90%;
        height: 100%;
        display: flex;
        font-size: 2em;
        margin-top: 20px;
    }

    .sub-text h2{
        margin: 0;
        padding: 0;
        color: rgba(255, 255, 255, 0.5);
        font-style: italic;
    }

    .sub-text span{
        color: hsla(272, 100%, 50%, 0.5);
        font-style: italic;
    }

    .controls-container{
        width: 90%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin-top: 20px;
    }

    .controls-container button{
        border: none;
        cursor: pointer;
        background-color: transparent;
        transition: transform 0.3s ease-out;
    }

    .progress-bar{
        width: 90%;
        height: 20px;
        margin-top: 20px;
        border-radius: 10px;
        background-color: #141414;
    }

    .progress-bar::-webkit-progress-bar {
        background-color: #141414;
    }

    .progress-bar::-webkit-progress-value {
        background-color: #1ED760;
    }

    .volume{
        width: 90%;
        height: auto;
        display: flex;
        justify-content: flex-start;
    }

    .volume button{
        border: none;
        cursor: pointer;
        background-color: transparent;
        transition: transform 0.3s ease-out;
    }

    .volume-icon:hover{
        transform: scale(1.1);
    }

    .volume-icon:active{
        transform: scale(0.8);
        transition: transform 0.3s ease-out;
    }

    input[type=range] {
        width: 100%;
        margin: 0;
        padding: 0;
        background: transparent;
    }

    /* Track styling */
    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 15px;
        background-color: #141414; /* Background color */
    }

    /* Thumb (slider button) styling for Webkit browsers (Chrome, Safari) */
    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px; /* Size of the thumb */
        height: 20px;
        background-color: #FF4500; /* Thumb color */
        border-radius: 50%; /* Rounded thumb */
        cursor: pointer;
    }

    /* For Firefox */
    input[type=range]::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background-color: #FF4500; /* Thumb color */
        border-radius: 50%;
        cursor: pointer;
    }

    /* For Internet Explorer */
    input[type=range]::-ms-thumb {
        width: 20px;
        height: 20px;
        background-color: #FF4500; /* Thumb color */
        border-radius: 50%;
        cursor: pointer;
    }

</style>
