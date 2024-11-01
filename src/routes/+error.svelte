<script>
	import { page } from '$app/stores';
</script>

<main>
    <div class="error-container">
        <h1>Oooopss</h1>
        {#if $page.status === 404}
            <span>Error code: {$page.status}</span>
            <img src="https://content.imageresizer.com/images/memes/Pingu-stare-meme-2.jpg" alt="Pingu stare meme">
        {:else if $page.status === 500}
            <div class="error-500-container">
                <span>Error code: <p>{$page.status}</p></span>
                <img src="https://preview.redd.it/9u69ledqlm091.png?width=640&crop=smart&auto=webp&s=966573ad517164a5e1a2458e910b3263f60acd3b" alt="Error 500 meme">
            </div>        
        {:else}
            <span>Error code: {$page.status}</span>
            <img src="https://i.redd.it/dye318nrz7c91.jpg" alt="Error meme">
        {/if}
        <h2>You can hang around a bit or</h2>
        <p>return <a class="redirect-home" href="/home">Home</a></p>
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

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    main {
        font-family: 'Fragment Mono', monospace;
    }

    img {
        max-width: 80vw;
        max-height: 60vh;
    }

    .error-container h1,
    .error-container span,
    .error-container a,
    .error-container h2,
    .error-container p{
        user-select: none;
    }

    .error-container {
        display: flex;
        padding: 10px;
        margin: 0 auto;
        min-height: 80vh;
        overflow-y: auto;
        max-height: 100vh;
        text-align: center;
        align-items: center;
        flex-direction: column;
        justify-content: space-evenly;
    }

    .error-container h1 {
        color: #1DB954;
    }

    .error-container span {
        color: #fff;
    }

    .error-container a {
        color: crimson;
        text-decoration: underline;
    }

    .error-container h2 {
        color: #2c45b8;
    }

    .error-container p {
        color: #fff;
    }

    .error-500-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .error-500-container span {
        margin-bottom: 70px;
    }
    
    .error-500-container p {
        display: inline;
        font-size: 5em;
        font-family: "Monsieur La Doulaise", cursive;
    }

    .error-500-container img {
        width: calc(60% + 20px);
    }

</style>
