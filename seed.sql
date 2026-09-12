-- ============================================================================
-- MAIN SEED SCRIPT: seed.sql
-- Purpose: Populates the `questions` table with all 42 MAH-MBA-CET questions
-- across all 14 fixed Quantitative Aptitude topics (3 per topic: Easy, Medium, Hard).
-- ============================================================================

-- VIVA: Clear existing questions before re-seeding to ensure clean database state
TRUNCATE TABLE questions;

-- Note: In MySQL CLI / Workbench / phpMyAdmin / Aiven console, execute:
-- SOURCE seed_part1.sql;
-- SOURCE seed_part2.sql;
-- SOURCE seed_part3.sql;
-- Or run the statements below directly:

-- To change questions live, edit seed_part1.sql, seed_part2.sql, seed_part3.sql
