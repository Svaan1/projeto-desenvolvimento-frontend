<script>
	export let showModal; // boolean

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}>

	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot />
		<!-- svelte-ignore a11y-autofocus -->
		<div class="close-container">
            <button class="close-btn" autofocus on:click={() => dialog.close()}>Don't confirm</button>
        </div>
	</div>
</dialog>

<style>
	dialog {
		width: 20vw;
		padding: 0;
		border: none;
		/* border-radius: 30px; */
        background-color: #191414;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(5px);
	}
	dialog > div {
		padding: 2em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.close-container {
		display: flex;
        justify-content: center;
	}

	.close-btn{
		border: none;
		background-color: transparent;
		color: white;
		cursor: pointer;
		font-size: 1em;
		font-weight: 600;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
</style>
