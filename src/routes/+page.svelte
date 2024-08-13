<script>
    import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';

    // Function to handle page load time
    function handlePageLoad() {
        const loadTime = new Date().toISOString();
        localStorage.setItem('pageLoadTime', loadTime);
        console.log(`Page loaded at: ${loadTime}`);
    }

    // Execute function when the component is mounted
    onMount(() => {
        const storedLoadTime = localStorage.getItem('pageLoadTime');
        if (storedLoadTime) {
            console.log(`Stored page load time: ${storedLoadTime}`);
        } else {
            handlePageLoad();
        }
    });

    const handleClick = () => {
        console.log("clicked!");
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }

</script>

<main>
    <div class="container"> <!-- putting this in a div container makes it easier to manip -->
        <img class="spotify" src="spotify.png" alt="spotify ico">
        <img class="spotify-shdw" src="spotify.png" alt="spotify ico">
    </div>
    <button on:click={handleClick} class="login">
        Log in with Spotify
        <div class="icon">
            <Icon icon="ant-design:export-outlined"/>
        </div>
    </button>
</main>

<style>
    main {
        height: 80vh;
        display: flex;
        margin: 0 auto;
        overflow: hidden;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

/* Section: main styling */

    .container {
        position: relative;
        display: inline-block;
    }

    .spotify {
        z-index: 1;
        height: auto;
        width: 250px;
        display: block;
        position: relative;
    }

    .spotify-shdw {
        position: absolute;
        top: 5px;
        left: 5px;
        z-index: 0;
        opacity: 0.5;
        width: 250px;
        height: auto;
        filter: blur(30px);
        animation: blurAnimation 3s infinite;
    }

    .login {
        width: 200px;
        height: 65px;
        display: flex;
        font-size: 1em;
        padding: 0 1rem;
        text-align: center;
        align-items: center;
        border-radius: 10px;
        border-style: groove;
        justify-content: center;
        text-decoration: underline;
        background-color: #ffffff;
        box-shadow: 0px 0px #1DB954;
        transition: box-shadow 0.5s ease-in;
    }

    .icon{
        font-size: 1.5em; 
        margin-left: 0.3rem;
        margin-top: 0.2rem;
    }

/* Section: Hovers */

    .login:hover{
        box-shadow: 7px 7px #1DB954;
    }

/* Section: animations */

    @keyframes blurAnimation {
        0% {
            filter: blur(30px);
        }
        50% {
            filter: blur(70px);
        }
        100% {
            filter: blur(30px);
        }
    }

</style>