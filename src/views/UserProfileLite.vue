<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Данные пользователя</span>
        <h3 class="page-title">Профиль пользователя</h3>
      </d-col>
    </d-row>

    <!-- Content -->
    <d-row>
      <d-col lg="6">
        <upl-user-details/>
      </d-col>
      <d-col lg="6">
        <upl-user-account-details/>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import UserDetails from '@/components/user-profile-lite/UserDetails.vue';
import UserAccountDetails from '@/components/user-profile-lite/UserAccountDetails.vue';

export default {
  name: 'user-profile-lite',
  components: {
    uplUserDetails: UserDetails,
    uplUserAccountDetails: UserAccountDetails,
  },
};
</script>

