<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import ContactInfoCard from '@/components/ContactInfoCard.vue'

// Estado para el formulario de contacto
const form = ref({
  name: '',
  email: '',
  message: '',
})

const handleSubmit = () => {
  // Por ahora, solo mostraremos los datos en la consola.
  // Para enviar un email real, se necesita un servicio de backend o de terceros.
  alert('Formulario enviado (revisar consola para ver los datos)')
  console.log('Datos del formulario:', form.value)
}
</script>

<template>
  <div>
    <Navbar />
    <main class="bg-gray-50">
      <div class="text-center py-16">
        <h1 class="text-4xl md:text-5xl font-extrabold text-primary">Ponte en Contacto</h1>
        <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          ¿Tienes una idea o un proyecto en mente? Nos encantaría escucharte.
        </p>
      </div>

      <div class="container mx-auto px-6 pb-20 grid lg:grid-cols-2 gap-16">
        <div class="space-y-8">
          <ContactInfoCard
            title="Correo Electrónico"
            detail="mario.a.gallegos@hotmail.com"
            link="mailto:mario.a.gallegos@hotmail.com"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </ContactInfoCard>

          <ContactInfoCard
            title="WhatsApp"
            detail="+52 81 2864 8379"
            link="https://wa.me/528128648379"
          >
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.456l-6.167 1.679zm6.247-3.907c1.465.894 3.16.e3 4.895.e3 5.421 0 9.811-4.391 9.811-9.811 0-5.42-4.39-9.81-9.811-9.81-5.42 0-9.81 4.39-9.81 9.81 0 1.838.515 3.597 1.45 5.103l-1.002 3.659 3.738-1.001zm11.319-6.443c-.273-.136-1.618-.798-1.869-.887-.251-.088-.434-.136-.617.136-.183.272-.705.887-.866 1.064-.161.177-.323.199-.595.063-.273-.136-1.149-.424-2.189-1.353-.811-.73-1.354-1.635-1.516-1.907-.161-.272 0-.424.12-.55.106-.107.243-.273.364-.409.121-.136.161-.225.242-.378.081-.152.041-.282-.015-.418-.056-.136-.617-1.475-.845-2.015-.227-.54-.456-.467-.617-.476-.161-.009-.344-.009-.527-.009-.183 0-.465.063-.706.335-.242.272-.937.913-.937 2.223s.962 2.578 1.099 2.754c.138.177 1.874 2.873 4.54 3.98.601.258 1.08.413 1.445.529.47.152.871.127 1.206.077.378-.055 1.149-.467 1.311-.913.161-.447.161-.828.112-.913-.05-.088-.183-.136-.273-.225z"
              />
            </svg>
          </ContactInfoCard>

          <ContactInfoCard
            title="Facebook"
            detail="@LaberintosPraderas"
            link="https://www.facebook.com/people/Laberintos-Praderas/100057533864298/"
          >
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
              />
            </svg>
          </ContactInfoCard>
        </div>

        <div class="bg-white p-8 rounded-lg shadow-lg">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Envíanos un Mensaje</h2>
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label for="name" class="block text-gray-700 font-bold mb-2">Nombre</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 font-bold mb-2"
                >Correo Electrónico</label
              >
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div class="mb-6">
              <label for="message" class="block text-gray-700 font-bold mb-2">Mensaje</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full bg-accent text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-500 transition-colors"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>

      <div class="text-center py-8">
        <p class="text-sm text-gray-500">
          Para contactar al desarrollador:
          <a href="mailto:francisco.a.gallegosv@gmail.com" class="text-primary hover:underline"
            >francisco.a.gallegosv@gmail.com</a
          >
        </p>
      </div>
    </main>
  </div>
</template>
