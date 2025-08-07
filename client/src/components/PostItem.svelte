<script>
  export let post;
  export let user;
  let isVisibleToUser = user && (user.role !== 'newbie' || post.isVisible || user.role === 'admin' || user.role === 'moderator');
</script>

{#if isVisibleToUser}
  <div class="p-4 bg-white shadow rounded mb-4">
    <p class="font-bold">{post.User.username}</p>
    <p>{post.content}</p>
    {#if post.moderationNote && (user.role === 'admin' || user.role === 'moderator' || post.UserId === user.id)}
      <p class="text-red-500 text-sm">Moderasyon Notu: {post.moderationNote}</p>
    {/if}
    <button class="text-blue-600">Beğen ({post.likes})</button>
    <button class="text-blue-600">Hikayene Ekle</button>
  </div>
{/if}
