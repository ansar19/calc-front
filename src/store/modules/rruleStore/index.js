/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
// import releaseSourceService from '@/services/releaseSourceService';

const initialState = () => ({
  repeatIntervalType: null,
  repeatIntervalValue: 1,
  repeatIntervalText: null,
  repeatIntervalPanel: null,
  rruleWeeklyPanel: null,
  rruleWeeklyButtons: null,
  rruleMonthlyPanel: null,
  rruleMonthlyDateMonthDay: null,
  rruleMonthlyDayMonthDayPos: null,
  rruleMonthlyDayMonthDays: null,
  rruleYearlyPanel: null,
  rruleYearlyDateMonth: null,
  rruleYearlyDateMonthDay: null,
  rruleYearlyDayMonthDays: null,
  rruleYearlyDayMonthDayPos: null,
  rruleYearlyDayMonth: null,
  rruleEndAction: null,
  rruleEndSessionsCount: null,
  rruleEndDate: null,
  rruleEndSessionPanel: null,
  rruleEndDatePanel: null,
  rruleResult: null,

  repeatTypes: [
    {
      type: 'daily',
      unit: 'day',
      label: 'Ежедневно',
    },
    {
      type: 'weekly',
      unit: 'week',
      label: 'Еженедельно',
    },
    {
      type: 'monthly',
      unit: 'month',
      label: 'Ежемесячно',
    },
    {
      type: 'yearly',
      unit: 'year',
      label: 'Ежегодно',
    },
    {
      type: 'hourly',
      unit: 'hour',
      label: 'Каждый час',
    },

  ],
  activeRepeatType: {
    type: 'daily',
    unit: 'day',
    label: 'Ежедневно',
  },
});

const getters = {
};

const actions = {
};

const mutations = {
  setRepeatType(state, repeatType) {
    state.activeRepeatType = repeatType;
  },

  setRruleResult(state, rruleResult) {
    state.rruleResult = rruleResult;
  },
};

const state = {
  ...initialState(),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
