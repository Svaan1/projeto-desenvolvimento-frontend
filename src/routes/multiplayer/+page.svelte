<script>
    import Cards from '$components/music_cards.svelte';
    import Confetti from '$components/confetti.svelte';
    import { onMount } from 'svelte';

    export let data;

    let audio;
    let audioVolume = 0.1;
    let isPlaying = false;
    let mute_audio = false;
    let guessedCorrectly = false;

    // TODO: modify this
    let player_name_1 = "Player 1";
    let player_name_2 = "Player 2";
    let player_name_3 = "Player 3";

    let total_time = "00:30";
    let current_time = "00:00";
    let debounceTimer;
    let musics = [];
    let tries = [];
    let lives = 10;

    let showConfetti = true;

    let winMessage = false;
    let showWinMessage = false;

    let loseMessage = false;
    let showLoseMessage = false;

    let lost;
    $: if (lives <= 0) {
        showLoseMessage = true;
        loseMessage = true;
    }

    function checkName(name1, name2) {
        if (name1 == name2) {
            return "green";
        } 

        return "red";
    }

    function checkTimeDifference(timeString1, timeString2) {
        if (timeString1 == timeString2) {
            return "green"
        }

        const date1 = new Date(timeString1);
        const date2 = new Date(timeString2);

        if (isNaN(date1) || isNaN(date2)) {
            throw new Error("Invalid date string(s)");
        }

        const timeDifference = Math.abs(date2 - date1);
        const yearsDifference = timeDifference / (365.25 * 24 * 60 * 60 * 1000);

        if (yearsDifference <= 1) {
            return "yellow"
        } else {
            return "red"
        }
    }

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
        if (lives == 0 || guessedCorrectly) {
            return;
        }

        console.log(item);

        if (tries.includes(item)) {
            //TODO change this
            alert("Already selected")
            return;
        }

        tries = [...tries, item];

        if (item.album.artists[0].name == data.music.artists[0].name &&
            item.name == data.music.track.name) {
        
            guessedCorrectly = true;
            winMessage = true;
            showWinMessage = true;
            setTimeout(() => {
                showConfetti = false;
            }, 10000);

            //TODO: change this
            // TODO: save winning and tries state
        } else {
            lives -= 1
        }
    };

    const play_or_stop = () => {
        isPlaying = !isPlaying;

        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    };

    let audioProgress = 0;
    let audioDuration = 100;

    onMount(() => {
        if (!audio) {
            audio = new Audio(data.music.track.audio_preview);
            audio.volume = audioVolume;
            audio.ontimeupdate = () => {
                audioProgress = audio.currentTime
                audioDuration = audio.duration

                current_time = formatTime(audio.currentTime);

                if (audio.currentTime >= audio.duration - 0.1) {
                    isPlaying = false;
                    audio.pause();  
                }
            };
            audio.onloadedmetadata = () => {
                total_time = formatTime(audio.duration);
            };
        }
    });

    function formatTime(seconds) {
        let min = Math.floor(seconds / 60).toString().padStart(2, '0');
        let sec = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    }

    function return_five(){
        if (audio) {
            audio.currentTime = Math.max(0, audio.currentTime - 5);
        }
    };

    function move_five(){
        if (audio) {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
        }
    };

    function returnHome()
    {
        window.location.href = "/home";
    };

</script>

