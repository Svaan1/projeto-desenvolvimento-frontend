<script>
    export let data

    import Homepage from '$components/homepage.svelte'
    import HomepageLogin from '$components/homepage_login.svelte'

</script>

{#if data.user}
    <Homepage user={data.user}/>
{:else}
    <HomepageLogin/>
{/if}