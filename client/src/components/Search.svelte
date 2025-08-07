<script>
  import { onMount } from 'svelte';
  let query = '';
  let results = [];

  async function search() {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { credentials: 'include' });
    if (res.ok) results = await res.json();
  }
</script>

<div class="p-4">
  <input bind:value={query} on:input={search} class="w-full p-2 border" placeholder="Ara..." />
  {#each results as result}
    <div class="p-2 bg-gray-50 rounded mb-2">
      <p>{result.content.substring(0, 50)}...</p>
      <p class="text-sm text-gray-500">Yazar: {result.User.username}</p>
    </div>
  {/each}
</div>
