
<script>

import { sayHi, returnHi } from "./library";

sayHi();

export default {
  data(){
    return {
      hi: returnHi()
    }
  }
}
</script>

<template>
  <div>
    Hello {{ hi }}
  </div>
</template>