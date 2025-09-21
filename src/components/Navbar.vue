<script setup lang="ts">
import { ref, defineOptions } from 'vue'
defineOptions({ name: 'AppNavbar' })
const isOpen = ref(false)
</script>

<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="container mx-auto px-6 py-3">
      <div class="flex justify-between items-center">
        <a href="/">
          <img src="/images/logo.png" alt="Logo Laberintos Praderas" class="h-12 w-auto" />
        </a>

        <div class="hidden md:flex items-center space-x-6">
          <a href="/servicios" class="text-gray-700 hover:text-primary font-medium">Servicios</a>
          <a href="/portafolio" class="text-gray-700 hover:text-primary font-medium">Portafolio</a>
          <a href="/sobre-nosotros" class="text-gray-700 hover:text-primary font-medium"
            >Sobre nosotros</a
          >
          <a href="/contacto" class="text-gray-700 hover:text-primary font-medium">Contacto</a>
          <a
            href="https://app.laberintospraderas.com"
            target="_blank"
            class="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
            >Admin Panel</a
          >
        </div>

        <div class="md:hidden">
          <button @click="isOpen = !isOpen" class="text-gray-700 focus:outline-none">
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

      <div v-if="isOpen" class="md:hidden mt-4">
        <a href="/servicios" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
          >Servicios</a
        >
        <a href="/portafolio" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
          >Portafolio</a
        >
        <a href="/sobre-nosotros" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
          >Sobre nosotros</a
        >
        <a href="/contacto" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
          >Contacto</a
        >
        <a
          href="https://app.laberintospraderas.com"
          target="_blank"
          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
          >Admin Panel</a
        >
      </div>
    </div>
  </nav>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="container mx-auto px-6 py-3">
      <div class="flex justify-between items-center"></div>
    </div>
  </nav>
</template>
