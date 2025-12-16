--- Database Name ---
CREATE DATABASE gce;

--- Clerk ---
CREATE TABLE clerk (
    clerk_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    clerk_name VARCHAR(30) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10),
    role VARCHAR(40),
    password TEXT NOT NULL,
    active_status BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- 1. Categories
CREATE TABLE category (
    category_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_name VARCHAR(30) NOT NULL,
    description TEXT NOT NULL,
    active_status BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- 2. Products> 
CREATE TABLE product (
    product_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    net_weight VARCHAR(55),
    expiry_date DATE,
    price NUMERIC(10,2), 
    description TEXT,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    category_id INT REFERENCES category(category_id)
);

-- 3. Suppliers (for inventory purchases/expenses)
CREATE TABLE supplier (
    supplier_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    supplier_name VARCHAR(100) NOT NULL,
    contact_info VARCHAR(150),
    address TEXT,
    active_status BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- 4. Inventory (linked to supplier)
CREATE TABLE inventory (
    inventory_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id INT NOT NULL REFERENCES product(product_id),
    supplier_id INT REFERENCES supplier(supplier_id),
    clerk_id INT REFERENCES clerk(clerk_id), 
    quantity INT NOT NULL DEFAULT 0,
    unit_cost NUMERIC(10,2),
    delivery_date DATE,
    item_source VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- 5. Customers / Delivery recipients
CREATE TABLE customer (
    customer_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    contact_info VARCHAR(150),
    address TEXT,
    active_status BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- 6. Orders (sales = income)
CREATE TABLE orders (
    order_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id INT REFERENCES customer(customer_id),
    clerk_id INT REFERENCES clerk(clerk_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount NUMERIC(12,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delete_at TIMESTAMP NULL
);

-- 7. Order Items (what was sold, at what price)
CREATE TABLE order_items (
    order_item_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES product(product_id),
    quantity INT NOT NULL,
    price NUMERIC(10,2), 
    subtotal NUMERIC(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- 8. Expenses (e.g., supplier payments, logistics)
CREATE TABLE expenses (
    expense_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    supplier_id INT REFERENCES supplier(supplier_id),
    expense_type VARCHAR(100), 
    amount NUMERIC(12,2),
    expense_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

