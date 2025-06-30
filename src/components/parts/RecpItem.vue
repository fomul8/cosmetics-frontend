<script setup>

</script>

<template>
<div class="r-item-card">
  <div class="r-item-card__plus-btn">
    <i class="pi pi-plus"></i>
  </div>
  <div><b>Label name</b></div>
  <div style="text-align: center"><i class="pi pi-box" style="font-size: 2.4rem"></i></div>
  <div><i>Moisturising creame</i></div>
</div>
</template>

<style scoped>
.r-item-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 6px;
  padding: 20px;

  box-shadow: 0px -2px 22px 0px rgba(255,255,255,0.75) inset;

  backdrop-filter: blur(8px) saturate(186%);
  -webkit-backdrop-filter: blur(8px) saturate(186%);
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(209, 213, 219, 0.3);
}

.r-item-card__plus-btn {
  position: absolute;
  top:0;
  right: 0;
  border-bottom-left-radius: 80%;
  border-top-right-radius: 6px;
  background-color: #daabe7;
  width: auto;
  padding: 8px 10px 8px 12px;
  color: white;
  font-weight: bold;
}
</style>
