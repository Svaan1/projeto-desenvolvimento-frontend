<script>
    import { onMount } from 'svelte';

    import Modes from '$components/modes.svelte';
    
    let modes =[
        {outer_color: "#003D38", inner_color: "#016450", mode_text: "Artist", bottom_text: "daily new artists", description: "The artist quiz you can't resist", text_color: "#F6D0D0", bottom_text_color: "rgba(245, 208, 208, 0.7)", description_color: "#F6D0D0", current_game_page: "/artist"},
        {outer_color: "#ffa60d", inner_color: "#FFC70D", mode_text: "Album", bottom_text: "daily new albums", description: "The album quiz you can't resist", text_color: "#0E0E0E", bottom_text_color: "rgba(14, 14, 14, 0.7)",  description_color: "#0E0E0E", current_game_page: "/album"},
        {outer_color: "#A60F1D", inner_color: "#EC1E32", mode_text: "Music", bottom_text: "daily new musics", description: "The music quiz you can't resist", text_color: "#FFFFFF", bottom_text_color: "rgba(255, 255, 255, 0.7)",  description_color: "#FFFFFF", current_game_page: "/music"},

    ]

    let user = "tua mae";

    let isMobile = false;
    onMount(() => {
        const userAgent = navigator.userAgent || window.opera;
        isMobile = /android|iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    });
</script>

<main>
    {#if isMobile}
    <div>
        <h1 style="text-align: center; text-transform: capitalize;">
            under construction...
        </h1>
    </div>
    {:else}
        <div class="main-container">
            <div class="header-text">
                <h1>
                    hello, <br> <span>{user}</span> <br> dive into the modes.
                </h1>
            </div>
            <div class="modes-container">
                {#each modes as mode}
                    <Modes outer_color={mode.outer_color} inner_color={mode.inner_color} mode_text={mode.mode_text} 
                    bottom_text={mode.bottom_text} description={mode.description} text_color={mode.text_color} 
                    bottom_text_color={mode.bottom_text_color} description_color={mode.description_color} 
                    current_game_page={mode.current_game_page}/>
                {/each}
            </div>
        </div>
    {/if}

</main>

<style>

    * {
        font-family: "Rubik Mono One", monospace;
        font-weight: 400;
        font-style: normal;
    }

    main {
        width: 100vw;
        display: flex;
        min-height: 100vh;
        align-items: center;
        justify-content: center;
        background-color: rgb(14, 14, 14);
    }

    .header-text {
        text-transform: uppercase;
        top: 5vh;
        left: 120px;
        width: 100%;
        position: absolute;
    }

    .header-text h1{
        color: white;
        font-size: 1.5em;
    }

    .header-text h1 span {
        color: #aa23ff;
    }
    
    .main-container {
        width: 97.5%;
        min-height: 95vh;
        overflow-x: hidden;
        position: relative;
        border-radius: 25px;
        flex-direction: column;
        background-color: #191414;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    }

    .modes-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
        margin-top: 50px;
        height: 100%;
    }

    .main-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>