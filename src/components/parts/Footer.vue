<script setup>

</script>

<template>
  <div class="footer-container">
    <img class="footer-icon" src="../../assets/ny-2-footer.png" >
    <div class="footer-text-v2">
      <span>Contacts  </span>
      <span>Agreement  </span>
      <span>Legal Info  </span>
    </div>
  </div>
</template>

<style scoped>
.footer-container {
  width: 100%;
  position: relative;
}

.footer-icon {
  width: 100%;
}

.road-footer {
  position: absolute;
  z-index: 2;
  width: 100%;
  min-height: 250px;
  background-image: url("/src/assets/road-perespective-mob.png");
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
}

.footer-text-v2 {
  display: flex;
  gap: 20px;
  text-transform: uppercase;
  font-weight: bold;

  position: absolute;
  top: 60%;

  backdrop-filter: blur(8px) saturate(186%);
  -webkit-backdrop-filter: blur(8px) saturate(186%);
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(209, 213, 219, 0.3);

  padding: 10px 20px;
  border-radius: 8px;
}

.road-text {
  display: flex;
  gap: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #e6b800; /* Желтый под дорожную разметку */
  text-transform: uppercase;

  /* Перспектива и наклон */
  transform: perspective(400px) rotateX(55deg);
  transform-origin: bottom center;

  /* Тень для объема */
  text-shadow: 2px 2px 4px rgba(255,255,255,0.8);
}
</style>
