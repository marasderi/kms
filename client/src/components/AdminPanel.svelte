<script>
  import { HomeIcon, UsersIcon, DocumentTextIcon, CollectionIcon, SpeakerphoneIcon, QuestionMarkCircleIcon } from '@heroicons/svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  let user = null;
  let users = [];
  let posts = [];
  let categories = [];
  let announcements = [];
  let selectedSection = 'dashboard';

  // Ağaç yapılı menü verisi
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Genel Bakış',
      icon: HomeIcon,
    },
    {
      id: 'users',
      label: 'Kullanıcılar',
      icon: UsersIcon,
      children: [
        { id: 'user-list', label: 'Kullanıcı Listesi' },
        { id: 'user-ban', label: 'Engelleme' },
        { id: 'user-roles', label: 'Rol Yönetimi' },
      ],
    },
    {
      id: 'posts',
      label: 'Gönderiler',
      icon: DocumentTextIcon,
      children: [
        { id: 'post-list', label: 'Gönderi Listesi' },
        { id: 'post-moderation', label: 'Moderasyon' },
      ],
    },
    {
      id: 'categories',
      label: 'Kategoriler',
      icon: CollectionIcon,
      children: [
        { id: 'category-list', label: 'Kategori Listesi' },
        { id: 'category-add', label: 'Yeni Kategori' },
      ],
    },
    {
      id: 'announcements',
      label: 'Duyurular',
      icon: SpeakerphoneIcon,
      children: [
        { id: 'announcement-list', label: 'Duyuru Listesi' },
        { id: 'announcement-add', label: 'Yeni Duyuru' },
      ],
    },
    {
      id: 'faq',
      label: 'Sık Sorulan Sorular',
      icon: QuestionMarkCircleIcon,
    },
  ];

  onMount(async () => {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (res.ok) {
      user = await res.json();
      if (!['admin', 'moderator', 'category_moderator'].includes(user.role)) {
        goto('/');
      }
    } else {
      goto('/login');
    }

    // Veri çekme (örnek)
    if (selectedSection === 'users') {
      const userRes = await fetch('/api/users', { credentials: 'include' });
      if (userRes.ok) users = await userRes.json();
    } else if (selectedSection === 'posts') {
      const postRes = await fetch('/api/posts', { credentials: 'include' });
      if (postRes.ok) posts = await postRes.json();
    } else if (selectedSection === 'categories') {
      const catRes = await fetch('/api/categories', { credentials: 'include' });
      if (catRes.ok) categories = await catRes.json();
    } else if (selectedSection === 'announcements') {
      const annRes = await fetch('/api/announcements', { credentials: 'include' });
      if (annRes.ok) announcements = await annRes.json();
    }
  });

  function selectSection(section) {
    selectedSection = section;
    // Verileri güncelle (örnek)
  }
</script>

