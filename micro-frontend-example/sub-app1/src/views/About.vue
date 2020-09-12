<template>
  <a-card title="子应用一关于">
    <p
      style="fontSize: 14px;color: rgba(0, 0, 0, 0.85); marginBottom: 16px;fontWeight: 500"
    >
      Group title
    </p>
    <a-card title="Inner card title">
      <a slot="extra" href="#">More</a>
      Inner Card content
    </a-card>
    <a-card title="Inner card title" :style="{ marginTop: '16px' }">
      <a slot="extra" href="#">More</a>
      Inner Card content
    </a-card>
  </a-card>
</template>

<script>
export default {};
</script>
