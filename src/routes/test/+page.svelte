<script>
  import UserPage from '../user/+page.svelte';

  let items = ['Home', 'User', 'Lorem', 'Ipsum'];
  let activeItem = 'Home';
  
  const changeView = (e) => {
    activeItem = e.detail;
  }
</script>

<main>
  <Tabs {activeItem} items={items} on:currentView={changeView}/>
  {#if activeItem === 'Home'}
    <p>Home page!</p>
  {:else if activeItem === 'User'}
    <UserPage />
  {:else if activeItem === 'Lorem'}
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
  {:else}
    <p>Ipsum</p>
  {/if}
</main>

<style>
   
    main {
        font-family: 'Fragment Mono', monospace;
    }

</style>
