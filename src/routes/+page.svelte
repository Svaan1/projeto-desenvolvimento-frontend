<script>
    import Footer from '../lib/components/footer.svelte'

    const handleClick = () => {
        console.log("clicked!");
        window.location.href = "/home"
    }
</script>

<main>
    <div class="container">
        <div class="image-container">
            <img class="spotify" src="spotify.png" alt="spotify ico">
            <h2>Spotify</h2>
        </div>
        <h1><strong>Spotify Music Guess</strong></h1>
        <p><strong>Can you guess the correct <span class="auto-type"></span></strong></p>
        <button on:click={handleClick} class="login">
            Log in with Spotify
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" {...$$props}>
                    <path fill="black" fill-rule="evenodd" d="M880 912H144c-17.7 0-32-14.3-32-32V144c0-17.7 14.3-32 32-32h360c4.4 0 8 3.6 8 8v56c0 4.4-3.6 8-8 8H184v656h656V520c0-4.4 3.6-8 8-8h56c4.4 0 8 3.6 8 8v360c0 17.7-14.3 32-32 32M770.87 199.131l-52.2-52.2c-4.7-4.7-1.9-12.8 4.7-13.6l179.4-21c5.1-.6 9.5 3.7 8.9 8.9l-21 179.4c-.8 6.6-8.9 9.4-13.6 4.7l-52.4-52.4l-256.2 256.2c-3.1 3.1-8.2 3.1-11.3 0l-42.4-42.4c-3.1-3.1-3.1-8.2 0-11.3z" />
                </svg>
            </div>
        </button>
    </div>
</main>
<Footer /> 
<!-- Footer from +footer.svelte -->

<style>
/* Section: GLobal styling */
    *{
        font-family: 'Fragment Mono', monospace;   
    }

/* Section: Tag Styling */

    main {
        min-height: 100vh;
    }

    h1{
        color: #fff;
        font-size: 4em;
        text-align: center;
        margin-bottom: 0.3em;
    }

    h2,
    p {
        user-select: none;
    }

    h2 {
        color: #1DB954;
    }

    p{
        color: #fff;
        font-size: 1.5em;
        text-align: center;
    }

    p span{
        position: relative;
    }

/* Section: class styling */

    .container {
        display: flex;
        min-height: 100vh;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    .image-container {
        display: flex;
        align-items: center;
    }

    .spotify {
        width: 100px;
        user-select: none;
    }

    .login {
        height: 55px;
        display: flex;
        font-size: 1em;
        cursor: pointer;
        padding: 10px 20px;
        align-items: center;
        border-radius: 10px;
        border-style: groove;
        text-decoration: underline;
        background-color: #fff;
        box-shadow: 0px 0px #0c702f;
        transition: box-shadow 0.2s ease;
    }

    .icon{
        color: #000;
        font-size: 1.5em;
        margin-left: 0.3rem;
    }

/* Section: Hovers */

    .login:hover{
        box-shadow: 7px 10px #0c702f;
    }

/* Section: Click */

    .login:active{
        background-color: #c2c2c2;
    }

/* Section: before */

    p span::before{
        color: #ee2b2a;
        content: "Μουσική?";
        animation: words 20s infinite;
    } 

/* Section: After */

    p span::after{
        content: "";
        right: -8px;
        height: 100%;
        position: absolute;
        width: calc(100% + 8px);
        border-left: 2px solid #ee2b2a;
        background-color: rgb(15, 15, 15);
        animation: cursor .8s infinite, typing 20s steps(14) infinite;
    }

/* Section: Animations */

    @keyframes cursor{
        to{
            border-left: 2px solid rgb(15, 15, 15);
        }
    }

    @keyframes words {
        0%, 20%{
            content: "Song?";
            font-size: 1em;
        }
        21%, 40%{
            content: "Музыка?";
            font-size: 1em;
        }
        41%, 60%{
            content: "音楽？";
            font-size: 0.8em;
        }
        61%, 80%{
            content: "Musique?";
            font-size: 1em;
        }
        81%, 100%{
            content: "Música?";
            font-size: 1em;
        }
    }

    @keyframes typing{
        10%,15%,30%,35%,50%,55%,70%,75%,90%,95%{
            width: 0;
        }
        5%,20%,25%,40%,45%,60%,65%,80%,85%{
            width: calc(100% + 8px);
        }
    }

</style>