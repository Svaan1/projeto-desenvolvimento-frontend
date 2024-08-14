<script>
</script>

<main>
    <aside>
        <div class="user-container">
            <ul>
                <li>
                    <a href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" {...$$props}>
                            <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
                        </svg>
                        home
                    </a>
                </li>
                <li>
                    <a href="/user">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" {...$$props}>
                            <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
                        </svg>
                        profile
                    </a>
                </li>
            </ul>
        </div>
        <div class="select-container">

        </div>
    </aside>
</main>

<style>    
    main {
        font-family: 'Fragment Mono', monospace;
        display: flex;
        height: 100vh;
        margin: 0;
    }

    aside {
        top: 1vh;
        left: 1vw;
        width: 13vw;
        height: auto;
        display: flex;
        padding: 1rem;
        color: white;
        margin: 1vh 1vw;
        position: fixed;
        max-width: 13vw;
        min-width: 300px;
        text-align: center;
        border-radius: 20px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        background-color: blue;
    }


    /*.user-container {
        top: 1vh;
        left: 1vh;
        width: 15vw;
        height: 10vh;
        display: flex;
        padding: 0.5vw;
        margin: 1vh 1vw;
        position: absolute;
        border-radius: 20px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        background-color: blue; 
    }*/

    .user-container a {
        padding-left: 1rem;
        margin-left: -0.5rem;
    }

    .user-container ul{
        list-style-type: none;
    }

    a {
        gap: 1vw;
        color: white;
        display: flex;
        font-size: 2em;
        padding: 0.5vh;
        padding-right: 5vw;
        text-align: center;
        align-items: center;
        text-decoration: none;
        font-family: 'Fragment Mono', monospace;
    }

    a svg {
        color: #fff;
        vertical-align: middle;
    }

    a:hover {
        text-decoration: underline;
    }

    /* .select-container {
        left: 1vh;
        width: 15vw;
        min-width: 15vw;
        min-height: none;
        padding: 0.5vw;
        margin: 1vh 1vw;
        position: absolute;
        border-radius: 20px;
        background-color: blue;
        top: calc(12vh + 15px + 15px);
        height: calc(100vh - 12vh - 77px);
    }     */
</style>
