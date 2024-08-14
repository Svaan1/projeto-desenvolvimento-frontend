<script>
    import Icon from '@iconify/svelte';
    import Footer from '../lib/+footer.svelte'

    const handleClick = () => {
        console.log("clicked!");
        window.location.href = "/home"
    }
</script>

<main>
    <div class="container">
        <img class="spotify" src="spotify.png" alt="spotify ico">
        <h2>Spotify</h2>
    </div>
    <h1><strong>Spotify Music Guess</strong></h1>
    <p><strong>Can you guess the correct song?</strong></p>
    <button on:click={handleClick} class="login">
        Log in with Spotify
        <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" {...$$props}>
                <path fill="black" fill-rule="evenodd" d="M880 912H144c-17.7 0-32-14.3-32-32V144c0-17.7 14.3-32 32-32h360c4.4 0 8 3.6 8 8v56c0 4.4-3.6 8-8 8H184v656h656V520c0-4.4 3.6-8 8-8h56c4.4 0 8 3.6 8 8v360c0 17.7-14.3 32-32 32M770.87 199.131l-52.2-52.2c-4.7-4.7-1.9-12.8 4.7-13.6l179.4-21c5.1-.6 9.5 3.7 8.9 8.9l-21 179.4c-.8 6.6-8.9 9.4-13.6 4.7l-52.4-52.4l-256.2 256.2c-3.1 3.1-8.2 3.1-11.3 0l-42.4-42.4c-3.1-3.1-3.1-8.2 0-11.3z" />
            </svg>
        </div>
    </button>
</main>
<Footer /> 
<!-- Footer from +footer.svelte -->

<style>

/* Global styling */

    *{
        overflow: hidden;
        margin-top: 0;
        color: #ffffff;
    }

/* Tag Styling */

    h1{
        display: flex;
        font-size: 4em;
        text-align: center;
        margin-bottom: 0.3em;
        font-family: 'Fragment Mono', monospace;
    }

    h2 {
        color: #1DB954;
        margin-bottom: 0;
        user-select: none;
        font-family: 'Fragment Mono', monospace;
    }

    p{
        display: flex;
        font-size: 1.5em;
        text-align: center;
        font-family: 'Fragment Mono', monospace;
    }

    main {
        height: 100vh;
        display: flex;
        overflow: hidden;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

/* Section: . styling */

    .container {
        display: flex;
        overflow: hidden;
        align-items: center;
        flex-direction: row;
        justify-content: center;
    }

    .spotify {
        user-select: none;
        width: 100px;
        margin-right: 0px;
    }

    .login {
        height: 55px;
        color: #000;
        display: flex;
        font-size: 1em;
        cursor: pointer;
        padding: 10px 20px;
        align-items: center;
        border-radius: 10px;
        border-style: groove;
        text-decoration: underline;
        background-color: #ffffff;
        box-shadow: 0px 0px #1DB954;
        transition: box-shadow 0.5s ease-in;
    }

    .icon{
        font-size: 1.5em;
        margin-left: 0.3rem;
        color: #000;
    }

/* Section: Hovers */

    .login:hover{
        box-shadow: 7px 10px #0c702f;
    }

/* Section: Click */

    .login:active{
        background-color: #c2c2c2;
    }

/* Section: animations */


</style>