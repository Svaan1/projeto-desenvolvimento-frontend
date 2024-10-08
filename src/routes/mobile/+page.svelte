<script>
    let h1counter = [
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." },
        { text: "hello, dive into the modes." }
    ];
</script>

<div class="main-container">
    <div class="modes-container">
        {#each h1counter as mode}
            <h1>{mode.text}</h1>
        {/each}
    </div>
</div>

<style>
    .main-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 25px;
        background-color: #191414;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        max-height: 100vh;
        overflow: hidden;
    }

    .modes-container {
        overflow-y: auto;
        width: 100%;
        max-height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        margin: 10px 0;
    }
</style>