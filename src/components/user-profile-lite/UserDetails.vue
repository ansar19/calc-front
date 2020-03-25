<template>
  <d-card class="card-small user-details mb-4">
    <!-- Card Header -->
    <d-card-header class="p-0"></d-card-header>

    <d-card-body class="p-0">
      <!-- User Avatar -->
      <div class="user-details__avatar mx-auto"></div>

      <!-- User Name -->
      <h4 class="text-center m-0 mt-2">{{ userData.name }}</h4>

      <!-- User Position -->
      <p class="text-center text-light m-0 mb-2">{{ userData.position }}</p>

      <!-- User Bio -->
      <p class="text-center text-light m-0 mb-2">{{ userData.bio }}</p>

      <!-- User Data -->
      <div class="user-details border-top border-bottom p-4">
        <div class="row mb-3">
          <div class="col w-50">
            <span>Email:</span>
            <span>{{ userData.email }}</span>
          </div>
          <div class="col w-50">
            <span>Адрес:</span>
            <span>{{ userData.location }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col w-50">
            <span>Телефон:</span>
            <span>{{ userData.phone }}</span>
          </div>
          <div class="col w-50">
            <span>Account Number:</span>
            <span>{{ userData.accNumber }}</span>
          </div>
        </div>
      </div>
    </d-card-body>
  </d-card>
</template>

<script>
const defaultUserData = {
  /* coverImg: require('@/assets/images/content-management/2.jpeg'), */
  avatarImg: require('@/assets/images/avatars/0.jpg'),
  name: 'Екатерина Васильева',
  position: 'Старший эколог',
  bio: 'Закончила КазГУ им. Аль-Фараби, географ - эколог',
  email: 'ekatya2015@mail.ru',
  location: 'ул. Радужная, д. 28',
  phone: '+7702 234 567 80',
  accNumber: '123456789',
};

export default {
  name: 'user-details',
  props: {
    /**
     * The user data.
     */
    userData: {
      type: Object,
      default() {
        return defaultUserData;
      },
    },
  },
};
</script>
