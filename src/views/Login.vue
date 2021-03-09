<template>
  <div class="login">
    <h1>Login</h1>
    <signup></signup>
    <signin></signin>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Signup from '@/components/Signup.vue'
import Signin from '@/components/Signin.vue'

@Component({
  components: { Signin, Signup },
})
export default class Login extends Vue {}
</script>
<style scoped></style>
