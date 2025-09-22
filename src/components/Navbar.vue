<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

defineOptions({
  name: 'AppNavbar',
})

const isMobileMenuOpen = ref<boolean>(false)
</script>

<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="container mx-auto px-6">
      <div class="flex justify-between items-center py-3">
        <RouterLink to="/">
          <img src="/images/logo.png" alt="Logo Laberintos Praderas" class="h-16 w-auto" />
        </RouterLink>

        <div>
          <div class="hidden md:flex items-center gap-x-8">
            <div class="flex items-center gap-x-6">
              <RouterLink to="/servicios" class="text-gray-700 hover:text-primary font-medium"
                >Servicios</RouterLink
              >
              <RouterLink to="/portafolio" class="text-gray-700 hover:text-primary font-medium"
                >Portafolio</RouterLink
              >
              <RouterLink to="/sobre-nosotros" class="text-gray-700 hover:text-primary font-medium"
                >Sobre nosotros</RouterLink
              >
              <RouterLink to="/contacto" class="text-gray-700 hover:text-primary font-medium"
                >Contacto</RouterLink
              >
            </div>
            <a
              href="https://app.laberintospraderas.com"
              target="_blank"
              class="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
            >
              Admin Panel
            </a>
          </div>

          <div class="md:hidden">
            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="text-gray-700 focus:outline-none"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="isMobileMenuOpen" class="md:hidden pb-3">
        <RouterLink
          to="/servicios"
          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >Servicios</RouterLink
        >
        <RouterLink
          to="/portafolio"
          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >Portafolio</RouterLink
        >
        <RouterLink
          to="/sobre-nosotros"
          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >Sobre nosotros</RouterLink
        >
        <RouterLink
          to="/contacto"
          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >Contacto</RouterLink
        >
        <a
          href="https://app.laberintospraderas.com"
          target="_blank"
          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >Admin Panel</a
        >
      </div>
    </div>
  </nav>
</template>
