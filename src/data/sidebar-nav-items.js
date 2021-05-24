export default function () {
  return [{
    title: 'Главная панель',
    items: [{
      title: 'Панель',
      to: '/dashboard',
      htmlBefore: '<i class="material-icons">&#xE917;</i>',
      htmlAfter: '',
    },
    ],
  }, {
    title: 'Компания',
    items: [{
      title: 'Список компании',
      to: '/companies',
      htmlBefore: '<i class="material-icons">note_add</i>',
      htmlAfter: '',
    },
    // ,
    // {
    //   title: 'Добавить компанию',
    //   htmlBefore: '<i class="material-icons">note_add</i>',
    //   to: {
    //     name: 'new-company',
    //   },
    // },
    // , {
    //   title: 'Первый руководитель',
    //   htmlBefore: '<i class="material-icons">&#xE889;</i>',
    //   to: {
    //     name: 'new-company-head',
    //   },
    // }, {
    //   title: 'Банковские детали',
    //   htmlBefore: '<i class="material-icons">&#xE889;</i>',
    //   to: {
    //     name: 'new-bank-details',
    //   },
    // }, {
    //   title: 'Адреса компании',
    //   htmlBefore: '<i class="material-icons">error</i>',
    //   to: {
    //     name: 'new-company-address',
    //   },
    // }
    ],
  }, {
    title: 'Источники',
    items: [{
      title: 'Список источников',
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: {
        name: 'release-source-list',
      },
    },
    {
      title: 'Добавить координаты',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: {
        name: 'emission-source-coordinates',
      },
    }],
  }, {
    title: 'Расчеты',
    items: [{
      title: 'Список расчетов',
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: {
        name: 'calculations',
      },
    },
    {
      title: 'Список источников парниковых газов',
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: {
        name: 'ghg-calc-list',
      },
    },
    ],
  },
  {
    title: 'Сотрудники',
    items: [{
      title: 'Список сотрудников',
      to: '/users',
      htmlBefore: '<i class="material-icons">note_add</i>',
      htmlAfter: '',
    }],
  },
  {
    title: 'Задачи',
    items: [{
      title: 'Список задач',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: {
        name: 'list-tasks',
      },
    }],
  },
  {
    title: 'Отчеты',
    items: [{
      title: 'Выбросы по источникам',
      to: '/list-emissions',
      htmlBefore: '<i class="material-icons">&#xE8D1;</i>',
      htmlAfter: '',
    },
    // {
    //   title: 'Выбросы по ЗВ',
    //   to: '/list-emissions-pollutants',
    //   htmlBefore: '<i class="material-icons">&#xE8D1;</i>',
    //   htmlAfter: '',
    // },
    {
      title: 'Эмиссий ЗВ в атмосферный воздух',
      to: '/pollutant-release-register',
      htmlBefore: '<i class="material-icons">&#xE889;</i>',
      htmlAfter: '',
    },
    {
      title: 'Сумма платежей',
      to: '/emission-payments',
      htmlBefore: '<i class="material-icons">&#xE8D1;</i>',
      htmlAfter: '',
    },
    {
      title: 'Отчеты налоговые',
      to: '/list-tax',
      htmlBefore: '<i class="material-icons">&#xE8D1;</i>',
      htmlAfter: '',
    }, {
      title: 'Отчеты статистические',
      to: '/list-statistical',
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: '',
    }, {
      title: 'Список лимитов',
      to: '/list-limit',
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: '',
    }, {
      title: 'Сводная таблица',
      to: '/pivot-report',
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: '',
    }],
  },
  // {
  //   title: 'Регистр выбросов и переноса загрязнителей',
  //   items: [{
  //     title: 'Объему фактических эмиссий ЗВ в атмосферный воздух',
  //     htmlBefore: '<i class="material-icons">&#xE889;</i>',
  //     to: {
  //       name: 'pollutant-release-register',
  //     },
  //   },
  //   ],
  // },
  ];
}
