<template>
  <q-menu fit>
    <!-- TODO: Implement this later -->
    <q-list style="min-width: 100px">
      <q-item v-close-popup clickable>
        <q-item-section>Saved item price(default) </q-item-section>
        <q-item-section side>[15]</q-item-section>
      </q-item>
      <q-separator />
      <q-item v-close-popup clickable>
        <q-item-section>Highest in last month</q-item-section>
        <q-item-section side>[17]</q-item-section>
      </q-item>
      <q-separator />
      <q-item v-close-popup clickable>
        <q-item-section>Lowest in last month</q-item-section>
        <q-item-section side>[17]</q-item-section>
      </q-item>
      <q-separator />
      <q-item v-close-popup clickable>
        <q-item-section>Same as last invoice price</q-item-section>
        <q-item-section side>[15]</q-item-section>
      </q-item>
      <q-separator />
      <q-item v-close-popup clickable>
        <q-item-section>See all history</q-item-section>
        <q-item-section side><q-icon name="timeline" /></q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup lang="ts"></script>

<style scoped></style>
