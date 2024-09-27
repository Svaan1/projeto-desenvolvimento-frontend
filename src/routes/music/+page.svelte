<script>
    /** @type {import('./$types').PageData} */
    export let data;

    let debounceTimer;
    let currentSearchedValues = [];

    const debounce = async (v) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            if (v) {
                let response = await fetch(`/api/search?q=${v}&t=track`);
                if (response.ok) {
                    let data = await response.json();
                    currentSearchedValues = data.tracks.items;
                    return;
                }
            }
            currentSearchedValues = []
        }, 750);
    }

    const checkTrack = () => {

    }
</script>

<p style="color: white">
    <img class="track-image" src={data.music.album.image} alt=""/>
</p>


<input on:keyup={({ target: { value } }) => debounce(value)} />

{#each currentSearchedValues as item}
    <p>
        <button class="track-item" on:click={() => {checkTrack(item)}}>
            <img src={item.album.images[2].url} alt="">
            {item.name}
            {item.album.artists[0].name}
        </button>
    </p>

{/each}

<style>
    .track-image {
        width: 200px;
        height: 200px;
        object-fit:cover;
        object-position:50% 50%;
    }

    .track-item:hover {
        border: 1px solid white;
    }
</style>