<script>
  import PostItem from './PostItem.svelte';
  import { onMount } from 'svelte';
  let posts = [];
  let user = null;

  onMount(async () => {
    const userRes = await fetch('/api/auth/me', { credentials: 'include' });
    if (userRes.ok) user = await userRes.json();
    const postRes = await fetch('/api/posts', { credentials: 'include' });
    if (postRes.ok) posts = await postRes.json();
  });
</script>

<div>
  {#each posts as post}
    <PostItem {post} {user} />
  {/each}
</div>
