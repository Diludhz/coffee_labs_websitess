const productsData = {
  "Products": [
    {
      "id": 1,
      "category": "Tea & Milk",
      "slug": "tea-milk",
      "items": [
        {
          "id": "tm1",
          "title": "Pristine Whip Topping",
          "image": "/Assets/pristine-whip-topping.webp",
          "price": 12.99,
          "stock": true,
          "rating": 4.5,
          "badge": "Popular",
          "description": "Premium whipped cream topping"
        },
        {
          "id": "tm2",
          "title": "Nadec Milk",
          "image": "/Assets/nadec-milk.jpg",
          "price": 8.99,
          "stock": true,
          "rating": 4.2,
          "description": "Fresh dairy milk"
        },
        // ... other tea & milk items (truncated for brevity)
      ]
    },
    {
      "id": 2,
      "category": "Spreads",
      "slug": "spreads",
      "items": [
        {
          "id": "sp1",
          "title": "Herco Hazelnut Paste",
          "image": "/Assets/herco-hazalnuts-paste.jpeg",
          "price": 14.99,
          "stock": true,
          "rating": 4.7,
          "badge": "Bestseller",
          "description": "Premium hazelnut spread"
        },
        // ... other spread items
      ]
    },
    // ... other categories (truncated for brevity)
  ]
};

// Flatten all products for easier access
const allProducts = productsData.Products.flatMap(category => 
  category.items.map(item => ({
    ...item,
    category: category.category,
    categorySlug: category.slug
  }))
);

// Get all categories
const categories = productsData.Products.map(({ id, category, slug }) => ({
  id,
  name: category,
  slug,
  count: productsData.Products.find(cat => cat.id === id).items.length
}));

export { productsData, allProducts, categories };
export default productsData;
