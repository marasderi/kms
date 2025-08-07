<script>
  import PostItem from './PostItem.svelte';
  let posts = [];
  async function fetchPosts() {
    const res = await fetch('/api/posts', { credentials: 'include' });
    if (res.ok) posts = await res.json();
  }
  onMount(fetchPosts);
</script>

<div>
  {#each posts as post}
    <PostItem {post} />
  {/each}
</div>
