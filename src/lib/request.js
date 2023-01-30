import { includes } from 'lodash';

/**
 * @private
 * @function request
 * @description Make a request to the server and return a promise.
 * @param {string} url
 * @param {object} options
 * @returns {promise}
 */

const textResponses = [202, 204, 401];

export default function request(url, options) {
  return new Promise((resolve, reject) => {
    if (!url) reject(new Error('URL parameter required'));
    if (!options) reject(new Error('Options parameter required'));

    fetch(url, options)
      .then(async (response) => {
        if (!response.ok) {
          return reject(await response);
        } else {
          return response;
        }
      })
      .then(response => response[includes(textResponses, response.status) ? 'text' : 'json']())
      .then(response => {
        if (response && response.status === 500) reject(response);
        else resolve(response);
      })
      .catch(err => reject(err));
  });
}
