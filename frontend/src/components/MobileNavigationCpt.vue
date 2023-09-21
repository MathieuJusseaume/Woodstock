<template>
  <nav class="mobilenavigation__nav">
    <router-link class="mobilenavigation__nav__link__clients" to="/clients">
      <img class="mobilenavigation__nav__link__clients__img" src="" alt="" />
    </router-link>

    <button class="mobilenavigation__nav__button__clients-new">
      <img class="mobilenavigation__nav__button__clients__img-new" src="" alt="" />
    </button>

    <router-link class="mobilenavigation__nav__link__commands" to="/commandes">
      <img class="mobilenavigation__nav__link__commands__img" src="" alt=""/>
    </router-link>

    <button class="mobilenavigation__nav__button__commands-new">
      <img class="mobilenavigation__nav__button__commands-new" src="" alt=""/>
    </button>
  </nav>
</template>

<script>
export default {
  name: "MobileNavigationCpt",
  data() {
    return {};
  },
  methods: {},
};
</script>