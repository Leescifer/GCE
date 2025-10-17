--- Database Name ---
CREATE DATABASE gce;

--- Clerk ---
CREATE TABLE clerk (
    clerk_id SERIAL PRIMARY KEY,
    clerk_name VARCHAR(100) NOT NULL,
    age INT CHECK (age > 15),
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    role VARCHAR(50) NOT NULL, -- e.g., cashier, stock manager, delivery staff
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 1. Categories
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products
CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    net_weight VARCHAR(55),
    expiry_date DATE,
    price NUMERIC(10,2), 
    description TEXT,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id INT REFERENCES category(category_id)
);

-- 3. Suppliers (for inventory purchases/expenses)
CREATE TABLE supplier (
    supplier_id SERIAL PRIMARY KEY,
    supplier_name VARCHAR(100) NOT NULL,
    contact_info VARCHAR(150),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Inventory (linked to supplier)
CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES product(product_id),
    supplier_id INT REFERENCES supplier(supplier_id),
    clerk_id INT REFERENCES clerk(clerk_id), -- clerk who handled it
    quantity INT NOT NULL DEFAULT 0,
    unit_cost NUMERIC(10,2),
    delivery_date DATE,
    item_source VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Customers / Delivery recipients
CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    contact_info VARCHAR(150),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Orders (sales = income)
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customer(customer_id),
    clerk_id INT REFERENCES clerk(clerk_id), -- clerk who handled sale
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount NUMERIC(12,2) DEFAULT 0
);

-- 7. Order Items (what was sold, at what price)
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES product(product_id),
    quantity INT NOT NULL,
    price NUMERIC(10,2), -- selling price per unit
    subtotal NUMERIC(12,2)
);

-- 8. Expenses (e.g., supplier payments, logistics)
CREATE TABLE expenses (
    expense_id SERIAL PRIMARY KEY,
    supplier_id INT REFERENCES supplier(supplier_id),
    expense_type VARCHAR(100), -- e.g., "Transport", "Raw Material"
    amount NUMERIC(12,2),
    expense_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

