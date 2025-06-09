<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import 'primeicons/primeicons.css';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Timeline from 'primevue/timeline';
import { ref } from 'vue';

const events = ref([
  { status: 'Formulate your dream recipe', sub: '', content: 'Choose the best ingredients to solve your problem. A wide range of active substances, oils, and botanicals are available.', icon: 'pi pi-cog', color: '#673AB7' },
  { status: 'Place an order.', sub: '', content: 'Review your final formula, determine the size of the jar, and place your order.', icon: 'pi pi-shopping-cart', color: '#9C27B0'},
  { status: 'Start of hyper-individualized manufacturing.', sub: '', content: 'A robotic system under the control of a specialist completes the unique cream according to your formula in a day.', icon: 'pi pi-shopping-cart', color: '#FF9800' },
  { status: 'Shipment', sub: '', content: 'Free shipment is available', icon: 'pi pi-check', color: '#607D8B' },
  { status: 'Feedback', sub: '', content: 'Share your impressions and wishes with us. Leave a review and get a bonus.', icon: 'pi pi-check', color: '#607D8B' }
])

const router = useRouter();
</script>

<template>
  <h2 style="text-align: center">Make your own cosmetics from best ingredients you want throw away chemical</h2>
<div class="row">
  <div class="col-12">
    <div class="mix-container">
      <img src="../assets/potion1.svg" width="50" class="rotate-30-deg" style="position: relative; top: 10svh; left: 30px;">
      <img src="../assets/potion2.svg" width="70" class="rotate-60-deg" style="position: relative; top: 10%; left: 70%;">
      <img src="../assets/potion3.svg" width="80" class="rotate-10-deg" style="position: relative; top: 20svh; left: 170px;">
      <Button @click="router.push({name: 'mix', params: {id: 1}})" label="MIX" class="mix-btn" variant="outlined" style="font-weight: 900"/>
    </div>
  </div>
</div>
  <div class="row">
    <div class="col-12" style="text-align: center">
      <h3>How it works:</h3>
    </div>
  </div>

  <div class="row">
    <Timeline :value="events" align="alternate" class="customized-timeline">
      <template #marker="slotProps">
        <span class="timeline-icon" :style="{ backgroundColor: slotProps.item.color }">
            <i :class="slotProps.item.icon"></i>
        </span>
      </template>
      <template #content="slotProps">
        <Card class="mt-4">
          <template #title>
            {{ slotProps.item.status }}
          </template>
          <template #subtitle>
            {{ slotProps.item.sub }}
          </template>
          <template #content>
            <p>
              {{slotProps.item.content}}
            </p>
            <Button label="Read more" text></Button>
          </template>
        </Card>
      </template>
    </Timeline>
  </div>
</template>

<style scoped>

.buttons-main {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}
.mix-container {
  height: 30svh;
  width: 100%;
  position: relative;
}

.mix-btn {
  font-size: 2rem;
  width: 100%;
}

.rotate-30-deg {
  transform: rotate(30deg);
}

.rotate-60-deg {
  transform: rotate(-60deg);
}

.rotate-10-deg {
  transform: rotate(10deg);
}

.flex-feature {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
}

@media screen and (max-width: 960px) {
  ::v-deep(.customized-timeline) {
    .p-timeline-event:nth-child(even) {
      flex-direction: row !important;

      .p-timeline-event-content {
        text-align: left;
      }
    }

    .p-timeline-event-opposite {
      flex: 0;
    }
  }
}

.timeline-icon {
  border-radius: 50%;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  padding: 0.5rem;
}
</style>
