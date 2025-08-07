<script>
  export let user;
</script>

<header class="bg-blue-600 text-white p-4">
  <div class="container mx-auto flex justify-between items-center">
    <h1 class="text-2xl font-bold">Kamu Mikroblog</h1>
    <nav>
      {#if user}
        <a href="/profile" class="mr-4">{user.username}</a>
        <a href="/logout" class="mr-4">Çıkış</a>
      {:else}
        <a href="/login" class="mr-4">Giriş</a>
        <a href="/register">Kayıt Ol</a>
      {/if}
    </nav>
  </div>
</header>