{#if winMessage && showWinMessage}
    <div class="displayr fade-in">
        <div class="funny">
            <h1>You did it!!11!</h1>
        </div>
        <div class="close-container">
            <button class="close-btn" on:click={() => { showWinMessage = false; }}>close</button>
        </div>
    </div>

    <style>
    .displayr {
        z-index: 1000;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #262626;
        width: 600px;
        height: 500px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 0;
        animation: fadeIn 1s forwards;
    }

    .funny {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        color: white;
    }

    .funny h1 {
        margin-left: 0;
    }

    .close-container{
        padding-bottom: 10px;
    }

    .close-btn{
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background-color: #1DB954;
        width: 100px;
        height: 50px;
    }

    @keyframes fadeIn {
        from {
            scale: 0;
            opacity: 0;
        }
        to {
            scale: 1;
            opacity: 1;
        }
    }
    </style>
{/if}

{#if loseMessage && showLoseMessage}
    <div class="displayr fade-in">
        <svg xmlns="http://www.w3.org/2000/svg" width="384" height="384" viewBox="0 0 48 48" {...$$props}>
            <path fill="#ffe500" d="M7.95 21a16.05 16.05 0 1 0 32.1 0a16.05 16.05 0 1 0-32.1 0" />
            <path fill="#ebcb00" d="M19.82 5.5A16.05 16.05 0 1 0 39.5 16.82A16.05 16.05 0 0 0 19.82 5.5m7.73 28.67a14.64 14.64 0 1 1 10.33-18a14.63 14.63 0 0 1-10.33 18" />
            <path fill="#fff48c" d="M25.31 7.35c.17.65-1.77 1.72-4.31 2.41s-4.79.74-5 .09s1.77-1.72 4.33-2.41s4.8-.73 4.98-.09" />
            <path fill="#45413c" d="M11.16 43.5a12.84 1.5 0 1 0 25.68 0a12.84 1.5 0 1 0-25.68 0" opacity="1" />
            <path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" d="M7.95 21a16.05 16.05 0 1 0 32.1 0a16.05 16.05 0 1 0-32.1 0" />
            <path fill="#ffaa54" d="M36.28 21.84c.17.65-.55 1.4-1.62 1.69s-2.08 0-2.25-.64s.59-1.4 1.59-1.69s2.11 0 2.28.64M13.81 27.9c.17.65 1.18.93 2.25.64s1.8-1 1.62-1.68s-1.18-.93-2.25-.64s-1.79 1.04-1.62 1.68" />
            <path fill="#ffb0ca" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" d="M21 28.46a.8.8 0 0 0-.49.41a.77.77 0 0 0 0 .63a5.69 5.69 0 0 0 10.83-2.92A.73.73 0 0 0 31 26a.77.77 0 0 0-.63-.11Z" />
            <path fill="#ff87af" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" d="M30.9 29.4a9.2 9.2 0 0 0-4.6.15a9.1 9.1 0 0 0-4 2.18a5.77 5.77 0 0 0 8.6-2.33" />
            <path fill="#00b8f0" d="M46.92 23c-2.43 4.21-6.69-1.79-10.1-1.56c3.7-4.7 12.52-2.68 10.1 1.56" />
            <path fill="#4acfff" d="M36.82 21.42h.25c4.07-2.85 10.7-.91 8.74 2.76A3.15 3.15 0 0 0 46.92 23c2.42-4.24-6.4-6.26-10.1-1.58" />
            <path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" d="M46.92 23c-2.43 4.21-6.69-1.79-10.1-1.56c3.7-4.7 12.52-2.68 10.1 1.56" />
            <path fill="#00b8f0" d="M40.49 12c1.84 2.61-2.91 3.49-3.72 5.59C35 14.06 38.65 9.36 40.49 12" />
            <path fill="#4acfff" d="m36.77 17.56l.07-.15c-.57-3.22 2.41-6.63 4.06-4.45a2.14 2.14 0 0 0-.41-1c-1.84-2.6-5.49 2.1-3.72 5.6" />
            <path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" d="M40.49 12c1.84 2.61-2.91 3.49-3.72 5.59C35 14.06 38.65 9.36 40.49 12" />
            <path fill="#00b8f0" d="M47.17 14.89c-.3 2.23-3.18.4-4.6 1.1c.77-2.65 4.9-3.33 4.6-1.1" />
            <path fill="#4acfff" d="m42.57 16l.11-.05c1.24-1.93 4.42-2.26 4.23-.34a1.55 1.55 0 0 0 .26-.71c.3-2.24-3.83-1.56-4.6 1.1" />
            <path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" d="M47.17 14.89c-.3 2.23-3.18.4-4.6 1.1c.77-2.65 4.9-3.33 4.6-1.1" />
            <path fill="#00b8f0" d="M5.18 34.23c4.22 2.42 4.88-4.91 8-6.43c-5.6-2.18-12.18 4-8 6.43" />
            <path fill="#4acfff" d="m13.13 27.8l-.22.13c-5-.42-9.71 4.59-6.17 6.78a3.2 3.2 0 0 1-1.56-.48C1 31.8 7.58 25.62 13.13 27.8" />
            <path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" d="M5.18 34.23c4.22 2.42 4.88-4.91 8-6.43c-5.6-2.18-12.18 4-8 6.43" />
            <path fill="#00b8f0" d="M5.21 21.49c-.28 3.18 4.27 1.55 6 3c-.21-3.95-5.72-6.18-6-3" />
            <path fill="#4acfff" d="m11.23 24.44l-.14-.09c-1.12-3.07-5.41-4.52-5.74-1.8a2 2 0 0 1-.14-1.06c.28-3.18 5.79-.95 6.02 2.95" />
            <path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" d="M5.21 21.49c-.28 3.18 4.27 1.55 6 3c-.21-3.95-5.72-6.18-6-3" />
            <path fill="#00b8f0" d="M.9 27.36c1.38 1.78 3-1.24 4.53-1.36c-2-1.9-5.91-.41-4.53 1.36" />
            <path fill="#4acfff" d="M5.43 26h-.12c-2-1.05-5 .27-3.83 1.82a1.45 1.45 0 0 1-.58-.48C-.48 25.59 3.43 24.1 5.43 26" />
            <path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" d="M.9 27.36c1.38 1.78 3-1.24 4.53-1.36c-2-1.9-5.91-.41-4.53 1.36m31.87-11.63l-2.15 1.91A.81.81 0 0 0 31 19l2.83.57m-20.06 1.28l2.82.57a.8.8 0 0 1 .41 1.39l-2.15 1.91" />
        </svg>
        <div class="funny">
            <h1>You Lost</h1>
        </div>
        <div class="close-container">
            <button class="close-btn" on:click={() => { showLoseMessage = false; }}>close</button>
        </div>
    </div>
    
    <style>
    .displayr {
        z-index: 1000;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #262626;
        width: 600px;
        height: 500px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 0;
        animation: fadeIn 1s forwards;
    }
    
    .funny {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        color: white;
    }
    
    .funny h1 {
        margin-left: 0;
    }

    .close-container{
        padding-bottom: 10px;
    }

    .close-btn{
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background-color: #1DB954;
        width: 100px;
        height: 50px;
    }

    @keyframes fadeIn {
        from {
            scale: 0;
            opacity: 0;
        }
        to {
            scale: 1;
            opacity: 1;
        }
    }
    </style>
{/if}

{#if guessedCorrectly && showConfetti}
    <div style="
    position: fixed;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    overflow: hidden;
    pointer-events: none;">
    <Confetti amount=10 delay={[0, 250]} />
    </div>
{/if}

<div class="container">
    <div class="top">
        <div class="top-left">
            <div class="info">
                <div class="player_holder">
                    <img src="https://wallpapercave.com/wp/wp4055557.png" alt="1player" />
                    <span>{player_name_1}</span>
                </div>
                <div class="player_holder">
                    <img src="https://th.bing.com/th/id/R.0aeb69eff521b880c2974ffe7ebb373a?rik=Jx3C6nG2wdWgMA&pid=ImgRaw&r=0" alt="2player" />
                    <span>{player_name_2}</span>
                </div>
                <div class="player_holder">
                    <img src="https://th.bing.com/th/id/OIP.wSITH-pPkVo5tOaVH47HrgAAAA?rs=1&pid=ImgDetMain" alt="3player" />
                    <span>{player_name_3}</span>
                </div>
            </div>
        </div>
        <div class="top-center">
            <button class="icon-button" on:click={returnHome}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
                    <path fill="white" d="m59.836 58.25l-3.447-21.553l3.24-17.822h.496c.651 0 1.287-.295 1.635-.896a1.795 1.795 0 0 0-.655-2.448l-.785-.453l.011-.062l-.102.01L37.625 2h-11.25L2.896 26.783a1.797 1.797 0 0 0-.657 2.448a1.8 1.8 0 0 0 2.452.655l2.789-3.104l1.998 5.327L5.992 58.25H2V62h60v-3.75zm-5.32-21.73l-.029.158l3.451 21.572h-2.5l-3.416-6.833l1.541-12.854l-3.024 9.89l-2.601-5.202l3.213 15h-2.742l-3.263-12.236l4.377-27.141l8.201.001zM39.645 6.781V4.813l4.543 3.75h3.534l3.028 3.75l-4.039-1.84h-3.029l-6.057-3.691zm-28.247 25.11L8.893 25.21L26.375 5.75l21.321 12.671l-4.467 27.69l3.237 12.139H24.5l-1.331-5.99l3.412-.77l1.113-.25l-1.019-2.282l.145-.867l.479-2.899l.15-.904l-.902-.169l-2.792-.524l.745-4.095h-9.643l-.567 2.316l-2.262-.425l-.941-.177l-.156.944l-.48 2.899l-.149.904l.901.169l2.109.396l.427 3.235l-2.569.542l-1.112.251l.461 1.043l1.101 2.49l.312.705l.752-.17l1.648-.371l.527 3.996H7.884zm14.207 16.946l.77 1.739l-13.899 3.135l-1.101-2.49l12.232-2.76zm-14.23-3.626l.479-2.898l14.521 2.727l-.479 2.898z" />
                    <path fill="white" d="M55.438 24.5h-4.374L49.813 32h4.372zM24.5 32l-1.875-7.5h-7.5L17 32zm16.875 3.75l1.875-7.5l-3.75-3.75H32L30.125 32h7.5zm-1.367-9.416l2.204 2.203l-1.345 5.379l-2.204-2.203zm.43 26.291L39.33 44.97l1.108-5.47h-9.206l-2.044 6.563l2.044 6.562z" />
                </svg>
            </button>
            <div class="search-container">
                <svg class="magnify" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                    <path fill="white" d="m479.6 399.716l-81.084-81.084l-62.368-25.767A175 175 0 0 0 368 192c0-97.047-78.953-176-176-176S16 94.953 16 192s78.953 176 176 176a175.03 175.03 0 0 0 101.619-32.377l25.7 62.2l81.081 81.088a56 56 0 1 0 79.2-79.195M48 192c0-79.4 64.6-144 144-144s144 64.6 144 144s-64.6 144-144 144S48 271.4 48 192m408.971 264.284a24.03 24.03 0 0 1-33.942 0l-76.572-76.572l-23.894-57.835l57.837 23.894l76.573 76.572a24.03 24.03 0 0 1-.002 33.941" />
                </svg>
                <input type="text" class="search-bar" placeholder="I don`t listen to this, surely..." on:keyup={({ target: { value } }) => debounce(value)} />
            </div>
        </div>
    </div>
    <div class="content">
        <div class="left">
            <div>
                <div class="attempts-container">
                    {#if lives == 0}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 72 72"  >
                            <path fill="#cecece" d="M29.7 71.8c-1.2 0-2.1-1-2.1-2.1v-2.8c0-1.2 1-2.1 2.1-2.1c1.2 0 2.1 1 2.1 2.1v2.8c0 1.1-1 2.1-2.1 2.1m5.4 0c-1.2 0-2.1-1-2.1-2.1v-2.8c0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1v2.8c.1 1.1-.9 2.1-2.1 2.1m5.5 0c-1.2 0-2.1-1-2.1-2.1v-2.8c0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1v2.8c0 1.1-1 2.1-2.1 2.1m5.4 0c-1.2 0-2.1-1-2.1-2.1v-2.8c0-1.2 1-2.1 2.1-2.1s2.1 1 2.1 2.1v2.8c.1 1.1-.9 2.1-2.1 2.1" />
                            <path fill="#e5e4df" d="M65.5 42.1L67 29.7C67 13.3 53.7 0 37.3 0S7.6 13.3 7.6 29.7L9 42.1c-1.1 1.8-1.7 4-1.7 6.3C7.4 55.3 13 61 20 61c1.2 0 2.3-.2 3.4-.5v2.2c0 2.4 1.9 4.3 4.3 4.3h19.8c2.4 0 4.3-1.9 4.3-4.3v-2.1c.9.2 1.8.3 2.8.3c7 0 12.6-5.7 12.6-12.6c0-2.2-.6-4.4-1.7-6.2" />
                            <path fill="#2b3b47" d="M25.6 37.5c-.3-2.5-2.4-4.5-5-4.5s-4.7 2-4.9 4.6h-.1v7c0 2.8 2.2 5 5 5s5-2.2 5-5zm32.7 0c-.3-2.5-2.4-4.5-5-4.5s-4.7 2-4.9 4.6h-.1v7c0 2.8 2.2 5 5 5s5-2.2 5-5zM37.5 49h.1c.1 0 .2 0 .4.1c.3.1.7.2 1 .4c.8.4 1.5 1.1 1.9 2c.4.8.6 1.8.5 2.7c-.1.4-.2.8-.3 1.1c0 .1-.1.3-.1.3c0 .1-.1.1-.1.1c-.2.4-.7.7-1.1.6h-.1c-.1 0-.2 0-.4-.1c-.3-.1-.7-.2-1.1-.4c-.8-.4-1.5-1.1-1.9-2c-.3-.8-.5-1.8-.3-2.6c.1-.4.2-.8.3-1.1c0-.1.1-.3.1-.3c0-.1.1-.1.1-.1c.1-.5.6-.8 1-.7" />
                            <path fill="#2b3b47" d="m38.1 49.6l.1.1c0 .1.1.2.1.3c.1.3.2.7.3 1.1c.1.9 0 1.9-.5 2.7c-.4.9-1.2 1.6-1.9 2c-.4.2-.8.3-1.1.4c-.1 0-.3.1-.4.1h-.1c-.5.1-.9-.1-1.1-.6l-.1-.1c0-.1-.1-.2-.1-.3c-.1-.3-.2-.7-.3-1.1c-.1-.9 0-1.9.5-2.7c.4-.8 1.2-1.6 1.9-2c.4-.2.8-.4 1-.4c.1 0 .3-.1.4-.1h.1c.6-.1 1 .2 1.2.6" />
                        </svg>
                    {:else if lives > 7}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"  >
                            <path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z" />
                        </svg>
                    {:else if lives > 4}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"  >
                            <path fill="currentColor" d="M12.025 21.925q-3.35-3.375-5.337-5.45t-3.025-3.45t-1.35-2.35T2 8.5q0-2.3 1.6-3.9T7.5 3q1.125 0 2.175.412T11.55 4.6L10 10h3l-.85 8.375L15 9h-3l1.775-5.3q.625-.35 1.313-.525T16.5 3q2.3 0 3.9 1.6T22 8.5q0 1.2-.325 2.2T20.3 13.088t-3.025 3.45t-5.25 5.387m-1.775-4.65L10.775 12H7.35l1.875-6.575q-.4-.2-.837-.312T7.5 5Q6.05 5 5.025 6.025T4 8.5q0 .775.288 1.55t1 1.763t1.924 2.3t3.038 3.162m4.7-1.2q2.775-2.825 3.913-4.5T20 8.5q0-1.45-1.025-2.475T16.5 5q-.275 0-.55.038t-.55.137L14.8 7h2.9zM7.35 12" />
                        </svg>
                    {:else if lives > 1}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"  >
                            <path fill="currentColor" d="M171.125 20.28a603 603 0 0 0-10.844.095l-5.718.125l-2.5 5.125c-6.484 13.307-23.588 23.72-45.937 31.625c-8.73 3.088-18.122 5.803-27.72 8.313l9.657 16.812c8.253-2.24 16.435-4.714 24.313-7.5c22.043-7.795 42.253-18.258 53.375-35.813c54.302-.54 123.166 6.728 181.688 29.126c54.774 20.963 99.65 54.383 117.812 106.624c-2.063-.668-4.205-1.333-6.313-2l-63.28-52.593l-25.876 30l-43.124-46.47l-23.156 34.313l-45.28-45.907l-27.908 38.125l-46-45.81l-23.78 45.124l-38.782-27.72l-7.406 26.282l23.594 41.094c13.6-7.09 32.617-14.47 49.875-17.72c12.606-2.37 24.367-2.552 32.093-.31c7.727 2.24 11.237 5.162 12.656 13l1.813 9.968l9.78-2.594c74.608-19.777 168.01 4.457 231.97 26.437l15.78 5.44l-3.624-16.314C472.78 117.786 417.833 75.1 354.126 50.72c-59.725-22.86-127.835-30.473-183-30.44zM40.72 50.313c-12.622.486-23.765 10.62-23.376 28.626c94.07 133.71 175.316 272.647 239.47 417.562h41.436L52.406 53.22c-2.063-.898-4.34-1.96-6.437-2.345c-1.836-.336-3.45-.637-5.25-.563zM382.75 255.97c-8.857.08-17.908 1.26-26.97 3.686c-55.227 14.784-88.043 69.08-74.342 120.156c3.257 12.147 14.716 25.216 29.468 36.344c10.09 7.61 21.485 14.305 32.063 19.72c-2.054-13.744-5.87-27.03-13.064-39.938l16.313-9.094c18.71 33.585 17.717 68.118 18.03 100.906c9.32 1.53 18.46 3.04 27.47 4.188l1.842-34l18.657 1l-1.876 34.78c11.114.645 22.016.378 32.75-1.406l-1.656-35.375l18.687-.843l1.438 31.47a104.5 104.5 0 0 0 19.968-9.627c.64-5.552 2.86-25.628 4.033-53.968c.565-13.672.764-28.563.312-43.095c-15.635 4.024-31.625-5.263-35.813-20.875c-4.212-15.705 5.12-31.853 20.844-36.063a29.8 29.8 0 0 1 7.375-1h.064C465.917 283.512 428.73 257.113 386.53 256a103 103 0 0 0-3.78-.03m4.72 70.936c15.152-.15 29.052 9.89 33.155 25.188c4.863 18.13-5.88 36.766-24.03 41.625c-18.153 4.858-36.826-5.903-41.69-24.033c-4.86-18.13 5.912-36.766 24.064-41.625a34 34 0 0 1 8.5-1.156zm51.936 46.188L465 426.72l-38.563 6.06l12.97-59.686z" />
                        </svg>
                    {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"  >
                            <path fill="currentColor" d="M10 2h4c3.31 0 5 2.69 5 6v10.66C16.88 17.63 15.07 17 12 17s-4.88.63-7 1.66V8c0-3.31 1.69-6 5-6M8 8v1.5h8V8zm1 4v1.5h6V12zM3 22v-.69c2.66-1.69 10.23-5.47 18-.06V22z" />
                        </svg>
                    {/if}
                    <h2>Attempts: <span>{lives}</span></h2>
                </div>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="width: 5%; text-align: center;">#</th>
                            <th style="width: 50%; text-align: center;">Name</th>
                            <th style="text-align: center;">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- TODO: change logic -->
                        <!-- {#if tries.length > 0}
                            {#each tries as tr, index}
                                <tr>
                                    <td>{10 - tries.indexOf(tr)}</td>
                                    <td style="color: {checkName(tr.name, data.music.track.name)}">{tr.name}</td>
                                    <td style="color: {checkTimeDifference(tr.album.release_date, data.music.album.release_date)};">{tr.album.release_date}</td>
                                    <td style="color: {checkName(tr.album.artists[0].name, data.music.artists[0].name)}">{tr.album.artists[0].name}</td>
                                </tr>
                            {/each}
                        {/if} -->
                    </tbody>
                </table>
            </div>
        </div>
        <div class="right">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#each musics as music}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="musiques" on:click={() => {checkTrack(music)}} >
                    <Cards banner={music.album.images[0].url} musicName={music.name} artistName={music.album.artists[0].name} albumName={music.album.name} launch={music.album.release_date} data={data}/>
                </div>
            {/each}
        </div>
    </div>
    <div class="bottom-holder">

        {#if guessedCorrectly}
            <div class="bottom-left">
                <img src={data.music.album.image} width="120px" height="120px" alt="Album cover" class="album-photo">
                <div class="bottom-text-info">
                    <span> <h2>{data.music.track.name}</h2> <p>{data.music.artists[0].name}</p> </span>
                </div>
            </div>
        {:else}
            <div class="bottom-left">
                <img src="https://static.vecteezy.com/system/resources/previews/014/989/719/original/question-mark-hand-drawn-doodle-faq-symbol-free-vector.jpg" width="120px" height="120px" alt="Album cover" class="album-photo">
                <div class="bottom-text-info">
                    <span> <h2>Correct music</h2> <p>artist name or album name</p> </span>
                </div>
            </div>
        {/if}
        <div class="bottom-center">
            <div class="bottom-controls">
                <button class="bottom-control-button bottom-back-button" on:click={return_five}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"  >
                        <g fill="white" fill-rule="evenodd" clip-rule="evenodd">
                            <path d="M10.175 8.605a1.25 1.25 0 0 1 1.185-.855H14a.75.75 0 0 1 0 1.5h-2.46l-.5 1.5H12a2.75 2.75 0 1 1 0 5.5h-2a.75.75 0 0 1 0-1.5h2a1.25 1.25 0 1 0 0-2.5h-1.306a1.25 1.25 0 0 1-1.186-1.645z" />
                            <path d="M11.324 1.675A.75.75 0 0 1 12 1.25q1.104.002 2.15.215c4.906.996 8.6 5.333 8.6 10.535c0 5.937-4.813 10.75-10.75 10.75S1.25 17.937 1.25 12c0-4.41 2.655-8.197 6.45-9.855a.75.75 0 1 1 .6 1.374A9.25 9.25 0 1 0 21.25 12a9.255 9.255 0 0 0-6.5-8.834V4.5a.75.75 0 0 1-1.336.469l-2-2.5a.75.75 0 0 1-.09-.794" />
                        </g>
                    </svg>
                </button>
                {#if isPlaying}
                <button class="bottom-pause-button" on:click={play_or_stop}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 16 16" {...$$props}>
                        <path fill="white" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m0 14.5a6.5 6.5 0 1 1 0-13a6.5 6.5 0 0 1 0 13M5 5h2v6H5zm4 0h2v6H9z" />
                    </svg>
                </button>
                {:else}
                <button class="bottom-play-button" on:click={play_or_stop}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" {...$$props}>
                        <path fill="white" d="m10 16.5l6-4.5l-6-4.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8" />
                    </svg>
                </button>
                {/if}
                <button class="bottom-control-button bottom-forward-button" on:click={move_five}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"  >
                        <g fill="white" fill-rule="evenodd" clip-rule="evenodd">
                            <path d="M10.175 8.605a1.25 1.25 0 0 1 1.185-.855H14a.75.75 0 0 1 0 1.5h-2.46l-.5 1.5H12a2.75 2.75 0 1 1 0 5.5h-2a.75.75 0 0 1 0-1.5h2a1.25 1.25 0 1 0 0-2.5h-1.306a1.25 1.25 0 0 1-1.186-1.645z" />
                            <path d="M12.676 1.675A.75.75 0 0 0 12 1.25q-1.104.002-2.15.215C4.945 2.461 1.25 6.798 1.25 12c0 5.937 4.813 10.75 10.75 10.75S22.75 17.937 22.75 12c0-4.41-2.655-8.197-6.45-9.855a.75.75 0 0 0-.6 1.374A9.25 9.25 0 1 1 2.75 12a9.255 9.255 0 0 1 6.5-8.834V4.5a.75.75 0 0 0 1.336.469l2-2.5a.75.75 0 0 0 .09-.794" />
                        </g>
                    </svg>
                </button>
            </div>
            <div class="bottom-progress-container">
                <label class="bottom-time-label" for="progress-bar-start">{current_time}</label>
                <progress id="bottom-progress-bar" class="progress-bar" value={audioProgress} max={audioDuration}></progress>
                <label class="bottom-time-label" for="progress-bar-end">{total_time}</label>
            </div>
        </div>
    
        <div class="bottom-right">
            {#if !mute_audio}
                <button on:click={() => {mute_audio = true; audioVolume = 0}} class="bottom-volume-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"  >
                        <g fill="none">
                            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                            <path fill="white" d="M13.26 3.3a1.1 1.1 0 0 1 1.734.78l.006.114v15.612a1.1 1.1 0 0 1-1.643.957l-.096-.062L6.68 16H4a2 2 0 0 1-1.995-1.85L2 14v-4a2 2 0 0 1 1.85-1.995L4 8h2.68zm6.407 3.483A7 7 0 0 1 22 12a7 7 0 0 1-2.333 5.217a1 1 0 1 1-1.334-1.49A5 5 0 0 0 20 12c0-1.48-.642-2.81-1.667-3.727a1 1 0 1 1 1.334-1.49m-2 2.236A4 4 0 0 1 19 11.999a4 4 0 0 1-1.333 2.982a1 1 0 0 1-1.422-1.4l.088-.09c.41-.368.667-.899.667-1.491a2 2 0 0 0-.548-1.376l-.119-.115a1 1 0 1 1 1.334-1.49" />
                        </g>
                    </svg>
                </button>
            {:else}
                <button on:click={() => {audioVolume = 0.5; mute_audio = false}} class="bottom-volume-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 20 20"  >
                        <path fill="white" fill-rule="evenodd" d="M9.383 3.076A1 1 0 0 1 10 4v12a1 1 0 0 1-1.707.707L4.586 13H2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2.586l3.707-3.707a1 1 0 0 1 1.09-.217m2.91 4.217a1 1 0 0 1 1.414 0L15 8.586l1.293-1.293a1 1 0 1 1 1.414 1.414L16.414 10l1.293 1.293a1 1 0 0 1-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 0 1-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 0 1 0-1.414" clip-rule="evenodd" />
                    </svg>
                </button>
            {/if}
            <input type="range" class="bottom-range-bar" min="0" max="1" step="0.01" bind:value={audioVolume} on:input={() => {
                console.log(audioVolume);
                if(audioVolume <= 0)
                {
                    mute_audio = true
                } else {
                    mute_audio = false
                }

                audio.volume = audioVolume
                mute_audio = audioVolume == 0
            }} />
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
        width: 100%;
        height: 100%;
        flex-direction: column;
        background-color: #000000;
    }

    .content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        display: flex;
        height: 100%;
        overflow: hidden;
        /* border: 1px solid white; */
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
        justify-content: space-between;
        align-items: center;
        background-color: #000;
    }

    .top-left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 40%; 
    }

    .top-center{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex: 1;
    }

    .info {
        margin-left: 15px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 10px;
        color: white;
    }

    .info img {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        transition: transform 0.1s ease;
    }

    .player_holder{
        user-select: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
        top: 50%;
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
        padding: 0.5%;
        width: 40%;
        height: 100%;
        /* border: 1px solid blue; */
    }

    .right {
        padding: 0.5%;
        width: 60%;
        height: 100%;
        margin-left: 0.5%;
        /* border: 1px solid red; */
    }

    .left, .right {
        overflow-y: auto;
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

    th {
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
        margin-bottom: 0.5%;
    }

    .bottom-holder {
        margin-top: 0.5%;
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
        margin-top: 0.7%;
    }

    .progress-bar{
        width: 350px;
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

    .bottom-range-bar{
        margin-right: 3%;
        width: 120px;
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