<div class="min-h-screen bg-gray-100 flex flex-col">
  <!-- Üst Başlık -->
  <header class="bg-white p-4 shadow">
    <h1 class="text-2xl font-bold text-blue-600">Yönetim Paneli</h1>
    <p class="text-gray-500">Kamu Mikroblog Yönetimi</p>
  </header>

  <!-- Ana İçerik -->
  <div class="flex flex-1 p-4">
    <!-- Sol Menü (Ağaç Yapısı) -->
    <aside class="w-1/4 bg-white shadow p-4 mr-4">
      <nav>
        <ul class="space-y-2">
          {#each menuItems as item}
            <li>
              <button
                on:click={() => selectSection(item.id)}
                class="w-full text-left p-2 hover:bg-gray-100 rounded flex items-center"
              >
                <svelte:component this={item.icon} class="h-5 w-5 mr-2 text-gray-600" />
                {item.label}
              </button>
              {#if item.children}
                <ul class="pl-6 mt-1 space-y-1">
                  {#each item.children as child}
                    <li>
                      <button
                        on:click={() => selectSection(child.id)}
                        class="w-full text-left p-2 hover:bg-gray-100 rounded flex items-center text-sm"
                      >
                        {child.label}
                      </button>
                    </li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
        </ul>
      </nav>
    </aside>

    <!-- Sağ İçerik (Kutu Tabanlı Panel) -->
    <main class="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#if selectedSection === 'dashboard'}
        <div class="bg-blue-500 text-white p-4 rounded shadow hover:bg-blue-600 transition">
          <HomeIcon class="h-8 w-8 mb-2" />
          <h2 class="text-lg font-semibold">Genel Bakış</h2>
          <p>Toplam Kullanıcı: {users.length}</p>
          <p>Toplam Gönderi: {posts.length}</p>
        </div>
      {:else if selectedSection === 'user-list'}
        <div class="bg-teal-500 text-white p-4 rounded shadow hover:bg-teal-600 transition">
          <UsersIcon class="h-8 w-8 mb-2" />
          <h2 class="text-lg font-semibold">Kullanıcı Listesi</h2>
          {#each users as user}
            <p>{user.username} ({user.role})</p>
            <button class="text-red-200">Engelle</button>
          {/each}
        </div>
      {:else if selectedSection === 'post-list'}
        <div class="bg-orange-500 text-white p-4 rounded shadow hover:bg-orange-600 transition">
          <DocumentTextIcon class="h-8 w-8 mb-2" />
          <h2 class="text-lg font-semibold">Gönderi Listesi</h2>
          {#each posts as post}
            <p>{post.content.substring(0, 50)}...</p>
            <button class="text-red-200">Sil</button>
          {/each}
        </div>
      {:else if selectedSection === 'category-list'}
        <div class="bg-purple-500 text-white p-4 rounded shadow hover:bg-purple-600 transition">
          <CollectionIcon class="h-8 w-8 mb-2" />
          <h2 class="text-lg font-semibold">Kategori Listesi</h2>
          {#each categories as category}
            <p>{category.name}</p>
            <button class="text-red-200">Sil</button>
          {/each}
        </div>
      {:else if selectedSection === 'category-add'}
        <div class="bg-green-500 text-white p-4 rounded shadow hover:bg-green-600 transition">
          <CollectionIcon class="h-8 w-8 mb-2" />
          <h2 class="text-lg font-semibold">Yeni Kategori</h2>
          <form>
            <input type="text" placeholder="Kategori Adı" class="w-full p-2 mb-2 rounded" />
            <textarea placeholder="Açıklama" class="w-full p-2 mb-2 rounded"></textarea>
            <button type="submit" class="bg-white text-green-500 px-4 py-1 rounded">Ekle</button>
          </form>
        </div>
      {:else if selectedSection === 'announcement-list'}
        <div class="bg-yellow-500 text-white p-4 rounded shadow hover:bg-yellow-600 transition">
          <SpeakerphoneIcon class="h-8 w-8 mb-2" />
          <h2 class="text-lg font-semibold">Duyuru Listesi</h2>
          {#each announcements as ann}
            <p>{ann.content.substring(0, 50)}...</p>
            <button class="text-red-200">Sil</button>
          {/each}
        </div>
      {:else if selectedSection === 'announcement-add'}
        <div class="bg-red-500 text-white p-4 rounded shadow hover:bg-red-600 transition">
          <SpeakerphoneIcon class="h-8 w-8 mb-2" />
          <h2 class="text-lg font-semibold">Yeni Duyuru</h2>
          <form>
            <textarea placeholder="Duyuru İçeriği" class="w-full p-2 mb-2 rounded"></textarea>
            <button type="submit" class="bg-white text-red-500 px-4 py-1 rounded">Ekle</button>
          </form>
        </div>
      {:else if selectedSection === 'faq'}
        <div class="bg-indigo-500 text-white p-4 rounded shadow hover:bg-indigo-600 transition">
          <QuestionMarkCircleIcon class="h-8 w-8 mb-2" />
          <h2 class="text-lg font-semibold">Sık Sorulan Sorular</h2>
          <p>Bu bölüm henüz geliştiriliyor...</p>
        </div>
      {/if}
    </main>
  </div>
</div>

<style>
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';
</style>
