<script setup>
import Divider from 'primevue/divider';
import RadioButton from 'primevue/radiobutton';
import {ref} from "vue";

const selection = ref('1');
</script>

<template>

  <div class="row">
    <div class="col-12">
      <p>
        Any cosmetics contains water and oil, so it is necessary to use emulsifiers. Emulsifiers are necessary for combining water and oil-based ingredients. Natural emulsifiers, like beeswax and lecithin, are less likely to cause irritation than synthetic options.
      </p>
      <div class="flex-table">
        <div style="text-align: center">
          Modern,
          Premium,
          Emulsifiers
          <RadioButton v-model="selection" inputId="ingredient1" name="From plant based" value="1" />
        </div>
        <div class="section">
          From plant based
          <RadioButton v-model="selection" inputId="ingredient2" name="From plant based" value="2" />
        </div>
        <div class="section">
          I trust you to choose best option
          <RadioButton v-model="selection" inputId="ingredient3" name="From plant based" value="3" />
        </div>
      </div>

      <Divider />
      <p>Also in any cosmetics PH adjusters and texturizers are used, we will make the best choice for you and add some, as needed  </p>
    </div>
  </div>
</template>

<style scoped>

.flex-table {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
}
.section {
  border-left: 1px solid silver;
  padding-left: 0;
  text-align: center;
}
@media (max-width: 768px) {
  .flex-table {
    flex-direction: column;
    align-items: flex-start;
  }
  .section {
    border-left: none;
    padding-left: 10px;
    text-align: center;
  }
}
</style>