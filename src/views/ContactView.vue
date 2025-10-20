<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import ContactInfoCard from '@/components/ContactInfoCard.vue'
// No se requiere lógica adicional para esta vista de contacto
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
            <svg
              class="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18.426 5.574c-1.801-1.802-4.24-2.822-6.81-2.822S6.607 3.772 4.806 5.574C3.004 7.375 2 9.814 2 12.388c0 2.152.61 4.22 1.745 6.014l-1.74 6.002 6.16-1.723a11.75 11.75 0 005.659 1.488h.005c5.562 0 10.11-4.548 10.11-10.11 0-2.574-1.005-5.013-2.809-6.814zM11.615 22.11c-1.817 0-3.58-.52-5.11-1.485l-.36-.214-3.803 1.06 1.075-3.724-.238-.376A9.911 9.911 0 014.004 12.39c0-4.54 3.703-8.243 8.243-8.243 2.21 0 4.28.86 5.82 2.408 1.54 1.54 2.4 3.61 2.4 5.821 0 4.54-3.703 8.243-8.243 8.243a9.88 9.88 0 01-4.609-1.242zM16.94 14.34c-.21-.105-1.255-.62-1.45-.69-.195-.07-.336-.105-.477.105-.14.21-.548.69-.672.825-.124.135-.248.15-.477.045-.229-.105-.96-.354-1.83-.891-.679-.42-.99-.81-1.114-.99-.124-.18-.013-.285.09-.39.104-.104.23-.248.344-.373s.15-.21.226-.348c.075-.135.037-.258-.019-.363-.056-.105-.477-1.14-.654-1.56-.176-.42-.353-.363-.477-.363h-.405c-.14 0-.378.056-.573.284-.195.228-.75.735-.75 1.792s.768 2.085.873 2.22c.105.135 1.504 2.37 3.646 3.21.52.207.93.33 1.256.423.504.137.96.12 1.325.076.42-.056 1.255-.514 1.432-.99.176-.477.176-.885.124-.99-.052-.105-.14-.165-.291-.27z"
                clip-rule="evenodd"
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
      </div>
    </main>
  </div>
</template>
