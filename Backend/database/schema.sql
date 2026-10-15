

-- Drop existing types if re-running the full script
DROP TYPE IF EXISTS property_type_enum CASCADE;
DROP TYPE IF EXISTS project_type_enum CASCADE;
DROP TYPE IF EXISTS style_enum CASCADE;
DROP TYPE IF EXISTS project_status_enum CASCADE;
DROP TYPE IF EXISTS quotation_status_enum CASCADE;
DROP TYPE IF EXISTS milestone_status_enum CASCADE;
DROP TYPE IF EXISTS design_review_status_enum CASCADE;
DROP TYPE IF EXISTS consultation_status_enum CASCADE;
DROP TYPE IF EXISTS payment_status_enum CASCADE;
-- =================================================================
-- PART 1: EXTENSIONS & ENUMS
-- =================================================================

-- Enable pgcrypto extension for secure password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create standard ENUM types
CREATE TYPE property_type_enum AS ENUM ('Apartment', 'Villa', 'Independent House', 'Office');
CREATE TYPE project_type_enum AS ENUM ('Full Home Design', 'Living Room', 'Bedroom', 'Kitchen', 'Renovation');
CREATE TYPE style_enum AS ENUM ('Modern', 'Minimal', 'Contemporary', 'Luxury', 'Traditional');
CREATE TYPE project_status_enum AS ENUM ('DRAFT', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
CREATE TYPE quotation_status_enum AS ENUM ('PENDING', 'ACCEPTED', 'REVISION REQUESTED', 'REJECTED');
CREATE TYPE milestone_status_enum AS ENUM ('UPCOMING', 'IN PROGRESS', 'COMPLETED');
CREATE TYPE design_review_status_enum AS ENUM ('PENDING', 'APPROVED', 'CHANGE REQUESTED');
CREATE TYPE consultation_status_enum AS ENUM ('REQUESTED', 'SCHEDULED', 'COMPLETED', 'CANCELLED');
CREATE TYPE payment_status_enum AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');


-- =================================================================
-- PART 2: CORE TABLES CREATION
-- =================================================================

-- 1. Roles Table
CREATE TABLE IF NOT EXISTS roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL CHECK (role_name IN ('CUSTOMER', 'DESIGNER', 'ADMINISTRATOR')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    profile_image_url TEXT,
    role VARCHAR(50) DEFAULT 'CUSTOMER',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. User Roles Mapping Table
CREATE TABLE IF NOT EXISTS user_roles (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(role_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    project_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    designer_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    project_name VARCHAR(150) NOT NULL,
    location VARCHAR(100) NOT NULL,
    property_type property_type_enum NOT NULL,
    project_type project_type_enum NOT NULL,
    budget_range VARCHAR(50) NOT NULL,
    preferred_style style_enum NOT NULL,
    requirements TEXT NOT NULL,
    status project_status_enum DEFAULT 'NEW PROJECT',
    progress_percentage INT DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Consultation Requests Table
CREATE TABLE IF NOT EXISTS consultation_requests (
    consultation_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    designer_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    preferred_date DATE NOT NULL,
    preferred_time VARCHAR(20) NOT NULL,
    discussion_notes TEXT NOT NULL,
    status consultation_status_enum DEFAULT 'REQUESTED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Quotations Table
CREATE TABLE IF NOT EXISTS quotations (
    quotation_id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    designer_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    total_amount NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0),
    status quotation_status_enum DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Quotation Line Items Table
CREATE TABLE IF NOT EXISTS quotation_items (
    item_id SERIAL PRIMARY KEY,
    quotation_id INT NOT NULL REFERENCES quotations(quotation_id) ON DELETE CASCADE,
    item_description VARCHAR(255) NOT NULL,
    cost NUMERIC(10, 2) NOT NULL CHECK (cost >= 0)
);

-- 8. Project Milestones Table
CREATE TABLE IF NOT EXISTS project_milestones (
    milestone_id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    sequence_order INT NOT NULL CHECK (sequence_order > 0),
    milestone_key VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    status milestone_status_enum DEFAULT 'UPCOMING',
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_project_milestone_sequence UNIQUE (project_id, sequence_order)
);

-- 9. Design Reviews Table
CREATE TABLE IF NOT EXISTS design_reviews (
    review_id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    designer_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL DEFAULT 'Living Room Concept',
    designer_name VARCHAR(100) DEFAULT 'Designer',
    version VARCHAR(20) DEFAULT 'Version 1.0',
    design_style style_enum DEFAULT 'Modern',
    space VARCHAR(100) DEFAULT 'Living Room',
    image_url TEXT,
    feedback_notes TEXT,
    status design_review_status_enum DEFAULT 'PENDING',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Designer Profiles Table
CREATE TABLE IF NOT EXISTS designer_profiles (
    designer_profile_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    location VARCHAR(100) NOT NULL,
    primary_style style_enum NOT NULL,
    rating NUMERIC(2, 1) DEFAULT 0.0 CHECK (rating BETWEEN 0.0 AND 5.0),
    completed_projects_count INT DEFAULT 0 CHECK (completed_projects_count >= 0),
    about_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. Designer Portfolio Items Table
CREATE TABLE IF NOT EXISTS designer_portfolio_items (
    portfolio_item_id SERIAL PRIMARY KEY,
    designer_profile_id INT NOT NULL REFERENCES designer_profiles(designer_profile_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption VARCHAR(255),
    display_order INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. Payments Table
CREATE TABLE IF NOT EXISTS payments (
    payment_id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    customer_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
    payment_status payment_status_enum DEFAULT 'PENDING',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
    invoice_id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    project_id INT REFERENCES projects(project_id) ON DELETE SET NULL,
    customer_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
    status payment_status_enum DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- =================================================================
-- PART 3: PERFORMANCE INDEXES (CLEANED)
-- =================================================================
-- Safety check: Ensure the status column exists before creating indexes on it
ALTER TABLE projects ADD COLUMN IF NOT EXISTS status project_status_enum DEFAULT 'DRAFT';

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_projects_customer_id ON projects(customer_id);
CREATE INDEX IF NOT EXISTS idx_projects_designer_id ON projects(designer_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_consultations_customer_id ON consultation_requests(customer_id);
CREATE INDEX IF NOT EXISTS idx_consultations_designer_id ON consultation_requests(designer_id);
CREATE INDEX IF NOT EXISTS idx_quotations_project_id ON quotations(project_id);
CREATE INDEX IF NOT EXISTS idx_project_milestones_project_id ON project_milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_design_reviews_project_id ON design_reviews(project_id);
CREATE INDEX IF NOT EXISTS idx_designer_profiles_user_id ON designer_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_customer_id ON payments(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_customer_id ON invoices(customer_id);


-- =================================================================
-- PART 4: SEED DATA
-- =================================================================

-- Insert Roles
INSERT INTO roles (role_name) VALUES ('CUSTOMER'), ('DESIGNER'), ('ADMINISTRATOR')
ON CONFLICT (role_name) DO NOTHING;

-- Insert Test Users
INSERT INTO users (user_id, full_name, email, password_hash, role)
VALUES 
    (1, 'Samiksha Moharana', 'samikhyamaharana9@gmail.com', crypt('password123', gen_salt('bf')), 'CUSTOMER'),
    (3, 'Rohit Verma', 'rohit@example.com', crypt('password123', gen_salt('bf')), 'DESIGNER')
ON CONFLICT (user_id) DO UPDATE 
SET password_hash = EXCLUDED.password_hash;

SELECT setval('users_user_id_seq', (SELECT MAX(user_id) FROM users));

-- Assign Roles
INSERT INTO user_roles (user_id, role_id)
VALUES 
    (1, (SELECT role_id FROM roles WHERE role_name = 'CUSTOMER')),
    (3, (SELECT role_id FROM roles WHERE role_name = 'DESIGNER'))
ON CONFLICT DO NOTHING;


-- =================================================================
-- PART 5: STORED FUNCTIONS & PROCEDURES
-- =================================================================

-- 1. Filter Designers Function
CREATE OR REPLACE FUNCTION get_filtered_designers(
    p_search_query TEXT DEFAULT '',
    p_style_filter TEXT DEFAULT 'All Styles',
    p_location_filter TEXT DEFAULT 'All Locations'
)
RETURNS TABLE (
    id INT,
    name VARCHAR(100),
    location VARCHAR(100),
    style style_enum,
    rating NUMERIC(2, 1),
    projects INT,
    image TEXT
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.user_id AS id,
        u.full_name AS name,
        dp.location,
        dp.primary_style AS style,
        dp.rating,
        dp.completed_projects_count AS projects,
        u.profile_image_url AS image
    FROM designer_profiles dp
    JOIN users u ON dp.user_id = u.user_id
    WHERE 
        (
            p_search_query = '' OR
            LOWER(u.full_name) LIKE LOWER('%' || p_search_query || '%') OR
            LOWER(dp.location) LIKE LOWER('%' || p_search_query || '%') OR
            LOWER(dp.primary_style::text) LIKE LOWER('%' || p_search_query || '%')
        )
        AND (p_location_filter = 'All Locations' OR dp.location = p_location_filter)
        AND (p_style_filter = 'All Styles' OR dp.primary_style::text = p_style_filter)
    ORDER BY dp.rating DESC, u.full_name ASC;
END;
$$;

-- 2. Create Consultation Request Function
CREATE OR REPLACE FUNCTION create_consultation_request(
    p_customer_id INT,
    p_designer_id INT,
    p_preferred_date DATE,
    p_preferred_time VARCHAR(20),
    p_discussion_notes TEXT
)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    v_consultation_id INT;
BEGIN
    INSERT INTO consultation_requests (
        customer_id, designer_id, preferred_date, preferred_time, discussion_notes, status
    )
    VALUES (
        p_customer_id, p_designer_id, p_preferred_date, p_preferred_time, p_discussion_notes, 'REQUESTED'
    )
    RETURNING consultation_id INTO v_consultation_id;

    RETURN v_consultation_id;
END;
$$;

-- 3. Authenticate User Function
CREATE OR REPLACE FUNCTION authenticate_user(
    p_email VARCHAR(150),
    p_password TEXT
)
RETURNS TABLE (
    user_id INT,
    full_name VARCHAR(100),
    email VARCHAR(150),
    role VARCHAR(50),
    is_authenticated BOOLEAN,
    message VARCHAR(100)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_user users%ROWTYPE;
BEGIN
    SELECT * INTO v_user FROM users WHERE users.email = LOWER(TRIM(p_email));

    IF NOT FOUND THEN
        RETURN QUERY SELECT NULL::INT, NULL::VARCHAR, NULL::VARCHAR, NULL::VARCHAR, FALSE, 'User with this email does not exist.'::VARCHAR;
        RETURN;
    END IF;

    IF v_user.password_hash = crypt(p_password, v_user.password_hash) THEN
        UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE users.user_id = v_user.user_id;
        RETURN QUERY SELECT v_user.user_id, v_user.full_name, v_user.email, v_user.role::VARCHAR, TRUE, 'Login successful.'::VARCHAR;
    ELSE
        RETURN QUERY SELECT NULL::INT, NULL::VARCHAR, NULL::VARCHAR, NULL::VARCHAR, FALSE, 'Invalid password. Please try again.'::VARCHAR;
    END IF;
END;
$$;

-- 4. Register User Function
CREATE OR REPLACE FUNCTION register_user(
    p_full_name VARCHAR(100),
    p_email VARCHAR(150),
    p_password TEXT,
    p_role VARCHAR(50) DEFAULT 'CUSTOMER'
)
RETURNS TABLE (
    user_id INT,
    full_name VARCHAR(100),
    email VARCHAR(150),
    role VARCHAR(50),
    is_success BOOLEAN,
    message VARCHAR(100)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_new_id INT;
    v_clean_email VARCHAR(150) := LOWER(TRIM(p_email));
BEGIN
    IF EXISTS (SELECT 1 FROM users WHERE LOWER(users.email) = v_clean_email) THEN
        RETURN QUERY SELECT NULL::INT, NULL::VARCHAR, NULL::VARCHAR, NULL::VARCHAR, FALSE, 'An account with this email already exists.'::VARCHAR;
        RETURN;
    END IF;

    INSERT INTO users (full_name, email, password_hash, role)
    VALUES (TRIM(p_full_name), v_clean_email, crypt(p_password, gen_salt('bf')), COALESCE(p_role, 'CUSTOMER'))
    RETURNING users.user_id INTO v_new_id;

    RETURN QUERY SELECT v_new_id, TRIM(p_full_name)::VARCHAR(100), v_clean_email::VARCHAR(150), COALESCE(p_role, 'CUSTOMER')::VARCHAR(50), TRUE, 'Account created successfully.'::VARCHAR(100);
END;
$$;

-- 5. Get Design Review by Project Function
CREATE OR REPLACE FUNCTION get_design_review_by_project(p_project_id INT)
RETURNS TABLE (
    review_id INT,
    project_id INT,
    title VARCHAR(150),
    designer_name VARCHAR(100),
    version VARCHAR(20),
    design_style style_enum,
    space VARCHAR(100),
    image_url TEXT,
    status design_review_status_enum,
    feedback_notes TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        dr.review_id,
        dr.project_id,
        dr.title,
        dr.designer_name,
        dr.version,
        dr.design_style,
        dr.space,
        dr.image_url,
        dr.status,
        dr.feedback_notes
    FROM design_reviews dr
    WHERE dr.project_id = p_project_id
    ORDER BY dr.created_at DESC
    LIMIT 1;
END;
$$;
