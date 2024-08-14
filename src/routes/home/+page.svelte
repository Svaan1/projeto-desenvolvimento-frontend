<script>
    import Sidebar from '../../lib/+sidebar.svelte'
</script>


<main>
    <div class="container">
        <h1><strong>Hello World!</strong></h1>
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
    
</style>
