<script>
    import { onMount } from 'svelte';
    import Button from '../../lib/components/home/button.svelte';
    
    let user = 'Hello, World!';
    let buttons = [
        { text: "Guess the song", href: "/gts", showModal: false },
        { text: "Guess the song [🔥 HARDCORE 🔥]", href: "/gts/h", showModal: false },
        { text: "Guess the listener", href: "/gtl", showModal: true },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" },
        // { text: "Hello, World!", href: "/helloworld" }
    ];
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
                    Hello <span>{user}</span>, dive into the modes!
                </h1>
            </div>
            <div class="button-container">
                {#each buttons as button}
                    <Button text={button.text} href={button.href} showModalOption={button.showModal} />
                {/each}
            </div>
        </div>
    {/if}

</main>

<style>

    * {
        font-family: 'Fragment Mono', monospace;
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
        top: 5vh;
        left: 1vw;
        width: 100%;
        position: absolute;
    }

    .header-text h1{
        font-size: 2em;
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

    .button-container {
        top: 40%;
        gap: 10px;
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        position: absolute;
        padding-bottom: 20px;
        justify-content: center;
    }

</style>