

export const SET_TITLE_FILTER = 'SET_TITLE_FILTER';
export const SET_YEAR_FILTER = 'SET_YEAR_FILTER';
export const SET_TYPE_FILTER = 'SET_TYPE_FILTER';

export const setTitleFilter = (title: string) => ({
  type: SET_TITLE_FILTER,
  payload: title,
});

export const setYearFilter = (year: string) => ({
  type: SET_YEAR_FILTER,
  payload: year,
});

export const setTypeFilter = (typeFilter: string) => ({
  type: SET_TYPE_FILTER,
  payload: typeFilter,
});