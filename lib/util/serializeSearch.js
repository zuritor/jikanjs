/**
 * Date to iso8601
 * @param {Date} date - Date to ISO8601 string
 */
const dateToIso = date => date && date.toISOString();

/**
 * Returns element if set else an empty object
 * @param {boolean} cond
 * @param {object} elem
 */
const addIf = (cond, elem) => (cond ? elem : {});

module.exports = {
  /**
   * Transforms the parameters
   */
  serialize: params => ({
    ...params,
    ...addIf(params.start_date !== undefined, { start_date: dateToIso(params.start_date) }),
    ...addIf(params.end_date !== undefined, { end_date: dateToIso(params.end_date) }),
    ...addIf(params.genre_exclude !== undefined, { genre_exclude: params.genre_exclude ? 1 : 0 }),
  }),
};
