# Administrator Panel & Electronics Store

This repository contains the Administrator Panel and Electronics Store for a web application. The Administrator Panel allows authorized users to manage products, including adding, editing, viewing, and deleting them. Additionally, the panel provides functionality for browsing orders and viewing customer details. The Electronics Store enables users to register, log in, and place orders, as well as perform other typical e-commerce actions.

## Features

### Administrator Panel:

1. **Login**: Users must log in with their credentials to access the Administrator Panel. This ensures that only authorized individuals can manage products and access order and customer information.

2. **Product Management**: The panel allows administrators to perform various actions related to products, including:

   - **Add Product**: Administrators can add new products to the system. They can enter product information such as name, description, quantity, price, and upload an image.

   - **Edit Product**: Administrators have the ability to edit existing products. They can modify product details such as name, description, quantity, price, and image.

   - **View Products**: The panel provides a comprehensive view of all products in a table format. Administrators can browse through the list, which includes product details, and search for specific products based on criteria such as name or ID.

   - **Delete Product**: Administrators can delete unwanted or discontinued products from the system. Deleting a product permanently removes it from the database.

3. **Order Management**: The panel allows administrators to browse through orders and view order details. This includes information such as customer details, order items, total price, delivery method, and payment status.

4. **Customer Management**: Administrators can view the list of registered customers and access their details, such as name, contact information, and order history.

### Electronics Store:

1. **Registration**: Users can create a new account by providing necessary details such as name, email address, and password. This allows them to log in and access the features of the Electronics Store.

2. **Login**: Registered users can log in using their credentials to access their account and place orders.

3. **Product Browsing**: Users can browse the available products in the Electronics Store. Each product is presented with its name, description, price, and image.

4. **Order Placement**: Logged-in users can add products to their cart and proceed to the checkout process. They can provide shipping details, select a payment method, and complete the order placement.


## Technologies Used

- Front-end: React, Bootstrap
- Back-end: Node.js, Express.js
- Database: MongoDB

## Getting Started

To set up the application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/admin-panel-electronics-store.git`
2. Navigate to the `admin-panel` and `electronics-store` directories.
3. Install dependencies for each part: `npm install`
4. Configure the database connection in the appropriate configuration files.
5. Run each part of the application: `npm start`
6. Access the Administrator Panel at `http://localhost:3000/admin-panel` and the Electronics Store at `http://localhost:3000/store`.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for additional features, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## SCREENS OF ADMIN PANEL

## SCREENS OF ECOMMERCE STORE
