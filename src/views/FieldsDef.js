export default i18n => [
  {
    name: 'user',
    title: () => i18n.t('user'),
    width: '20%',
  },
  {
    name: 'email',
    title: () => i18n.t('email'),
    width: '20%',
  },
  {
    name: 'birthdate',
    title: () => i18n.t('birthdate'),
    titleClass: 'center aligned',
    dataClass: 'center aligned',
  },
  {
    name: 'nickname',
    title: () => i18n.t('nickname'),
  },
  {
    name: 'status',
    title: () => i18n.t('status'),
  },
  {
    name: 'gender',
    title: () => i18n.t('gender'),
  },
  {
    name: 'salary',
    title: () => i18n.t('salary'),
    titleClass: 'center aligned',
    dataClass: 'right aligned',
  },
];

