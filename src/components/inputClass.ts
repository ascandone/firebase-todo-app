export const inputClass = (error: boolean) => ({
  'rounded-md w-full px-4 py-2 leading-none text-gray-900 outline-none resize-none':
    true,
  'bg-gray-200 bg-opacity-80': !error,
  'bg-red-100': error,
  'hover:bg-transparent hover:ring ring-pink-200': true,
  'transition-all duration-150': true,
  'border border-transparent focus:border-pink-300 focus:ring focus:bg-transparent':
    true,
  'disabled:opacity-60 disabled:border-transparent disabled:pointer-default disabled:bg-gray-100 disabled:hover:ring-transparent':
    true,
})
