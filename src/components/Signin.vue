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
import { Auth } from 'aws-amplify'

@Component
export default class Signin extends Vue {
  protected email = ''
  protected password = ''
  async submit() {
    try {
      const currentUser = await Auth.signIn(this.email, this.password)
      this.$store.commit('login', { currentUser })
      alert('SignInしました')
    } catch (error) {
      alert('error')
      console.log(error)
    }
  }
}
</script>
<style scoped></style>
