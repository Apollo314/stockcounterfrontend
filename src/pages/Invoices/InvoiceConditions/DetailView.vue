<template>
  <FullHeightPage hide-back-button padding :fit="$q.screen.gt.sm">
    <AutoCrud
      ref="autoCrudRef"
      class="fullheighteditor"
      fit
      create-path="/invoice/invoice-conditions/"
      update-retrieve-destroy-path="/invoice/invoice-conditions/{id}/"
      :query="id ? { id } : undefined"
      :create-redirect="{ name: 'invoice-condition-list' }"
      :delete-redirect="{ name: 'invoice-condition-list' }"
    >
      <template #conditions="{ formComponent }">
        <RichEditor
          class="full-height"
          name="conditions"
          :fullscreen-on-click="true"
          :placeholder="() => formComponent.props.label"
        >
        </RichEditor>
      </template>
    </AutoCrud>
  </FullHeightPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import FullHeightPage from 'components/Page/FullHeightPage.vue';
import AutoCrud from 'components/VeeDynamicForm/AutoCrud/AutoCrud.vue';
import RichEditor from 'components/VeeDynamicForm/CustomComponents/Editor/RichEditor.vue';

defineProps<{
  id?: string;
}>();

const autoCrudRef = ref<InstanceType<typeof AutoCrud>>();
</script>

<style lang="scss">
.fullheighteditor {
  .scroll-section {
    height: 100%;
    .form-parent {
      height: 100%;
      display: flex;
      flex-direction: column;
      .conditions {
        flex-grow: 1;
      }
    }
  }
}
</style>
