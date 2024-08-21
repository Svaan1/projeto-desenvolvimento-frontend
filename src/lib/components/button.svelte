<script>
    import { goto } from '$app/navigation';
    import Modal from '../components/modal.svelte';

    export let text;
    export let href;
    export let showModalOption = false;

    let showModal = false;

    // if there is a better option on how to do it
    // i don't know and i don't care that much either.
    function toggleModal(){
        if (showModalOption) {
            showModal = !showModal;
        } else {
            goto(href);
        }
    }

    function optionOne() {
        console.log('Option One selected');
        closeModal();
    }

    function optionTwo() {
        console.log('Option Two selected');
        closeModal();
    }
</script>

<div class="button-container">
    <button on:click={() => goto(href), toggleModal}>
        <div class="text-container">
            {text}
        </div>
    </button>
</div>

<Modal bind:showModal>
	<h2 slot="header">
		Choose One
	</h2>

    <div class="button-row">
        <button class="join-session">Join Session</button>
        <div class="vertical"></div>
        <button class="create-session">Create New Session</button>
    </div>

</Modal>


<style>

    *{
        font-family: 'Fragment Mono', monospace;  
    }

    .button-row {
        display: flex;
        align-items: center;
    }

    .vertical {
        width: 1px;
        height: 24px;
        background-color: #000;
        margin: 0 8px;
    }

    .join-session,
    .create-session {
        min-height: 25vh;
        padding: 8px 16px;
        font-size: 16px;
        cursor: pointer;
    }

    .button-container{
        width: 400px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .text-container {
        color: #fff;
        margin: 10px;
        text-align: left;
        font-size: 1.2em;
        font-weight: bolder;
        align-self: flex-start;
        text-transform: capitalize;
        text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.7), 
                     1px 1px 2px rgba(255, 255, 255, 0.2);
        letter-spacing: 1.5px;
        transition: font-size 0.5s;
    }

    button {
        width: 100%;
        display: flex;
        cursor: pointer;
        min-height: 100%;
        border-radius: 25px;
        align-items: flex-start;
        justify-content: flex-start;
        background-color: #282828;
        transition: background-color 0.4s ease;
    }

    button:hover{
        background-color: #2c45b8; /* also testing purposes only */
    }

</style>
