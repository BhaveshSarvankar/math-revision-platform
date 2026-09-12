-- To change this live, edit line 6 onwards in seed_part3.sql
-- Returns: Seed rows for Topics 11 to 14 (Mensuration, Algebra, Data Interpretation, Data Sufficiency)
INSERT INTO questions (topic, difficulty, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
('Mensuration', 'Easy', 'What is the area of a rectangle with length 12 cm and breadth 5 cm?', '50 sq cm', '60 sq cm', '70 sq cm', '80 sq cm', 'B', 'Area = length * breadth = 12 * 5 = 60 sq cm.'),
('Mensuration', 'Medium', 'Find the area of a circle with radius 7 cm. (Use pi = 22/7)', '144 sq cm', '154 sq cm', '164 sq cm', '176 sq cm', 'B', 'Area = pi * r^2 = (22/7) * 7 * 7 = 154 sq cm.'),
('Mensuration', 'Hard', 'Total surface area of a cube is 216 sq cm. Find its volume.', '144 cu cm', '216 cu cm', '256 cu cm', '512 cu cm', 'B', '6*a^2 = 216 => a^2 = 36 => a = 6 cm. Volume = a^3 = 6^3 = 216 cu cm.'),

('Algebra', 'Easy', 'Solve for x: 3x + 5 = 20.', '3', '4', '5', '6', 'C', '3x = 20 - 5 => 3x = 15 => x = 5.'),
('Algebra', 'Medium', 'If x + (1/x) = 4, find the value of x^2 + (1/x^2).', '12', '14', '16', '18', 'B', 'Squaring both sides: (x + 1/x)^2 = 16 => x^2 + 1/x^2 + 2 = 16 => 14.'),
('Algebra', 'Hard', 'Find the roots of the quadratic equation x^2 - 5x + 6 = 0.', '(1, 6)', '(2, 3)', '(-2, -3)', '(1, 5)', 'B', '(x - 2)(x - 3) = 0 => roots are x = 2 and x = 3.'),

('Data Interpretation', 'Easy', 'Sales in Q1=100, Q2=150, Q3=200, Q4=250. What is total annual sales?', '600', '700', '800', '900', 'B', 'Total Sales = 100 + 150 + 200 + 250 = 700 units.'),
('Data Interpretation', 'Medium', 'If Company A sales are 400 and B sales are 600, by what % is B greater than A?', '25%', '50%', '66.66%', '75%', 'B', '((600 - 400)/400) * 100 = (200/400)*100 = 50%.'),
('Data Interpretation', 'Hard', 'A pie chart shows Expenses: Rent 30%, Food 25%, Savings 20%, Misc 25%. If total income is 50000, find Rent.', '12500', '15000', '10000', '17500', 'B', 'Rent = 30% of 50,000 = (30/100)*50000 = 15,000.'),

('Data Sufficiency', 'Easy', 'Is x positive? St 1: x > 5. St 2: x^2 = 25.', 'Statement 1 alone is sufficient', 'Statement 2 alone is sufficient', 'Both required', 'Neither is sufficient', 'A', 'St 1 says x > 5 so x is definitely positive. St 2 gives x = +5 or -5 (ambiguous).'),
('Data Sufficiency', 'Medium', 'What is the value of integer n? Statement 1: n is prime. Statement 2: 10 < n < 14.', 'Statement 1 alone is sufficient', 'Statement 2 alone is sufficient', 'Both statements together are needed', 'Neither statement is sufficient', 'D', 'Statement 1 alone: many primes possible, not unique. Statement 2 alone: n could be 11, 12, or 13, not unique. Combined: n could still be 11 or 13, both prime, so still not a single value. Neither statement, alone or together, is sufficient.'),
('Data Sufficiency', 'Hard', 'Is x > y? St 1: x - y = 4. St 2: x + y = 10.', 'Statement 1 alone is sufficient', 'Statement 2 alone is sufficient', 'Both needed', 'Neither', 'A', 'St 1: x - y = 4 > 0 implies x > y always. St 1 alone is sufficient.');