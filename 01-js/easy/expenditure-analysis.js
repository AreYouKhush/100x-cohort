/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  let categoryArray = [];
  transactions.forEach((item) => {
    let index = categoryArray.findIndex((e) => e.category === item.category);
    if (index === -1) {
      categoryArray.push({ category: item.category, totalSpent: item.price });
    } else {
      categoryArray[index].totalSpent += item.price;
    }
  });

  return categoryArray;
}

module.exports = calculateTotalSpentByCategory;
