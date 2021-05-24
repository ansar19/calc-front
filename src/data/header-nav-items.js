export default function () {
  return [{
    title: 'Главная панель',
    items: [{
      title: 'Панель',
      to: '/dashboard',
      htmlBefore: '<i class="material-icons">&#xE917;</i>',
      htmlAfter: '',
    }],
  }, {
    title: 'Компания',
    items: [{
      title: 'Список компании',
      to: '/companies',
      htmlBefore: '<i class="material-icons">note_add</i>',
      htmlAfter: '',
    },
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
    },
    ],
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
      title: 'Пример расчета воздух',
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: {
        name: 'calc-example',
      },
    },
    {
      title: 'Парниковые газы пример',
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: {
        name: 'ghg-calc-example',
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
    }, {
      title: 'Выбросы по ЗВ',
      to: '/list-emissions-pollutants',
      htmlBefore: '<i class="material-icons">&#xE8D1;</i>',
      htmlAfter: '',
    }, {
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
    },
    ],
  },
  {
    title: 'xlscsv-parser',
    items: [{
      title: 'xlscsv-parser',
      htmlBefore: '<i class="material-icons">&#xE889;</i>',
      to: {
        name: 'xlscsv-parser',
      },
    }],
  },
  ];
}
