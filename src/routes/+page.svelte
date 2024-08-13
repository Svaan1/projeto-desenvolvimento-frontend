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
            <Icon icon="ant-design:export-outlined"/>
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
        margin-bottom: 15px;
        font-size: 4em;
        font-family: 'Fragment Mono', monospace;
    }

    h2 {
        user-select: none;
        color: #1DB954;
        font-family: 'Fragment Mono', monospace;
        margin-bottom: 0;
    }

    p{
        font-size: 1.5em;
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