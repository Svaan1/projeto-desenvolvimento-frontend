<script>
    import Modes from '$components/modes.svelte';
    
    let modes =[
        {outer_color: "#003D38", inner_color: "#016450", mode_text: "Artist", modifiable_text_font: "70px", bottom_text: "daily new artists", description: "The artist quiz you can't resist", text_color: "#F6D0D0", bottom_text_color: "rgba(245, 208, 208, 0.7)", description_color: "#F6D0D0", current_game_page: "/artist", isMultiPlayer: false},
        {outer_color: "#ffa60d", inner_color: "#FFC70D", mode_text: "Album", modifiable_text_font: "70px", bottom_text: "daily new albums", description: "The album quiz you can't resist", text_color: "#0E0E0E", bottom_text_color: "rgba(14, 14, 14, 0.7)",  description_color: "#0E0E0E", current_game_page: "/album", isMultiPlayer: false},
        {outer_color: "#A60F1D", inner_color: "#EC1E32", mode_text: "Music", modifiable_text_font: "70px", bottom_text: "daily new musics", description: "The music quiz you can't resist", text_color: "#FFFFFF", bottom_text_color: "rgba(255, 255, 255, 0.7)",  description_color: "#FFFFFF", current_game_page: "/music", isMultiPlayer : false},
        {outer_color: "#606060", inner_color: "#808080", mode_text: "Listener", modifiable_text_font: "60px", bottom_text: "better with friends", description: "We are not responsible for any internal fights.", text_color: "#FFFF99", bottom_text_color: "rgba(255, 255, 153, 0.7)",  description_color: "#FFFF99", current_game_page: "/music", isMultiPlayer: true},
    ]

    let user = "hello world";

</script>

<main>
    <div class="main-container">
        <div class="header-text">
            <h1>
                hello, <br> <span>{user}</span> <br> dive into the modes.
            </h1>
        </div>
        <div class="modes-container">
            {#each modes as mode}
            <Modes  outer_color={mode.outer_color} inner_color={mode.inner_color} mode_text={mode.mode_text} 
                    bottom_text={mode.bottom_text} description={mode.description} text_color={mode.text_color} 
                    modifiable_text_font={mode.modifiable_text_font} bottom_text_color={mode.bottom_text_color} 
                    description_color={mode.description_color} current_game_page={mode.current_game_page}
                    isMultiPlayer={mode.isMultiPlayer}/>
            {/each}
        </div>
    </div>
</main>

<style>

    :global(body) {
        background-color: rgb(15, 15, 15);
        font-family: "Rubik Mono One", monospace;
        font-weight: 400;
        font-style: normal;
        overflow: hidden;
    }

    .main-container {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        height: 100vh;
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

    .modes-container {
        gap: 20px;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 50px;
        align-items: center;
        justify-content: center;
    }

</style>