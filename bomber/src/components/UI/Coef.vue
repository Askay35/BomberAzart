<template>
  <div class="bet" :class="{medium:coef>=2.00 && coef < 10.00, big:coef>=10.00}">{{coef.toFixed(2)}}x</div>
</template>

<script>
export default {
    props:{
        coef:{
            required:true
        }
    },  
};
</script>
