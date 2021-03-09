<template>
  <div class="signin">
    <h2>SignIn</h2>
    <label>
      <input type="text" placeholder="email" v-model="email" />
    </label>
    <label>
      <input type="password" placeholder="password" v-model="password" />
    </label>
    <button @click.prevent="submit">SignIn</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Signin extends Vue {
  protected email = ''
  protected password = ''
  submit() {
    alert(this.email)
  }
}
</script>
<style scoped></style>
