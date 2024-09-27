<script>
    // bottom_text: "daily new artists", description: "The artist quiz you can't resist"},

    export let outer_color = "#fff";
    export let inner_color = "#808";
    export let mode_text = "mode";
    export let bottom_text = "bottom text";
    export let description = "description";
    export let text_color = "crimson";
    export let bottom_text_color = "black";
    export let description_color = "gray";
    export let current_game_page = "/";

</script>

<a class="main" href={current_game_page}>
    <div class="main-container" style="background-color: {outer_color}">
        <div class="inner-container" style="background-color: {inner_color}">
            <h3 class="inner-text" style="color: {text_color}">Guess the</h3>
            <h3 class="modifiable-text" style="color: {bottom_text_color}">{mode_text}</h3>
            <div class="bottom-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" style="color: {text_color}" {...$$props}>
                    <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                        <path d="M11.403 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6.403a3 3 0 0 1-1.743-1.612l-3.025 3.025A3 3 0 1 1 9.99 9.768l3.025-3.025A3 3 0 0 1 11.403 5" />
                        <path d="M13.232 4a1 1 0 0 1 1-1H20a1 1 0 0 1 1 1v5.768a1 1 0 1 1-2 0V6.414l-6.182 6.182a1 1 0 0 1-1.414-1.414L17.586 5h-3.354a1 1 0 0 1-1-1" />
                    </g>
                </svg>
                <h5 class="bottom-inner-text" style="color: {text_color}">{bottom_text}</h5>
            </div>
        </div>
        <div class="description-container">
            <p class="description" style="color: {description_color}">
                {description}
            </p>
        </div>
    </div>
</a>

<style>

    .main{
        cursor: pointer;
        text-decoration: none;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .main:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    }

    @keyframes pop {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-5px);
        }
    }

    .main-container{
        width: 350px;
        height: 400px;
        display: flex;
        align-items: center;
        border-radius: 15px;
        flex-direction: column;
    }

    .inner-container{
        width: 90%;
        display: flex;
        margin-top: 5%;
        flex-direction: column;
    }

    .inner-text{
        width: 10%;
        margin: 5%;
        font-size: 60px;
        margin-bottom: 0;
    }

    .modifiable-text{
        margin: 6%;
        margin-top: 0;
        font-size: 68px;
        font-family: "Rubik Glitch", system-ui;
    }

    .bottom-container {
        margin-top: auto;
        display: flex;
        align-items: center;
    }

    .bottom-container svg {
        margin-left: 2%;
        margin-bottom: 2%;
    }

    .bottom-inner-text {
        font-size: 1em;
        margin: 0;
    }

    .description-container {
        width: 90%;
        height: 20%;
        overflow: hidden;
        display: flex;
        text-align: start;
        align-items: center;
        justify-content: center;
    }

    .description {
        font-size: 1em;
    }

</style>