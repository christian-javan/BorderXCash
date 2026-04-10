export default defineEventHandler(async (event) => {
  const fxController = event.context.$fxController
  const currentRate = await fxController.getCurrentFX()

  if (!currentRate) {
    return { success: false, message: 'No current FX rate available' }
  }

  return { success: true, data: currentRate }
})