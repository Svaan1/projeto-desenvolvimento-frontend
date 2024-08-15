<script>
	import { page } from '$app/stores';
</script>

<main>
    <div class="container">
        <h1>Oooopss</h1>
        <span>Error code: {$page.status}</span>
            <img src="https://content.imageresizer.com/images/memes/Pingu-stare-meme-2.jpg" alt="0_0">
        <h2>You can hang around a bit or</h2>
        <p>return <a class="redirectHome" href="/home">Home</a></p>
    </div>
</main>

<style>
    *{
        overflow:hidden;
    }
    
    main {
        font-family: 'Fragment Mono', monospace;
    }

    img {
        width: auto;
        height: auto;
        max-width: 60%;
        max-height: 60%;
        align-items: center;
    }

    .container{
        height: 80vh;
        display: flex;
        margin: 0 auto;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    .container h1{
        color: #1DB954;
        user-select: none;
        text-align: center;
    }

    .container span{
        color: #fff;
        user-select: none;
        margin-bottom: 15px;
    }

    .container a{
        user-select: none;
        text-decoration: underline;
    }

    .container h2{
        color: #2c45b8;
        margin-top: 10px;
        margin-bottom: 0;
        user-select: none;
        text-align: center;
    }

    .container p{
        user-select: none;
        color: #fff;
    }

    .container a{
        user-select: none;
        color: crimson;
    }

</style>
