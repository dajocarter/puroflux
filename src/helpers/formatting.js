/**
 * Formats a phone number
 * @param {string} phoneNumber - The phone number to format
 * @param {'back' | 'front'} [formatType=back] - Whether to format the phone number for a backend vs frontend
 * @returns {string} The formatted phone number
 */
export const formatPhoneNumber = (phoneNumber, formatType = 'back') => {
  // Replace any non-number with an empty string and trim
  const numbersOnly = phoneNumber.replace(/\D/g, '').trim()
  // Group string of numbers into telephone parts
  const grouped = numbersOnly.match(/^(\d{3})(\d{3})(\d{4})$/)
  let formatted
  switch (formatType) {
    case 'front':
      formatted = `(${grouped[1]}) ${grouped[2]}-${grouped[3]}`
      break
    case 'back':
    default:
      formatted = `${grouped[1]}-${grouped[2]}-${grouped[3]}`
      break
  }
  return formatted
}
