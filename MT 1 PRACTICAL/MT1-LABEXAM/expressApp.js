// PART B: Food Management REST API using Express.js

import express from "express";

const app = express();
const PORT = 4000;

// Middleware to read JSON request bodies.
app.use(express.json());

// Sample food records stored in an array (no database).
let foods = [
    { id: 1, foodName: "Pizza", category: "Fast Food", price: 250, availability: true },
    { id: 2, foodName: "Burger", category: "Fast Food", price: 120, availability: true },
    { id: 3, foodName: "Pasta", category: "Italian", price: 180, availability: false }
];

const requiredFields = ["id", "foodName", "category", "price", "availability"];

function validateFood(food) {
    const missingFields = requiredFields.filter(field =>
        food[field] === undefined || food[field] === null || food[field] === ""
    );

    if (missingFields.length > 0) {
        return { valid: false, message: "Missing required fields", missingFields };
    }

    if (!Number.isInteger(Number(food.id)) ||
        typeof food.foodName !== "string" ||
        typeof food.category !== "string" ||
        typeof food.price !== "number" ||
        food.price <= 0 ||
        typeof food.availability !== "boolean") {
        return { valid: false, message: "Invalid food details. Price must be a positive number." };
    }

    return { valid: true };
}

// GET /foods - retrieve all food items
app.get("/foods", (req, res) => {
    res.status(200).json(foods);
});

// GET /foods/:id - retrieve one food item
app.get("/foods/:id", (req, res) => {
    const foodId = Number(req.params.id);
    const food = foods.find(item => item.id === foodId);

    if (!food) {
        return res.status(404).json({ message: "Food item not found" });
    }

    res.status(200).json(food);
});

// POST /foods - add a new food item
app.post("/foods", (req, res) => {
    const newFood = req.body;
    const validation = validateFood(newFood);

    if (!validation.valid) {
        return res.status(400).json(validation);
    }

    const foodId = Number(newFood.id);

    if (foods.some(item => item.id === foodId)) {
        return res.status(400).json({ message: "Food ID already exists" });
    }

    const foodToAdd = { ...newFood, id: foodId };
    foods.push(foodToAdd);

    res.status(201).json({
        message: "Food item added successfully",
        food: foodToAdd
    });
});

// PUT /foods/:id - update an existing food item
app.put("/foods/:id", (req, res) => {
    const foodId = Number(req.params.id);
    const index = foods.findIndex(item => item.id === foodId);

    if (index === -1) {
        return res.status(404).json({ message: "Food item not found" });
    }

    const updatedFood = { ...req.body, id: foodId };
    const validation = validateFood(updatedFood);

    if (!validation.valid) {
        return res.status(400).json(validation);
    }

    foods[index] = updatedFood;

    res.status(200).json({
        message: "Food item updated successfully",
        food: foods[index]
    });
});

// DELETE /foods/:id - delete a food item
app.delete("/foods/:id", (req, res) => {
    const foodId = Number(req.params.id);
    const index = foods.findIndex(item => item.id === foodId);

    if (index === -1) {
        return res.status(404).json({ message: "Food item not found" });
    }

    const deletedFood = foods.splice(index, 1)[0];

    res.status(200).json({
        message: "Food item deleted successfully",
        food: deletedFood
    });
});

// Handle invalid JSON and other errors from express.json().
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({ message: "Invalid JSON format" });
    }
    res.status(500).json({ message: "Internal server error" });
});

// Handle unknown endpoints.
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`Express Server running at http://localhost:${PORT}`);
});
