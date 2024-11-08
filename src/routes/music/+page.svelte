<script>
    import Cards from '$components/music_cards.svelte';
    import { onMount } from 'svelte';

    export let data;

    let total_time = "00:30";
    let current_time = "00:00";
    let debounceTimer;
    // let musics = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    let musics = [];
    let tries = [];
    let lives = 1;

    let isFocused = false;
    let guessedCorrectly = false;

    function handleFocus() {
        isFocused = true;
    };

    function handleBlur(e) {
        if (!e.relatedTarget || !e.relatedTarget.classList.contains("track-item")) {
        isFocused = false;
        }
    };

    async function debounce(v) {
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
    let audioVolume = 0.1;
    let isPlaying = false;
    let mute_audio = false;

    function play_or_stop(){
        isPlaying = !isPlaying;
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

    function return_five(){
        console.log("clicked");
        if (audio) {
            audio.currentTime = Math.max(0, audio.currentTime - 5);
        }
    };

    function move_five(){
        console.log("clicked");
        if (audio) {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
        }
    };

    function mute_the_audio(){
        mute_audio = !mute_audio;
        if (audio) {
            audio.volume = mute_audio ? 0 : audioVolume;
        }
    };

    function returnHome()
    {
        window.location.href = "/home";
        goto("/home");
    };

</script>

<div class="container">
    <div class="top">
        <button class="icon-button" on:click={() => returnHome}>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
                <path fill="white" d="m59.836 58.25l-3.447-21.553l3.24-17.822h.496c.651 0 1.287-.295 1.635-.896a1.795 1.795 0 0 0-.655-2.448l-.785-.453l.011-.062l-.102.01L37.625 2h-11.25L2.896 26.783a1.797 1.797 0 0 0-.657 2.448a1.8 1.8 0 0 0 2.452.655l2.789-3.104l1.998 5.327L5.992 58.25H2V62h60v-3.75zm-5.32-21.73l-.029.158l3.451 21.572h-2.5l-3.416-6.833l1.541-12.854l-3.024 9.89l-2.601-5.202l3.213 15h-2.742l-3.263-12.236l4.377-27.141l8.201.001zM39.645 6.781V4.813l4.543 3.75h3.534l3.028 3.75l-4.039-1.84h-3.029l-6.057-3.691zm-28.247 25.11L8.893 25.21L26.375 5.75l21.321 12.671l-4.467 27.69l3.237 12.139H24.5l-1.331-5.99l3.412-.77l1.113-.25l-1.019-2.282l.145-.867l.479-2.899l.15-.904l-.902-.169l-2.792-.524l.745-4.095h-9.643l-.567 2.316l-2.262-.425l-.941-.177l-.156.944l-.48 2.899l-.149.904l.901.169l2.109.396l.427 3.235l-2.569.542l-1.112.251l.461 1.043l1.101 2.49l.312.705l.752-.17l1.648-.371l.527 3.996H7.884zm14.207 16.946l.77 1.739l-13.899 3.135l-1.101-2.49l12.232-2.76zm-14.23-3.626l.479-2.898l14.521 2.727l-.479 2.898z" />
                <path fill="white" d="M55.438 24.5h-4.374L49.813 32h4.372zM24.5 32l-1.875-7.5h-7.5L17 32zm16.875 3.75l1.875-7.5l-3.75-3.75H32L30.125 32h7.5zm-1.367-9.416l2.204 2.203l-1.345 5.379l-2.204-2.203zm.43 26.291L39.33 44.97l1.108-5.47h-9.206l-2.044 6.563l2.044 6.562z" />
            </svg>
        </button>
        <div class="search-container">
            <svg class="magnify" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                <path fill="white" d="m479.6 399.716l-81.084-81.084l-62.368-25.767A175 175 0 0 0 368 192c0-97.047-78.953-176-176-176S16 94.953 16 192s78.953 176 176 176a175.03 175.03 0 0 0 101.619-32.377l25.7 62.2l81.081 81.088a56 56 0 1 0 79.2-79.195M48 192c0-79.4 64.6-144 144-144s144 64.6 144 144s-64.6 144-144 144S48 271.4 48 192m408.971 264.284a24.03 24.03 0 0 1-33.942 0l-76.572-76.572l-23.894-57.835l57.837 23.894l76.573 76.572a24.03 24.03 0 0 1-.002 33.941" />
            </svg>
            <input type="text" class="search-bar" placeholder="I think today's music is..." on:keyup={({ target: { value } }) => debounce(value)} />
        </div>
    </div>
    <div class="content">
        <div class="left">
            <div>
                <div class="attempts-container">
                    {#if lives == 0}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 72 72" {...$$props}>
                            <path fill="#cecece" d="M29.7 71.8c-1.2 0-2.1-1-2.1-2.1v-2.8c0-1.2 1-2.1 2.1-2.1c1.2 0 2.1 1 2.1 2.1v2.8c0 1.1-1 2.1-2.1 2.1m5.4 0c-1.2 0-2.1-1-2.1-2.1v-2.8c0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1v2.8c.1 1.1-.9 2.1-2.1 2.1m5.5 0c-1.2 0-2.1-1-2.1-2.1v-2.8c0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1v2.8c0 1.1-1 2.1-2.1 2.1m5.4 0c-1.2 0-2.1-1-2.1-2.1v-2.8c0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1v2.8c.1 1.1-.9 2.1-2.1 2.1" />
                            <path fill="#e5e4df" d="M65.5 42.1L67 29.7C67 13.3 53.7 0 37.3 0S7.6 13.3 7.6 29.7L9 42.1c-1.1 1.8-1.7 4-1.7 6.3C7.4 55.3 13 61 20 61c1.2 0 2.3-.2 3.4-.5v2.2c0 2.4 1.9 4.3 4.3 4.3h19.8c2.4 0 4.3-1.9 4.3-4.3v-2.1c.9.2 1.8.3 2.8.3c7 0 12.6-5.7 12.6-12.6c0-2.2-.6-4.4-1.7-6.2" />
                            <path fill="#2b3b47" d="M25.6 37.5c-.3-2.5-2.4-4.5-5-4.5s-4.7 2-4.9 4.6h-.1v7c0 2.8 2.2 5 5 5s5-2.2 5-5zm32.7 0c-.3-2.5-2.4-4.5-5-4.5s-4.7 2-4.9 4.6h-.1v7c0 2.8 2.2 5 5 5s5-2.2 5-5zM37.5 49h.1c.1 0 .2 0 .4.1c.3.1.7.2 1 .4c.8.4 1.5 1.1 1.9 2c.4.8.6 1.8.5 2.7c-.1.4-.2.8-.3 1.1c0 .1-.1.3-.1.3c0 .1-.1.1-.1.1c-.2.4-.7.7-1.1.6h-.1c-.1 0-.2 0-.4-.1c-.3-.1-.7-.2-1.1-.4c-.8-.4-1.5-1.1-1.9-2c-.3-.8-.5-1.8-.3-2.6c.1-.4.2-.8.3-1.1c0-.1.1-.3.1-.3c0-.1.1-.1.1-.1c.1-.5.6-.8 1-.7" />
                            <path fill="#2b3b47" d="m38.1 49.6l.1.1c0 .1.1.2.1.3c.1.3.2.7.3 1.1c.1.9 0 1.9-.5 2.7c-.4.9-1.2 1.6-1.9 2c-.4.2-.8.3-1.1.4c-.1 0-.3.1-.4.1h-.1c-.5.1-.9-.1-1.1-.6l-.1-.1c0-.1-.1-.2-.1-.3c-.1-.3-.2-.7-.3-1.1c-.1-.9 0-1.9.5-2.7c.4-.8 1.2-1.6 1.9-2c.4-.2.8-.4 1-.4c.1 0 .3-.1.4-.1h.1c.6-.1 1 .2 1.2.6" />
                        </svg>
                    {:else if lives > 7}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...$$props}>
                            <path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z" />
                        </svg>
                    {:else if lives > 4}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...$$props}>
                            <path fill="currentColor" d="M12.025 21.925q-3.35-3.375-5.337-5.45t-3.025-3.45t-1.35-2.35T2 8.5q0-2.3 1.6-3.9T7.5 3q1.125 0 2.175.412T11.55 4.6L10 10h3l-.85 8.375L15 9h-3l1.775-5.3q.625-.35 1.313-.525T16.5 3q2.3 0 3.9 1.6T22 8.5q0 1.2-.325 2.2T20.3 13.088t-3.025 3.45t-5.25 5.387m-1.775-4.65L10.775 12H7.35l1.875-6.575q-.4-.2-.837-.312T7.5 5Q6.05 5 5.025 6.025T4 8.5q0 .775.288 1.55t1 1.763t1.924 2.3t3.038 3.162m4.7-1.2q2.775-2.825 3.913-4.5T20 8.5q0-1.45-1.025-2.475T16.5 5q-.275 0-.55.038t-.55.137L14.8 7h2.9zM7.35 12" />
                        </svg>
                    {:else if lives > 1}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" {...$$props}>
                            <path fill="currentColor" d="M171.125 20.28a603 603 0 0 0-10.844.095l-5.718.125l-2.5 5.125c-6.484 13.307-23.588 23.72-45.937 31.625c-8.73 3.088-18.122 5.803-27.72 8.313l9.657 16.812c8.253-2.24 16.435-4.714 24.313-7.5c22.043-7.795 42.253-18.258 53.375-35.813c54.302-.54 123.166 6.728 181.688 29.126c54.774 20.963 99.65 54.383 117.812 106.624c-2.063-.668-4.205-1.333-6.313-2l-63.28-52.593l-25.876 30l-43.124-46.47l-23.156 34.313l-45.28-45.907l-27.908 38.125l-46-45.81l-23.78 45.124l-38.782-27.72l-7.406 26.282l23.594 41.094c13.6-7.09 32.617-14.47 49.875-17.72c12.606-2.37 24.367-2.552 32.093-.31c7.727 2.24 11.237 5.162 12.656 13l1.813 9.968l9.78-2.594c74.608-19.777 168.01 4.457 231.97 26.437l15.78 5.44l-3.624-16.314C472.78 117.786 417.833 75.1 354.126 50.72c-59.725-22.86-127.835-30.473-183-30.44zM40.72 50.313c-12.622.486-23.765 10.62-23.376 28.626c94.07 133.71 175.316 272.647 239.47 417.562h41.436L52.406 53.22c-2.063-.898-4.34-1.96-6.437-2.345c-1.836-.336-3.45-.637-5.25-.563zM382.75 255.97c-8.857.08-17.908 1.26-26.97 3.686c-55.227 14.784-88.043 69.08-74.342 120.156c3.257 12.147 14.716 25.216 29.468 36.344c10.09 7.61 21.485 14.305 32.063 19.72c-2.054-13.744-5.87-27.03-13.064-39.938l16.313-9.094c18.71 33.585 17.717 68.118 18.03 100.906c9.32 1.53 18.46 3.04 27.47 4.188l1.842-34l18.657 1l-1.876 34.78c11.114.645 22.016.378 32.75-1.406l-1.656-35.375l18.687-.843l1.438 31.47a104.5 104.5 0 0 0 19.968-9.627c.64-5.552 2.86-25.628 4.033-53.968c.565-13.672.764-28.563.312-43.095c-15.635 4.024-31.625-5.263-35.813-20.875c-4.212-15.705 5.12-31.853 20.844-36.063a29.8 29.8 0 0 1 7.375-1h.064C465.917 283.512 428.73 257.113 386.53 256a103 103 0 0 0-3.78-.03m4.72 70.936c15.152-.15 29.052 9.89 33.155 25.188c4.863 18.13-5.88 36.766-24.03 41.625c-18.153 4.858-36.826-5.903-41.69-24.033c-4.86-18.13 5.912-36.766 24.064-41.625a34 34 0 0 1 8.5-1.156zm51.936 46.188L465 426.72l-38.563 6.06l12.97-59.686z" />
                        </svg>
                    {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" {...$$props}>
                            <path fill="currentColor" d="M8 22L5 8l3-6h8l3 6l-3 14zm3-16v2H9v2h2v5h2v-5h2V8h-2V6z" />
                        </svg>
                    {/if}
                    <h2>Attempts: <span>{lives}</span></h2>
                </div>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="width: 5%; text-align: center;">#</th>
                            <th style="width: 25%;">Music</th>
                            <th style="text-align: center;">Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>smells like teen spirit</td>
                            <td>near</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>whole lotta shakin' going on - remastered 2022</td>
                            <td>not near</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>sun killer</td>
                            <td>not near</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>downfall</td>
                            <td>not near</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>its just a burning memory</td>
                            <td>near</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>think of me once in a while, take care</td>
                            <td>near</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>duality</td>
                            <td>not near</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>king slayer</td>
                            <td>near</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>V.A.N</td>
                            <td>not near</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>my own summer (shove it)</td>
                            <td>near</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="right">
            {#each musics as music}
                <div class="musiques">
                    <Cards banner={music.album.images[0].url} musicName={music.name} artistName={music.album.artists[0].name} albumName={music.album.name} launch={music.album.release_date} data={data}/>
                    <!-- <Cards /> -->
                </div>
            {/each}
        </div>
    </div>
    <div class="bottom-holder">
        <div class="bottom-left">
            <img src="https://static.vecteezy.com/system/resources/previews/014/989/719/original/question-mark-hand-drawn-doodle-faq-symbol-free-vector.jpg" width="120px" height="120px" alt="Album cover" class="album-photo">
            <div class="bottom-text-info">
                <span> <h2>Correct music</h2> <p>artist name or album name</p> </span>
            </div>
        </div>
        <div class="bottom-center">
            <div class="bottom-controls">
                <button class="bottom-back-button" on:click={() => return_five}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" {...$$props}>
                        <g fill="white" fill-rule="evenodd" clip-rule="evenodd">
                            <path d="M10.175 8.605a1.25 1.25 0 0 1 1.185-.855H14a.75.75 0 0 1 0 1.5h-2.46l-.5 1.5H12a2.75 2.75 0 1 1 0 5.5h-2a.75.75 0 0 1 0-1.5h2a1.25 1.25 0 1 0 0-2.5h-1.306a1.25 1.25 0 0 1-1.186-1.645z" />
                            <path d="M11.324 1.675A.75.75 0 0 1 12 1.25q1.104.002 2.15.215c4.906.996 8.6 5.333 8.6 10.535c0 5.937-4.813 10.75-10.75 10.75S1.25 17.937 1.25 12c0-4.41 2.655-8.197 6.45-9.855a.75.75 0 1 1 .6 1.374A9.25 9.25 0 1 0 21.25 12a9.255 9.255 0 0 0-6.5-8.834V4.5a.75.75 0 0 1-1.336.469l-2-2.5a.75.75 0 0 1-.09-.794" />
                        </g>
                    </svg>
                </button>
                {#if isPlaying}
                <button class="bottom-play-button" on:click={() => play_or_stop}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" {...$$props}>
                        <path fill="white" d="m10 16.5l6-4.5l-6-4.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8" />
                    </svg>
                </button>
                {:else}
                <button class="bottom-pause-button" on:click={() => play_or_stop}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 16 16" {...$$props}>
                        <path fill="white" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m0 14.5a6.5 6.5 0 1 1 0-13a6.5 6.5 0 0 1 0 13M5 5h2v6H5zm4 0h2v6H9z" />
                    </svg>
                </button>
                {/if}
                <button class="bottom-forward-button" on:click={() => move_five}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" {...$$props}>
                        <g fill="white" fill-rule="evenodd" clip-rule="evenodd">
                            <path d="M10.175 8.605a1.25 1.25 0 0 1 1.185-.855H14a.75.75 0 0 1 0 1.5h-2.46l-.5 1.5H12a2.75 2.75 0 1 1 0 5.5h-2a.75.75 0 0 1 0-1.5h2a1.25 1.25 0 1 0 0-2.5h-1.306a1.25 1.25 0 0 1-1.186-1.645z" />
                            <path d="M12.676 1.675A.75.75 0 0 0 12 1.25q-1.104.002-2.15.215C4.945 2.461 1.25 6.798 1.25 12c0 5.937 4.813 10.75 10.75 10.75S22.75 17.937 22.75 12c0-4.41-2.655-8.197-6.45-9.855a.75.75 0 0 0-.6 1.374A9.25 9.25 0 1 1 2.75 12a9.255 9.255 0 0 1 6.5-8.834V4.5a.75.75 0 0 0 1.336.469l2-2.5a.75.75 0 0 0 .09-.794" />
                        </g>
                    </svg>
                </button>
            </div>
            <div class="bottom-progress-container">
                <label class="bottom-time-label" for="progress-bar-start">{current_time}</label>
                <progress id="bottom-progress-bar" class="progress-bar" value={current_time} max={total_time}></progress>
                <label class="bottom-time-label" for="progress-bar-end">{total_time}</label>
            </div>
        </div>
        <div class="bottom-right">
            {#if !mute_audio}
                <button on:click={() => mute_the_audio} class="bottom-volume-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" {...$$props}>
                        <g fill="none">
                            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                            <path fill="white" d="M13.26 3.3a1.1 1.1 0 0 1 1.734.78l.006.114v15.612a1.1 1.1 0 0 1-1.643.957l-.096-.062L6.68 16H4a2 2 0 0 1-1.995-1.85L2 14v-4a2 2 0 0 1 1.85-1.995L4 8h2.68zm6.407 3.483A7 7 0 0 1 22 12a7 7 0 0 1-2.333 5.217a1 1 0 1 1-1.334-1.49A5 5 0 0 0 20 12c0-1.48-.642-2.81-1.667-3.727a1 1 0 1 1 1.334-1.49m-2 2.236A4 4 0 0 1 19 11.999a4 4 0 0 1-1.333 2.982a1 1 0 0 1-1.422-1.4l.088-.09c.41-.368.667-.899.667-1.491a2 2 0 0 0-.548-1.376l-.119-.115a1 1 0 1 1 1.334-1.49" />
                        </g>
                    </svg>
                </button>
            {:else}
                <button on:click={() => mute_the_audio} class="bottom-volume-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 20 20" {...$$props}>
                        <path fill="white" fill-rule="evenodd" d="M9.383 3.076A1 1 0 0 1 10 4v12a1 1 0 0 1-1.707.707L4.586 13H2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2.586l3.707-3.707a1 1 0 0 1 1.09-.217m2.91 4.217a1 1 0 0 1 1.414 0L15 8.586l1.293-1.293a1 1 0 1 1 1.414 1.414L16.414 10l1.293 1.293a1 1 0 0 1-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 0 1-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 0 1 0-1.414" clip-rule="evenodd" />
                    </svg>
                </button>
            {/if}
            <input type="range" class="bottom-range-bar" min="0" max="1" step="0.01" bind:value={audioVolume} on:input={() => { if (!mute_audio) if (audio) audio.volume = audioVolume; }} />
        </div>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        background-color: rgb(15, 15, 15);
        font-family: "Rubik Mono One", monospace;
        font-weight: 400;
        font-style: normal;
        overflow: hidden;
        width: 100vw;
        height: 100vh;
    }

    /* Main container styling */
    .container {
        display: flex;
        width: 100vw;
        height: 100vh;
        flex-direction: column;
        background-color: #000;
    }

    .content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        display: flex;
        height: 100%;
        overflow: hidden;
    }

    .icon-button {
        z-index: 9999;
        border: none;
        padding: 10px;
        cursor: pointer;
        margin-right: 15px;
        border-radius: 30px;
        align-items: center;
        display: inline-flex;
        justify-content: center;
        background-color: #333;
        transition: background-color 0.2s ease, transform 0.2s ease;
    }

    .icon-button:hover {
        background-color: #444;
        transform: scale(1.05);
    }

    .icon-button svg {
        width: 24px;
        height: 24px;
        fill: white;
    }

    /* Top search bar styling */
    .top {
        display: flex;
        padding: 1rem 0;
        justify-content: center;
        background-color: #000;
    }

    .search-container {
        width: 100%;
        max-width: 400px;
        position: relative;
    }

    .search-bar {
        width: 100%;
        border: none;
        color: #ffffff;
        font-size: 1rem;
        min-height: 25px;
        border-radius: 20px;
        background-color: #333;
        padding: 0.5rem 1rem 0.5rem 3rem;
    }

    /* SVG icon styling */
    .magnify {
        position: absolute;
        top: 45%;
        left: 15px;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        fill: white;
        pointer-events: none;
    }

    .search-bar:hover {
        background-color: #383838;
    }

    .search-bar:focus {
        outline: 2px solid white;
        background-color: #383838;
    }

    .content {
        display: flex;
        padding: 0 1rem;
        height: 100vh;
    }

    .left{
        width: 36%;
        /* border: 2px solid blue; */
    }

    .right {
        width: 60%;
        /* border: 2px solid red; */
    }

    .left, .right {
        height: 95%;
        padding: 1rem;
        overflow-y: auto;
        border-radius: 10px;
        background-color: #121212;
        color: #b3b3b3;
    }

    .attempts-container {
        display: flex;
        align-items: center;
    }

    .attempts-container span {
        color: white;
        font-size: 2rem;
    }

    .attempts-container svg {
        margin-right: 0.5rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
    }

    th, td {
        border: 1px solid #b3b3b3;
        padding: 0.5rem;
        text-align: left;
        color: #b3b3b3;
    }

    th {
        background-color: #2e2e2e;
        color: white;
    }

    .musiques {
        margin-bottom: 1rem;
    }

    .bottom-holder {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .bottom-left, .bottom-center, .bottom-right {
        display: flex;
        align-items: center;
        flex: 1;
    }

    .bottom-left {
        gap: 10px;
    }

    .bottom-left img{
        width: 100px;
        height: 100px;
        border-radius: 5px;
        margin-left: 25px;
        margin-bottom: 5px;
    }

    .bottom-album-photo {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 5px;
        margin: 10px;
    }

    .bottom-text-info {
        display: flex;
        flex-direction: column;
        color: white;
    }

    .bottom-text-info {
        display: flex;
        flex-direction: column;
        color: white;
    }

    .bottom-center {
        flex-direction: column;
        align-items: center;
    }

    .bottom-controls {
        display: flex;
        gap: 15px;
    }

    .bottom-controls button {
        border: none;
        background: none;
        cursor: pointer;
    }

    .bottom-controls button:focus {
        outline: none;
    }

    .bottom-pause-button,
    .bottom-play-button,
    .bottom-forward-button,
    .bottom-back-button{
        transition: transform 0.2s ease;
    }

    .bottom-pause-button:hover,
    .bottom-play-button:hover,
    .bottom-forward-button:hover,
    .bottom-back-button:hover{
        transform: scale(1.05);
    }

    .bottom-pause-button:active,
    .bottom-play-button:active,
    .bottom-forward-button:active,
    .bottom-back-button:active{
        transform: scale(0.90);
    }

    .bottom-progress-container {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-top: 10px;
    }

    .progress-bar{
        width: 360px;
        background-color: #2e2e2e;
        border-radius: 5px;
    }

    .progress-bar::-webkit-progress-bar {
        background-color: #2e2e2e;
    }

    .progress-bar::-webkit-progress-value {
        background-color: #1db954;
    }

    .bottom-time-label{
        color: white;
    }

    .bottom-right {
        gap: 10px;
        justify-content: flex-end;
    }

    .bottom-volume-icon{
        transition: transform 0.2s ease;
        background-color: transparent;
        border: none;
    }

    .bottom-volume-icon:hover {
        transform: scale(1.05);
    }

    .bottom-volume-icon:active {
        transform: scale(0.95);
    }

    /* Custom scrollbar styling */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: #121212; /* Same as the left background */
    }

    ::-webkit-scrollbar-thumb {
        background-color: #2e2e2e; /* Dark gray */
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #383838; /* Slightly lighter gray on hover */
    }

</style>
