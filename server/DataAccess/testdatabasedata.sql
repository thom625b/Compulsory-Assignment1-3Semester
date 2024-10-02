INSERT INTO customers (name, address, phone, email) VALUES
                                                        ('John Doe', '123 Main St', '123-456-7890', 'john.doe@example.com'),
                                                        ('Jane Smith', '456 Oak St', '555-123-4567', 'jane.smith@example.com'),
                                                        ('Alice Johnson', '789 Pine St', '321-654-0987', 'alice.johnson@example.com');
INSERT INTO paper (name, discontinued, stock, price) VALUES
                                                         ('A4 Paper', false, 100, 5.99),
                                                         ('Letter Paper', false, 100, 6.49),
                                                         ('Glossy Photo Paper', false, 100, 12.99),
                                                         ('Recycled Paper', false, 100, 4.99);
INSERT INTO feature (feature_name) VALUES
                                       ('Waterproof'),
                                       ('Recycled Material'),
                                       ('Heavyweight'),
                                       ('Glossy Finish');
INSERT INTO orders (order_date, delivery_date, status, total_amount, customer_id) VALUES
                                                                                      (CURRENT_TIMESTAMP, '2024-10-05', 'shipped', 45.97, 1),
                                                                                      (CURRENT_TIMESTAMP, '2024-10-10', 'pending', 19.99, 2),
                                                                                      (CURRENT_TIMESTAMP, '2024-10-12', 'delivered', 30.00, 3);
INSERT INTO paper_features (paper_id, feature_id, feature_stock) VALUES
                                                      (1, 3, 30),  -- A4 Paper with Heavyweight
                                                      (1, 2, 20), -- Recycled Paper with Recycled Material
                                                      (1, 4, 50),  -- Letter Paper with Glossy Finish
                                                      (2, 4, 50),  -- Letter Paper with Glossy Finish
                                                      (2, 3, 50),  -- Glossy Photo Paper with Glossy Finish
                                                      (3, 2, 50),  -- Recycled Paper with Recycled Material
                                                      (3, 4, 50),  -- Glossy Photo Paper with Glossy Finish
                                                      (4, 1, 50), -- Recycled Paper with Recycled Material
                                                      (4, 2, 50);  -- Recycled Paper with Recycled Material

INSERT INTO order_entries (quantity, product_id, order_id) VALUES
                                                               (3, 1, 1), -- 3 units of A4 Paper for Order 1
                                                               (2, 2, 2), -- 2 units of Letter Paper for Order 2
                                                               (1, 3, 3); -- 1 unit of Glossy Photo Paper for Order 3