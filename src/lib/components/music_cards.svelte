<script>

    export let banner = "https://static.vecteezy.com/system/resources/previews/014/989/719/original/question-mark-hand-drawn-doodle-faq-symbol-free-vector.jpg";
    export let musicName = "Sun Killer";
    export let artistName = "Spiritbox";
    export let albumName = "Eternal Blue";
    export let launch = "1984-12-05";
    import Modal from './modal_music.svelte';

    let showModal = false;

    function handleClick() {
        // showModal = !showModal;
    };

</script>

<Modal bind:showModal>
    <button class="modal-background-modal">
        <div class="modal-background-container">
            <div class="modal-music-banner">
                <img src={banner} alt="music-banner" style="width: 50%; height: 50%;"/>
            </div>
            <div class="modal-text-container">
                <div class="modal-music-name">
                    <h2>{musicName}</h2>
                </div>
                <div class="modal-artist-container">
                    <h2>{artistName}</h2>
                </div>
            </div>
        </div>
    </button>
    <div class="modal-button-container">
        <button class="modal-confirm">Confirm?</button>
    </div>
    <style>
        .modal-background-modal {
            width: 230px;
            border: none;
            text-decoration: none;
            background-color: rgba(107, 107, 107, 0.233);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .modal-background-container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .modal-music-banner {
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .modal-text-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .modal-music-name, .modal-artist-container {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .modal-button-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .modal-confirm {
            width: 195px;
            height: 70px;
            background-color: #1ED760;
            color: black;
            border: none;
            border-radius: 50px;
            margin: 10px;
            cursor: pointer;
            font-size: 1.2em;
        }
    </style>
</Modal>

<button class="clickable" on:dblclick={handleClick}>
    <div class="holder">
        <div class="container">
            <div class="photo-container">
                <img src={banner} alt="music-banner" />
            </div>
            <div class="content">
                <h3 class="music-name">{musicName}</h3>
                <div class="sub-content">
                    <h4 class="artist-name">{artistName}</h4>
                </div>
            </div>
            <div class="album">
                <h3 class="album-name">{albumName}</h3>
            </div>
            <div class="info">
                <h4 class="launch-date">{launch}</h4>
            </div>
        </div>
    </div>
</button>


<style>

    *{
        font-family: "Rubik Mono One", monospace;
        font-weight: 400;
        font-style: normal;
    }

    .holder {
        /* border: 1px solid yellow; */
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: auto;
    }

    .container {
        /* border: 1px solid green; */
        display: flex;
        align-items: center;
        padding: 10px;
        width: 100%;
        height: auto;
        color: #fff;
        transition: background-color 0.3s ease;
        border-radius: 5px;
    }

    .clickable {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        width: 100%;
        display: flex;
        align-items: center;
        text-align: left;
    }

    .clickable:focus {
        outline: none;
    }

    .container:hover {
        background-color: rgba(107, 107, 107, 0.233);
    }

    .photo-container {
        /* border: 1px solid blue; */
        width: 50px;
        min-width: 50px;
        height: 50px;
        margin-right: 10px;
    }

    .photo-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
    }

    .content {
        /* border: 1px solid white; */
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 50%;
        min-width: 50%;
        max-width: 50%;
    }

    .content .music-name {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
    }

    .content .artist-name {
        font-size: 14px;
        color: #aaa;
        margin: 0;
    }

    .album {
        /* border: 1px solid red; */
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        text-align: start;
        width: 50%;
        min-width: 30%;
        max-width: 50%;
        height: 50px;
        padding-left: 10px;
    }

    .album .album-name {
        font-size: 14px;
        color: #aaa;
        margin: 0;
    }

    .info {
        /* border: 1px solid purple; */
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 50px;
        width: 45%;
    }

    .info {
        font-size: 14px;
        color: #aaa;
        margin: 0;
    }

    .launch-date{
        font-size: 18px;
        color: #aaa;
        margin: 0;
    }

</style>
