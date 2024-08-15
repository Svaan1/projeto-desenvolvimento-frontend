<script>
    import Sidebar from '../../lib/components/+sidebar.svelte'
</script>


<main>
    <div class="container">
        <h1>Hello user.</h1>
        <h2>this is your profile.</h2>
        <p>return <a href="/home">Home</a></p>
    </div>
</main>
<Sidebar/>

<style>
    *{
        overflow:hidden;
    }
    
    main {
        font-family: 'Fragment Mono', monospace;
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
        user-select: none;
        color: #1DB954;
    }

    .container h2{
        color: #ff3e00;
    }

    .container p{
        color: #ff3e00;
    }

    .container a{
        color: #fff;
    }
    
</style>
