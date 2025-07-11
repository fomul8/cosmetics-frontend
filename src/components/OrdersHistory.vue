<script setup>
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Timeline from 'primevue/timeline';
import Tag from 'primevue/tag';
import { ref, onMounted } from "vue";
import {apiFetch} from "../helpers/api.js";

const orders = ref([]);

const orderStatusTagStyle = {
  'pending': 'secondary',
  'processing': 'secondary',
  'delivered': 'success',
};

onMounted(async () => {
  orders.value = await apiFetch('/orders/');
})
</script>

<template>
  <Accordion value="1">
    <AccordionPanel v-for="order in orders" :value="order">
      <AccordionHeader>
        <div style="display: flex; justify-content: space-between; padding-right: 10px; width: 100%">
          <div>{{ order.created_at }}</div>
          <div><Tag :severity="`${orderStatusTagStyle[order.status]}`" :value="order.status"></Tag></div>
          <div>{{order.total}}</div>
        </div>
      </AccordionHeader>
      <AccordionContent>
        <Timeline :value="order.history" align="left" class="costom-order-timeline">
          <template #content="slotProps">
            {{ slotProps.item.status_to }} - {{ slotProps.item.created_at }}
          </template>
        </Timeline>
      </AccordionContent>
    </AccordionPanel>

    <div v-if="orders.length === 0">
      <p style="text-align: center; font-size: 1.2rem">Ops, you dont have orders yet</p>
    </div>
  </Accordion>
</template>

<style scoped>

</style>
