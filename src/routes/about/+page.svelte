<script>
    import Footer from '$components/footer_about.svelte';
    import { onMount } from 'svelte';

    let isMobile = false;

    onMount(() => {
        const userAgent = navigator.userAgent || window.opera;
        isMobile = /android|iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    });
</script>

<main>
    <div class="container">
        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 14 14" {...$$props} class="fly">
            <path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" d="M1.25 2.75h1.61a.49.49 0 0 1 .48.38l.51 2l5-1a3.69 3.69 0 0 1 4.4 3.59a1 1 0 0 1-1 1h-4.4l-1 1.58a2 2 0 0 1-1.68.92h-1.1a.5.5 0 0 1-.44-.73l.88-1.74H1.75a1 1 0 0 1-1-1v-4.5a.5.5 0 0 1 .5-.5" />
        </svg>
      </div>
    <div class="main-container">
        {#if isMobile}
            <h1>About this <a class="mobile" href="/">site</a></h1>
        {:else}
            <h1>About this <a class="desktop" href="/">site</a></h1>
        {/if}
        <div class="description-container">
            <p>
                <strong>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Cum autem mollitia fugit ullam aspernatur dolorum non libero exercitationem itaque vero a, qui alias eveniet nisi suscipit placeat consequatur beatae aliquid! 
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Nobis officia, veritatis recusandae omnis praesentium porro, maxime laboriosam earum et dolore, beatae eligendi illo voluptatibus doloremque repudiandae obcaecati necessitatibus eius facere! 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Aperiam quaerat vitae, atque, nesciunt perspiciatis dolor nam quod ratione quisquam, corporis rem repellat repellendus alias nostrum? 
                    Facere doloremque veritatis a eius. 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, labore vero. 
                    Vero, atque, perferendis ullam reprehenderit vitae minima cupiditate officiis corporis quibusdam molestias debitis praesentium. 
                    Fuga, labore atque. Ipsa, error! 
                </strong>
            </p>
        </div>
    </div>
</main>

<Footer />


<style>
/* Section: GLobal styling */
    *{
        font-family: 'Fragment Mono', monospace;   
    }

/* Section: Tag Styling */

    main {
        margin: 0;
        height: 100%;
        overflow: hidden;
    }

    h1{
        margin: 0;
        font-size: 4em;
        display: inline;
        color: #1DB954;
        text-align: center;
        margin-bottom: 0.3em;
    }

    strong{
        color: #2d46b9;
    }

    p{
        color: #fff;
        font-size: 1.5em;
        text-align: center;
        width: calc(80vw + 20px);
    }

/* Section: class styling */

    .main-container {
        height: 100vh;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    .description-container{
        display: flex;
        overflow: auto;
        user-select: none;
        max-height: calc(50vh - 80px);
    }

    .mobile{
        color: #fff;
    }

    .desktop{
        color: #ee2b2a;
        text-decoration: none;
    }

    .desktop:hover{
        text-decoration: underline;
    }

    .fly {
        top: 100px;
        position: absolute;
        animation: flyAcross 15s linear infinite;
        animation: flySineWave 5s linear infinite;
    }


    @keyframes flySineWave {
        0% {
            left: 0;
            transform: translateY(0);
        }
        25% {
            transform: translateY(-30px);
        }
        50% {
            left: 50%;
            transform: translateY(0);
        }
        75% {
            transform: translateY(20px);
        }
        100% {
            left: 100%;
            transform: translateY(0);
        }
    }

    @keyframes flyAcross {
        0% {
        transform: translateX(-10vw);
        }
        100% {
        transform: translateX(110vw);
        }
    }

</style>