import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/'
    })
  ],
  attributify: true,
  shortcuts: {
    'btn': 'px-4 py-2 rounded-lg font-medium transition-all cursor-pointer',
    'btn-primary': 'btn bg-amber-600 text-white hover:bg-amber-700',
    'btn-secondary': 'btn bg-gray-100 text-gray-700 hover:bg-gray-200',
    'card': 'bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow',
    'input-base': 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent'
  }
})
