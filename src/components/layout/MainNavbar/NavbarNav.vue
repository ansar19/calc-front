<template>
  <d-navbar-nav class="border-left flex-row">
    <!-- <li class="nav-item border-right dropdown notifications">
      <a class="nav-link nav-link-icon text-center" v-d-toggle.notifications>
        <div class="nav-link-icon__wrapper">
          <i class="material-icons">&#xE7F4;</i>
          <d-badge pill theme="danger">2</d-badge>
        </div>
      </a>
      <d-collapse id="notifications" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item>
          <div class="notification__icon-wrapper">
            <div class="notification__icon">
              <i class="material-icons">&#xE6E1;</i>
            </div>
          </div>
          <div class="notification__content">
            <span class="notification__category">Analytics</span>
            <p>Your website’s active users count increased by <span class="text-success text-semibold">28%</span> in the last week. Great job!</p>
          </div>
        </d-dropdown-item>
        <d-dropdown-item href="#">
          <div class="notification__icon-wrapper">
            <div class="notification__icon">
              <i class="material-icons">&#xE8D1;</i>
            </div>
          </div>
          <div class="notification__content">
            <span class="notification__category">Sales</span>
            <p>Last week your store’s sales count decreased by <span class="text-danger text-semibold">5.52%</span>. It could have been worse!</p>
          </div>
        </d-dropdown-item>
        <d-dropdown-item class="notification__all text-center">View all Notifications</d-dropdown-item>
      </d-collapse>
    </li>-->
    <template v-if="user">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle text-nowrap px-3"
          v-d-toggle.user-actions
        >
          <img
            width="40"
            class="user-avatar rounded-circle mr-2"
            src="@/assets/images/avatars/avatar.svg"
            alt="User Avatar"
          />
          <!-- <span v-if="user.employee" class="d-none d-md-inline-block">{{ user.employee.first_name }} {{ user.employee.last_name }}</span> -->
          <span class="d-none d-md-inline-block">{{ user.email }}</span>
        </a>
        <d-collapse id="user-actions" class="dropdown-menu dropdown-menu-small">
          <d-dropdown-item>
            <i class="material-icons">&#xe853;</i>
            <span class="d-none d-md-inline-block">{{ user.role }}</span
            ><br />
          </d-dropdown-item>
          <d-dropdown-item>
            <i class="material-icons">&#xE7FD;</i>
            <router-link to="user-profile-lite">Профиль</router-link>
          </d-dropdown-item>
          <d-dropdown-item>
            <i class="material-icons">&#xE8B8;</i> Редактировать
          </d-dropdown-item>
          <d-dropdown-divider />
          <!-- <d-dropdown-item class="text-danger" >
          <a href="#" @click.prevent="signOut"> Выйти</a>
        </d-dropdown-item> -->
          <d-dropdown-item class="text-danger">
            <span @click="exit">
              <i class="material-icons text-danger">&#xE879;</i>Выйти
            </span>
          </d-dropdown-item>
        </d-collapse>
      </li>
    </template>
    <template v-else>
      no user
    </template>
  </d-navbar-nav>
</template>

<style>
.nav-link:hover {
  cursor: pointer;
}
</style>
<script>
import { logout } from "@/services/auth";

export default {
  name: "NavbarNav",
  data: {
    user: {},
  },
  methods: {
    async exit() {
      await logout();
      this.$router.push("/login");
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
};
</script>
