<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import ServiceCard from '@/components/ServiceCard.vue' // <-- 1. IMPORTAR

// 2. Definimos nuestros servicios en un array. En un futuro, esto podría venir de una API.
const services = [
  {
    title: 'Zonas para Bebés y Estimulación Temprana',
    description:
      'Creamos espacios seguros, higiénicos y estimulantes diseñados específicamente para los más pequeños.',
    imageUrl: '/images/AreaDeBebes.jpeg',
    features: [
      'Suelos y paredes acolchados para máxima seguridad.',
      'Figuras de fomi, albercas de pelotas y juegos de baja altura.',
      'Materiales hipoalergénicos, no tóxicos y fáciles de limpiar.',
      'Diseños que promueven la exploración y el aprendizaje temprano.',
    ],
  },
  {
    title: 'Diseño, Fabricación y Mantenimiento',
    description:
      'Transforma tu visión en una realidad duradera. Trabajamos contigo desde el diseño conceptual hasta la instalación.',
    imageUrl: '/images/Laberinto.png',
    features: [
      'Diseños 100% personalizados y asesoría en distribución de espacio.',
      'Materiales de alta resistencia, no tóxicos y de uso rudo.',
      'Planes de mantenimiento preventivo para alargar la vida útil del juego.',
      'Reparación y sustitución de redes, protectores y piezas desgastadas.',
    ],
  },
  {
    title: 'Construcción de Canchas Deportivas',
    description:
      'Expandimos la diversión con la construcción de canchas deportivas, especializándonos en fútbol rápido.',
    imageUrl: '/images/Cancha.jpeg',
    features: [
      'Instalación de pasto sintético de alta durabilidad.',
      'Estructuras perimetrales y porterías a la medida.',
      'Mallas de protección superiores y laterales para un juego seguro.',
      'Soluciones adaptables a cualquier espacio interior o exterior.',
    ],
  },
  {
    title: 'Áreas de Trampolines',
    description:
      'Impulsa la energía de tu negocio con nuestras áreas de camas de salto, diseñadas para máxima diversión y seguridad.',
    imageUrl: '/images/trampolin.jpeg',
    features: [
      'Estructuras de PTR soldado de alta resistencia.',
      'Diseños personalizados: camas planas, inclinadas e interconectadas.',
      'Colchonetas de alto impacto y mallas de seguridad perimetrales.',
      'Soluciones perfectas para maximizar el espacio y la rentabilidad.',
    ],
  },
]
</script>

<template>
  <div>
    <Navbar />
    <main class="bg-white">
      <section class="py-16">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ServiceCard
              v-for="service in services"
              :key="service.title"
              :title="service.title"
              :description="service.description"
              :imageUrl="service.imageUrl"
              :features="service.features"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
