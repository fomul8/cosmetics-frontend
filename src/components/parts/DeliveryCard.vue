<script setup>
import {defineProps} from "vue";

const {company, active} = defineProps(['company', 'active'])
</script>

<template>
<div :class="`delivery-company-card logo-${company} ${active ? 'delivery-company-card--active' : ''}`">
  <div class="active-mark">
    <i class="pi pi-check"></i>
  </div>
</div>
</template>

<style scoped>
.delivery-company-card {
  border-radius: 6px;
  box-shadow: 0 1px 21px 0 rgba(0,0,0,0.1);
  height: 80px;
  width: 80px;
  position: relative;
}

.logo-ups {
  background: url("/delivery-logo/ups.svg");
  background-size: 80px 80px;
}
.logo-dhl {
  background: url("/delivery-logo/dhl.svg");
  background-size: 80px 80px;
}
.logo-us-post {
  background: url("/delivery-logo/us-post.svg");
  background-size: 80px 80px;
}
.logo-us-space-force {
  background: url("/delivery-logo/us-space-force.svg");
  background-size: 80px 80px;
}

.delivery-company-card--active .active-mark {
  display: block;
}

.active-mark {
  display: none;
  position: absolute;
  top:0;
  right: 0;
  border-bottom-left-radius: 80%;
  border-top-right-radius: 6px;
  background-color: #71ce8f;
  width: auto;
  padding: 8px 10px 8px 12px;
  color: white;
  font-weight: bold;
}
</style>
