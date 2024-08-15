<script>
    import Sidebar from '../../lib/components/sidebar.svelte'

    let currentView;

</script>

<main>
<Sidebar>
    <!-- svelte-ignore empty-block -->
    {#if currentView === 'Home'}
    
    {:else if currentView === ' User'}
        <!-- svelte-ignore missing-declaration -->
        <UserPage/>
    {/if}
</Sidebar>
</main>

<style>
    *{
        overflow:hidden;
        font-family: 'Fragment Mono', monospace;
    }
</style>
