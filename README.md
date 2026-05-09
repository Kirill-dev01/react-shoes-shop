# Bosa Noga — Online Shoe Store 👟

Diploma project for the "React" course (Netology). 
This is a complete client-side web interface (Frontend) for an e-commerce shoe store.

## 🌟 Features

The project includes the following pages and functionalities:

*   **Home Page:** Displays top-selling items and popular categories.
*   **Product Catalog:** 
    *   Shoe filtering by categories.
    *   Live product search on the server.
    *   Pagination ("Load more" button).
*   **Product Page:** 
    *   Detailed item characteristics and descriptions.
    *   Available size selection.
    *   Quantity selection (from 1 to 10).
*   **Shopping Cart:**
    *   Adding products to the cart (managed via global state).
    *   Total price calculation.
    *   Cart persistence on page reload (`localStorage`).
    *   Order checkout (POST request sent to the server).
*   **Smart Navigation:** Handling non-existent routes (404 Error Page).

## 🛠 Tech Stack

The project utilizes modern tools within the React ecosystem:

*   **React** (Functional components, Hooks: `useState`, `useEffect`)
*   **Redux Toolkit** (Global state management: shopping cart, search bar)
*   **React Router v6** (Routing and SPA navigation)
*   **Fetch API** (Asynchronous server requests)
*   **HTML5 / CSS3 / Bootstrap** (Responsive layout based on a provided mockup)

## 🚀 How to Run the Project Locally

The application consists of two parts: the Frontend (this repository) and the Backend (a server provided by Netology).

### 1. Running the Backend Server
You will need to have the backend server running (usually provided alongside the assignment).
1. Clone the backend repository.
2. Navigate to the server folder and run `npm install`.
3. Start the server: `npm run watch`.
*By default, the server runs on `http://localhost:7070`.*

### 2. Running the Frontend Application

1. Clone this repository:
   ```bash
   git clone https://github.com/Kirill-dev01/react-shoes-shop.git
   ```

2. Navigate to the project folder:
   ```bash
   cd react-shoes-shop
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Ensure that the correct backend port is specified in your API configuration file.

5. Start the project in development mode:
   ```bash
   npm run dev
   ```
