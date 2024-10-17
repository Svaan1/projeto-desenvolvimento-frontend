<script>
    // bottom_text: "daily new artists", description: "The artist quiz you can't resist"},

    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import Modal from './modal_music.svelte';

    // export let isMultiPlayer = false;

    export let banner = "https://static.vecteezy.com/system/resources/previews/014/989/719/original/question-mark-hand-drawn-doodle-faq-symbol-free-vector.jpg";
    export let music_name = "song name";
    export let artist_name = "artist name";

    export let music_date = "2020-12-31";

    let display_correct_icon = "none";
    let is_near_music_color_date = "black";

    let display_down_arrow = "none";
    let display_up_arrow = "none";

    let showModal = false;

    function handleClick() {
        showModal = !showModal;
    };

    const handleClick2 = () => {
        console.log("clicked");
    };

    const calc_date_time = () => {
        const itemReleaseDate = new Date(music_date);
        const musicReleaseDate = new Date($page.data.music.album.release_date);

        if (itemReleaseDate.getTime() === musicReleaseDate.getTime()) {
            is_near_music_color_date = "green";
            display_correct_icon = "block";
        }

        if (itemReleaseDate.getTime() < musicReleaseDate.getTime()) {
            is_near_music_color_date = "orange";
            display_down_arrow = "block";
            console.log("less than");

        }

        if (itemReleaseDate.getTime() > musicReleaseDate.getTime()) {
            is_near_music_color_date = "orange";
            display_up_arrow = "block";
            console.log("greater than");
        }
    };
</script>

<Modal bind:showModal>
    <button class="background-modal">
        <div class="background-container">
            <div class="music-banner">
                <img src={banner} alt="music-banner" style="width: 100%; height: 100%; object-fit: cover;"/>
            </div>
            <div class="text-container">
                <div class="music-name">
                    <h2>{music_name}</h2>
                </div>
                <div class="music-date">
                    <div class="time">
                        <h2 style="color: {is_near_music_color_date};">{music_date}</h2>
<!-- UP ARROW -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...$$props}>
                            <g fill="none" style="display: {display_up_arrow}; color: {is_near_music_color_date};">
                                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                <path fill="currentColor" d="M13.06 3.283a1.5 1.5 0 0 0-2.12 0L5.281 8.939a1.5 1.5 0 0 0 2.122 2.122L10.5 7.965V19.5a1.5 1.5 0 0 0 3 0V7.965l3.096 3.096a1.5 1.5 0 1 0 2.122-2.122z" />
                            </g>
                        </svg>
<!-- DOWN ARROW -->
                        <svg style="display: {display_down_arrow}; color: {is_near_music_color_date}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...$$props}>
                            <path fill="currentColor" fill-rule="evenodd" d="M12 3.25a.75.75 0 0 1 .75.75v14.19l4.72-4.72a.75.75 0 1 1 1.06 1.06l-6 6a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 1 1 1.06-1.06l4.72 4.72V4a.75.75 0 0 1 .75-.75" clip-rule="evenodd" />
                        </svg>
<!-- CORRECT ICON -->
                        <svg style="display: {display_correct_icon}; color: {is_near_music_color_date}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" {...$$props}>
                            <path fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m4 24l5-5l10 10L39 9l5 5l-25 25z" clip-rule="evenodd" />
                        </svg>
                    </div> 
                <div class="artist-container">
                    <h2>{artist_name}</h2>
                </div>
            </div>
        </div>
    </button>
    <div class="button-container">
        <button class="single-player" on:click={calc_date_time}>Confirm?</button>
    </div>
<style>
    
    .background-modal{
        border-radius: 25px;
        border: none;
        text-decoration: none;
        background-color: white;
    }
    
    .button-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .single-player{
        width: 195px;
        height: 70px;
        background-color: #1ED760;
        color: black;
        border: none;
        border-radius: 50px;
        margin: 10px;
        cursor: pointer;
        font-size: 1.2em;
    }
    
</style>
</Modal>


<button class="background" on:click={handleClick}>
    <div class="background-container">
        <div class="music-banner">
            <img src={banner} alt="music-banner" style="width: 100%; height: 100%; object-fit: cover;"/>
        </div>
        <div class="text-container">
            <div class="music-name">
                <h2>{music_name}</h2>
            </div>
            <div class="music-date">
                <div class="time">
                    <h2>{music_date}</h2>
                </div>
            <div class="artist-container">
                <h2>{artist_name}</h2>
            </div>
        </div>
    </div>
</button>

<style>

    *{
        font-family: "Rubik Mono One", monospace;
        font-weight: 400;
        font-style: normal;
    }

    .background{
        border-radius: 25px;
        border: none;
        cursor: pointer;
        text-decoration: none;
        background-color: white;
        transition: transform 0.3s ease-out;
    }

    .background:hover {
        transform: scale(1.1);
    }

    .background:active {
        transform: scale(1.05);
    }

    .background-container{
        width: 300px;
        height: 390px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .music-banner{
        width: 220px;
        height: 220px;
        display: flex;
        margin-top: -15px;
        flex-direction: column;
        box-shadow: 20px 15px 25px rgba(0, 0, 0, 0.6);
    }

    .text-container{
        width: 85%;
        height: auto;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 20px;
    }

    .music-name{
        width: 100%;
        max-width: 100%;
        font-size: 1.1em;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .music-name h2{
        margin: 0;
        padding: 0;
    }

    .music-date{
        width: 100%;
        text-align: left;
    }

    .time {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex-direction: row;
    }

    .time h2{
        font-size: 1.2em;
        margin: 0;
        padding: 0;
    }

    .artist-container{
        font-size: 1em;
        width: 100%;
        padding: 0;
        text-align: left;
    }

    .artist-container h2{
        color: #000000;
        margin-top: 15px;
    }

</style>