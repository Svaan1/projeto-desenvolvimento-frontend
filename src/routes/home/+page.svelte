<script>
    let user = 'Hello, World!';

    import Button from '$components/home/button.svelte';

    let buttons = [
        { text: "Game 1", href: "/game-1" },
        { text: "Game 2", href: "/game-2" },
        { text: "Game 3", href: "/game-3" },
        { text: "Game 4", href: "/game-4" },
        { text: "Game 3", href: "/game-3" },
        { text: "Game 3", href: "/game-3" },
        { text: "Game 3", href: "/game-3" },
        { text: "Game 3", href: "/game-3" },
        { text: "Game 3", href: "/game-3" },
        { text: "Game 3", href: "/game-3" },
        { text: "Game 3", href: "/game-3" },
        { text: "Game 3", href: "/game-3" },
        { text: "Game 3", href: "/game-3" },
        { text: "Game 3", href: "/game-3" },
        { text: "Game 3", href: "/game-3" },
        { text: "Game 3", href: "/game-3" },
        { text: "Game 3", href: "/game-3" },
        { text: "Game 3", href: "/game-3" }
    ];
</script>

<main>
    <div class="main-container">
        <div class="header-container">
            <h1>Hello, {user}</h1>
        </div>
        <div class="selection-container">
            {#each buttons as button}
                <div class="test">
                    <Button text={button.text} href={button.href} />
                </div>
            {/each}
        </div>
    </div>
</main>

<style>
    * {
        overflow: auto;
        color: #fff;
        font-family: 'Fragment Mono', monospace;
    }

    main {
        overflow-y: auto;
        overflow: auto;
        overflow-x: auto;
        height: 100%;
    }

    .main-container {
        display: flex;
        overflow: auto;
        max-width: 95vw;
        min-height: 95vh;
        margin: 30px auto;
        border-radius: 20px;
        flex-direction: column;
        background-color: #191414;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    }

    .header-container {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        justify-content: center;
    }

    .selection-container {
        overflow-y: auto;
        /* gap: 20px; */
        display: flex;
        flex-wrap: wrap;
        padding-top: 35vh;
        justify-content: flex-start;
    }

    .test {
        flex-wrap: wrap;
        width: 50%;
        height: 15vh;
        border-radius: 25px;
        background-color: gray;
        display: flex;
        align-items: center;
        justify-content: center;
        /* overflow: hidden; */
        position: relative;
    }
/*
    .test button, 
    .test-2 button,
    .test-3 button {
        width: 100%;
        height: 100%;
        border: none;
        background-color: #282828;
        color: #fff;
        cursor: pointer;
        border-radius: 25px;
        position: absolute;
        top: 0;
        left: 0;
    }


    .test button:hover, .test-2 button:hover{
        background-color: crimson;
    } */
</style>
