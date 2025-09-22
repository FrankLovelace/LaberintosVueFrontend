// src/stores/imagePreviewStore.ts
import { ref } from 'vue'

const isVisible = ref<boolean>(false)
const imageUrl = ref<string>('')

export function useImagePreview() {
  const showPreview = (url: string) => {
    imageUrl.value = url
    isVisible.value = true
  }

  const hidePreview = () => {
    isVisible.value = false
    imageUrl.value = ''
  }

  return {
    isVisible,
    imageUrl,
    showPreview,
    hidePreview,
  }
}
