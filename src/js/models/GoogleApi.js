// Unauthorized API request to by books
// Returns list of books that matches query
// GET
// HOWTO: https://developers.google.com/books/docs/v1/using

/**
 * GET - unauthirized
 * https://www.googleapis.com/books/v1/volumes?q=top+sellers+2019
 * returns an JSON with an array of 10(default number) books.
 */
/**
 * GET - unauthorized
 * https://www.googleapis.com/books/v1/volumes/${volumeId}
 * returns JSON with a single book.
 */
export const VOLUMES = "https://www.googleapis.com/books/v1/volumes";


/**
 * Do not need to use this as VOLUME will return 5 options of thumbnails
 * of different size.
 */
export const FRONTCOVER = "https://books.google.com/books/content/images/frontcover/";