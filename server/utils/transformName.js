/**
 * Transforms the text passed to it to Capitalised first letter
 *  
 * @param {*} text - E.g - 'letter'
 * @returns {string} - E.g - 'Letter'
 */
module.exports = function transformName (text) {
  const string = text.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
};