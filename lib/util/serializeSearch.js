const dateToIso = date => date && date.toISOString();
const addIf = (cond, elem) => (cond ? elem : {});

module.exports = {
  serialize: params => ({
    ...params,
    ...addIf(params.start_date !== undefined, { start_date: dateToIso(params.start_date) }),
    ...addIf(params.end_date !== undefined, { end_date: dateToIso(params.end_date) }),
    ...addIf(params.genre_exclude !== undefined, { genre_exclude: params.genre_exclude ? 1 : 0 }),
  }),
};
