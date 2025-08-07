
## App.svelte (Güncellenmiş)
`App.svelte`, uygulamanın ana bileşenidir ve tüm sayfaları (anasayfa, profil, yönetim paneli vb.) yönlendirmek için Svelte’nin yönlendirme (routing) özelliğini kullanır. Sol menü (ağaç yapısı), sağ menü (öneriler) ve yönetim paneli entegrasyonu içerir.

```svelte
<script>
  import { Router, Route } from 'svelte-routing';
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import PostList from './components/PostList.svelte';
  import Profile from './components/Profile.svelte';
  import AdminPanel from './components/AdminPanel.svelte';
  import Search from './components/Search.svelte';
  import { onMount } from 'svelte';
  let user = null;

  onMount(async () => {
    // Kullanıcı bilgisini al
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (res.ok) user = await res.json();
  });
</script>

<Router>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Header {user} />
    <div class="container mx-auto p-4 flex flex-1">
      <!-- Sol Menü (Ağaç Yapısı) -->
      <aside class="w-1/4 p-4 bg-white shadow rounded">
        <nav>
          <ul>
            <li><a href="/" class="text-blue-600 flex items-center"><span class="mr-2">🏠</span>Home</a></li>
            <li><a href="/profile" class="text-blue-600 flex items-center"><span class="mr-2">👤</span>Profile</a></li>
            <li><a href="/saved" class="text-blue-600 flex items-center"><span class="mr-2">⭐</span>Saved</a></li>
            <li><a href="/following" class="text-blue-600 flex items-center"><span class="mr-2">👥</span>Following</a></li>
            <li>
              <span class="font-bold flex items-center"><span class="mr-2">🌐</span>Communities</span>
              <ul class="pl-6">
                <li><a href="/communities/health" class="text-blue-600 flex items-center"><span class="mr-2">💪</span>Health and Fitness</a></li>
                <li><a href="/communities/travel" class="text-blue-600 flex items-center"><span class="mr-2">✈️</span>Travel</a></li>
                <li><a href="/communities/food" class="text-blue-600 flex items-center"><span class="mr-2">🍽️</span>Food and Cooking</a></li>
                <li><a href="/communities/music" class="text-blue-600 flex items-center"><span class="mr-2">🎵</span>Music</a></li>
                <li><a href="/communities/sports" class="text-blue-600 flex items-center"><span class="mr-2">⚽</span>Sports</a></li>
              </ul>
            </li>
            {#if user && ['admin', 'moderator', 'category_moderator'].includes(user.role)}
              <li><a href="/admin" class="text-blue-600 flex items-center"><span class="mr-2">⚙️</span>Yönetim Paneli</a></li>
            {/if}
          </ul>
        </nav>
      </aside>
      <!-- Ana İçerik -->
      <section class="w-2/4 p-4">
        <Route path="/">
          <PostList />
        </Route>
        <Route path="/profile">
          <Profile {user} />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/admin">
          {#if user && ['admin', 'moderator', 'category_moderator'].includes(user.role)}
            <AdminPanel {user} />
          {:else}
            <p>Yetkisiz erişim</p>
          {/if}
        </Route>
        <Route path="/communities/:id" let:params>
          <h2>{params.id} Topluluğu</h2>
          <PostList category={params.id} />
        </Route>
      </section>
      <!-- Sağ Menü -->
      <aside class="w-1/4 p-4 bg-white shadow rounded">
        <h3 class="font-bold">Önerilen Kullanıcılar</h3>
        <ul>
          <li><a href="/user/example" class="text-blue-600">Example User</a></li>
        </ul>
        <h3 class="font-bold mt-4">Önerilen Gruplar</h3>
        <ul>
          <li><a href="/groups/teachers" class="text-blue-600">Öğretmenler</a></li>
        </ul>
      </aside>
    </div>
    <Footer />
  </div>
</Router>

<style>
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';
</style>
