-- ============================================================================
-- TABLE 1: users
-- Purpose: Stores registered student credentials and account metadata.
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE, -- VIVA: UNIQUE constraint prevents duplicate student registrations
    password VARCHAR(255) NOT NULL,    -- VIVA: Password stored as bcrypt hash, never plain text
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLE 2: questions
-- Purpose: Stores the 42 MAH-MBA-CET Quantitative Aptitude practice questions.
-- ============================================================================
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(100) NOT NULL,       -- VIVA: Must match one of the 14 fixed MBA-CET topics
    difficulty ENUM('Easy', 'Medium', 'Hard') NOT NULL, -- VIVA: Used for Adaptive Difficulty filtering
    question_text TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_option CHAR(1) NOT NULL,   -- VIVA: 'A', 'B', 'C', or 'D'
    explanation TEXT
);

-- ============================================================================
-- TABLE 3: quiz_results
-- Purpose: Records completed quiz attempts for progress tracking & dashboard charts.
-- ============================================================================
CREATE TABLE IF NOT EXISTS quiz_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,              -- VIVA: Foreign key referencing users table
    topic VARCHAR(100) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    score INT NOT NULL,                -- VIVA: Score percentage (0 to 100)
    total_questions INT NOT NULL,
    correct_answers INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
