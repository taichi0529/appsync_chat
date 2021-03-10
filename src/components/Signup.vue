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
import { Auth } from 'aws-amplify'

@Component
export default class Signup extends Vue {
  protected email = ''
  protected password = ''
  async submit() {
    try {
      const { user } = await Auth.signUp({
        username: this.email,
        password: this.password,
        attributes: {
          email: this.email,
        },
      })
      alert('確認コードを送信しました')
      console.log(user)
    } catch (error) {
      alert('error')
      console.log(error)
    }
  }
}
</script>
<style scoped></style>
