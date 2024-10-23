<template>
  <div class="recommendations">
    <div
      v-for="recommendation in recommendations"
      :key="recommendation.id"
      class="recommendation-item"
    >
      <img :src="recommendation.image" alt="Recommendation Image" />
      <h3>{{ recommendation.title }}</h3>
      <p>{{ recommendation.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommendations: [
        {
          id: 1,
          image: "rec1.jpg",
          title: "Recommendation 1",
          price: "2799元",
        },
        {
          id: 2,
          image: "rec2.jpg",
          title: "Recommendation 2",
          price: "1599元",
        },
        // Add more recommendations as needed
      ],
    };
  },
};
</script>

<style>
/* Add styles for recommendations */
</style>
