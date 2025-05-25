<script setup>
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Timeline from 'primevue/timeline';
import Tag from 'primevue/tag';
import { ref } from "vue";

const orders = ref([
  {date: '2025-03-24', status: 'Pending', total: '$120.00', events: [
      {name: 'created', status: 'Created', date: '2025-03-24'},
      {name: 'paid', status: 'Paid', date: '2025-03-24'},
      {name: 'shipped', status: 'Shipped', date: '2025-03-24'},
    ]},
  {date: '2025-03-23', status: 'Processing', total: '$70.00',  events: [
      {name: 'created', status: 'Created', date: '2025-03-24'},
      {name: 'paid', status: 'Paid', date: '2025-03-24'},
      {name: 'shipped', status: 'Shipped', date: '2025-03-24'},
    ]},
  {date: '2025-03-23', status: 'Delivered', total: '$270.00',  events: [
      {name: 'created', status: 'Created', date: '2025-03-24'},
      {name: 'paid', status: 'Paid', date: '2025-03-24'},
      {name: 'shipped', status: 'Shipped', date: '2025-03-24'},
    ]},
])

const orderStatusTagStyle = {
  'Pending': 'secondary',
  'Processing': 'secondary',
  'Delivered': 'success',
};
</script>

<template>
  <Accordion value="1">
    <AccordionPanel v-for="order in orders" :value="order">
      <AccordionHeader>
        <div style="display: flex; justify-content: space-between; padding-right: 10px; width: 100%">
          <div>{{ order.date }}</div>
          <div><Tag :severity="`${orderStatusTagStyle[order.status]}`" :value="order.status"></Tag></div>
          <div>{{order.total}}</div>
        </div>
      </AccordionHeader>
      <AccordionContent>
        <Timeline :value="order.events" align="left" class="costom-order-timeline">
          <template #content="slotProps">
            {{ slotProps.item.status }} - {{ slotProps.item.date }}
          </template>
        </Timeline>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<style scoped>

</style>
