<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import CallToAction from '../components/CallToAction.vue'
import FeatureSection from '../components/FeatureSection.vue'
</script>

<template>
  <div>
    <Navbar />
    <main>
      <section class="bg-white py-20">
        <div class="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/images/founder.png"
              alt="Fundador de Laberintos Praderas"
              class="rounded-lg shadow-2xl w-full"
            />
          </div>
          <div class="prose prose-lg max-w-none">
            <h1>Nuestra Historia</h1>
            <p>
              <strong>Laberintos Praderas</strong>, fundada por
              <strong>Mario Alberto Gallegos Gamboa</strong>, nació de la pasión por crear espacios
              de juego seguros, duraderos y, sobre todo, increíblemente divertidos para los niños.
            </p>
            <p>
              Con <strong>10 años de experiencia</strong> en el sector, hemos perfeccionado el arte
              de construir áreas de juego que no solo cumplen con los más altos estándares de
              seguridad, sino que también encienden la imaginación de los más pequeños.
            </p>
          </div>
        </div>
      </section>

      <section class="bg-gray-50 py-20">
        <div class="container mx-auto px-6">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-800">Nuestros Pilares</h2>
          </div>
          <div class="space-y-16">
            <FeatureSection
              title="Seguridad Ante Todo"
              description="Cada tubo, cada red y cada tornillo se instala pensando en la seguridad de los niños."
              imageUrl="/images/seguridad.png"
              :imageOnLeft="true"
            />
            <FeatureSection
              title="Calidad y Durabilidad"
              description="Usamos solo los mejores materiales para garantizar que nuestros proyectos resistan el paso del tiempo y el juego más enérgico."
              imageUrl="/images/calidad.png"
              :imageOnLeft="false"
            />
            <FeatureSection
              title="Diversión Garantizada"
              description="Creemos que el juego es esencial para el desarrollo. Nuestro objetivo es crear el espacio más divertido posible."
              imageUrl="/images/niños.png"
              :imageOnLeft="true"
            />
          </div>
        </div>
      </section>

      <CallToAction />
    </main>
  </div>
</template>
