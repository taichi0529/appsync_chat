<template>
  <div class="signup">
    <h2>SignUp</h2>
    <label>
      <input type="text" placeholder="email" v-model="email" />
    </label>
    <label>
      <input type="password" placeholder="password" v-model="password" />
    </label>
    <button @click.prevent="submit">SignUp</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Signup extends Vue {
  protected email = ''
  protected password = ''
  submit() {
    alert(this.email)
  }
}
</script>
<style scoped></style>
