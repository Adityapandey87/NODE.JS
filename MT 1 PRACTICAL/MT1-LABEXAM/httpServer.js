// PART A: Node.js HTTP Server using built-in http and fs modules

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// Sample food records stored in an array (no database).
const foods = [
    { id: 1, foodName: "Pizza", category: "Fast Food", price: 250, availability: true },
    { id: 2, foodName: "Burger", category: "Fast Food", price: 120, availability: true },
    { id: 3, foodName: "Pasta", category: "Italian", price: 180, availability: false }
];

function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(data, null, 2));
}

function sendHTML(res, statusCode, html) {
    res.writeHead(statusCode, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
}

function readRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
            if (body.length > 1e6) {
                reject(new Error("Request body is too large"));
                req.destroy();
            }
        });

        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch {
                reject(new Error("Invalid JSON"));
            }
        });

        req.on("error", reject);
    });
}

const server = http.createServer(async (req, res) => {
    const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
    const method = req.method;

    // GET /
    if (method === "GET" && pathname === "/") {
        return sendHTML(res, 200, `
            <!DOCTYPE html>
            <html>
            <head><title>Food Ordering</title></head>
            <body>
                <h1>Welcome to Foodie's Restaurant</h1>
                <p>Fresh food, delivered with love!</p>
                <p>Visit <a href="/foods">/foods</a> to see available food.</p>
                <p>Visit <a href="/menu">/menu</a> to see our menu.</p>
            </body>
            </html>
        `);
    }

    // GET /foods - show only available foods
    if (method === "GET" && pathname === "/foods") {
        const availableFoods = foods.filter(food => food.availability === true);
        return sendJSON(res, 200, availableFoods);
    }

    // GET /about
    if (method === "GET" && pathname === "/about") {
        return sendHTML(res, 200, `
            <!DOCTYPE html>
            <html>
            <head><title>About Us</title></head>
            <body>
                <h1>About Foodie's Restaurant</h1>
                <p>We serve fresh, tasty and affordable food to our customers.</p>
            </body>
            </html>
        `);
    }

    // GET /menu - serve static HTML using fs.readFile()
    if (method === "GET" && pathname === "/menu") {
        const menuPath = path.join(__dirname, "public", "menu.html");

        return fs.readFile(menuPath, "utf8", (error, data) => {
            if (error) {
                return sendJSON(res, 500, { message: "Unable to read menu.html" });
            }
            sendHTML(res, 200, data);
        });
    }

    // POST /add-food
    if (method === "POST" && pathname === "/add-food") {
        try {
            const newFood = await readRequestBody(req);
            const requiredFields = ["id", "foodName", "category", "price", "availability"];
            const missingFields = requiredFields.filter(field =>
                newFood[field] === undefined || newFood[field] === null || newFood[field] === ""
            );

            if (missingFields.length > 0) {
                return sendJSON(res, 400, {
                    message: "Missing required fields",
                    missingFields
                });
            }

            if (!Number.isInteger(Number(newFood.id)) ||
                typeof newFood.foodName !== "string" ||
                typeof newFood.category !== "string" ||
                typeof newFood.price !== "number" ||
                newFood.price <= 0 ||
                typeof newFood.availability !== "boolean") {
                return sendJSON(res, 400, { message: "Invalid food details" });
            }

            if (foods.some(food => food.id === Number(newFood.id))) {
                return sendJSON(res, 400, { message: "Food ID already exists" });
            }

            const foodToAdd = { ...newFood, id: Number(newFood.id) };
            foods.push(foodToAdd);

            return sendJSON(res, 201, {
                message: "Food added successfully",
                food: foodToAdd
            });
        } catch (error) {
            return sendJSON(res, 400, { message: error.message });
        }
    }

    // All other routes/method combinations
    return sendJSON(res, 404, { message: "Route not found" });
});

server.listen(PORT, () => {
    console.log(`HTTP Server running at http://localhost:${PORT}`);
});
