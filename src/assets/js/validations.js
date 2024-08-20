//Check texts format  
export function checkText(data) {
  return /^[\sa-zA-ZñÑáéíóúÁÉÍÓÚ0-9]+$/.test(data);
}
