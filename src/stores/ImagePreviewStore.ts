// src/stores/imagePreviewStore.ts
import { ref } from 'vue'

// Exportamos el estado y las funciones directamente
export const isVisible = ref<boolean>(false)
export const imageUrl = ref<string>('')

export const showPreview = (url: string) => {
  imageUrl.value = url
  isVisible.value = true
}

export const hidePreview = () => {
  isVisible.value = false
  imageUrl.value = ''
}

// Mantenemos el composable 'useImagePreview' para que los componentes lo usen fácilmente
export function useImagePreview() {
  return {
    isVisible,
    imageUrl,
    showPreview,
    hidePreview,
  }
}
