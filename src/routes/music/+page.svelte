<script>
    export let musicTitle = "hello world";
    export let musicArtist = "artist name";
</script>

<div class="outer-container">
    <div class="top-text">
        <h3>I think today music is </h3>
    </div>
    <div class="search-bar">
        <input type="text" class="search-input">
        <button class="search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...$$props}>
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path stroke-dasharray="20" stroke-dashoffset="20" d="M21 12h-17.5">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0" />
                    </path>
                    <path stroke-dasharray="12" stroke-dashoffset="12" d="M3 12l7 7M3 12l7 -7">
                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="12;0" />
                    </path>
                </g>
            </svg>
        </button>
    </div>
    <div class="iner-container">
        <div class="music-thumb">
            <img src="https://via.placeholder.com/150" alt="music-thumb">
        </div>
        <div class="music-related">
            <h3>{musicTitle}</h3>
            <p>{musicArtist}</p>
        </div>
    </div>
</div>

<style>

    .outer-container{
        width: 100%;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        background-color: rgb(14, 14, 14);
    }

    .top-text h3{
        font-family: 'Roboto', sans-serif;
        color: white;
        font-size: 2em;
        position: absolute;
        top: 5vh;
    }

    .top-text h3::after {
        content: '.';
        display: inline-block;
        animation: dots 1.5s steps(5, end) infinite;
    }

    @keyframes dots {
        0%, 20% {
            color: rgba(255, 255, 255, 0);
            text-shadow:
                .25em 0 0 rgba(255, 255, 255, 0),
                .5em 0 0 rgba(255, 255, 255, 0);
        }
        40% {
            color: white;
            text-shadow:
                .25em 0 0 rgba(255, 255, 255, 0),
                .5em 0 0 rgba(255, 255, 255, 0);
        }
        60% {
            text-shadow:
                .25em 0 0 white,
                .5em 0 0 rgba(255, 255, 255, 0);
        }
        80%, 100% {
            text-shadow:
                .25em 0 0 white,
                .5em 0 0 white;
        }
    }

    .search-bar{
        top: 13vh;
        display: flex;
        align-items: center;
        position: relative;
        justify-content: center;
        flex-direction: row;
    }

    .search-input {
        width: 100%;
        font-size: 2em;
        padding: 2px;
        border: none;
        outline: none;
        border-radius: 0;
        background: transparent;
        color: #808080;
        border-bottom: 1px solid white;
    }

    .search-btn{
        margin-bottom: 5px;
        border: none;
        background-color: rgb(255, 255, 255);
        transition: background-color 0.3s;
        color: rgb(0, 0, 0);
        padding: 10px 20px;
        cursor: pointer;
        font-size: 1em;
    }

    .search-btn:hover{
        background-color: rgb(0, 0, 0);
        color: rgb(255, 255, 255);
        transition: background-color 0.3s;
    }

    .search-btn svg {
        transform: rotate(0deg);
        transition: transform 0.3s;
    }

    .search-btn:hover svg {
        transform: rotate(180deg);
        transition: transform 0.3s;
    }

    .search-btn:active {
        transform: scale(0.9);
        transition: transform 0.1s;
    }

    .iner-container{
        border: 1px solid white;
        width: 50%;
        height: 70%;
        top: 20vh;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .music-thumb{
        width: 200px;
        height: 200px;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: center;
        background-color: rgb(0, 0, 255);
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotateY(0deg);
        }
        to {
            transform: rotateY(-180deg);
        }
    }
    .music-related{
        color: white;
        font-size: 2em;
        font-family: 'Roboto', sans-serif;
        text-align: center;
    }

</style>