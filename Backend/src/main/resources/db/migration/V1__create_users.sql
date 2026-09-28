CREATE TABLE users (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                       email VARCHAR(255) NOT NULL UNIQUE,

                       password_hash VARCHAR(255) NOT NULL,

                       first_name VARCHAR(100) NOT NULL,

                       last_name VARCHAR(100) NOT NULL,

                       phone VARCHAR(20),

                       role VARCHAR(20) NOT NULL,

                       status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

                       created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

                       updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

                       CONSTRAINT chk_users_role
                           CHECK (role IN ('CUSTOMER', 'DESIGNER', 'ADMIN')),

                       CONSTRAINT chk_users_status
                           CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED'))
);

CREATE INDEX idx_users_role
    ON users(role);

CREATE INDEX idx_users_status
    ON users(status);