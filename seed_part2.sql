-- To change this live, edit line 6 onwards in seed_part2.sql
-- Returns: Seed rows for Topics 6 to 10 (Ratio, Averages, Number System, Permutations, Probability)
INSERT INTO questions (topic, difficulty, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
('Ratio, Proportion & Variation', 'Easy', 'If A:B = 2:3 and B:C = 4:5, what is A:B:C?', '8:12:15', '6:9:15', '8:10:15', '2:4:5', 'A', 'A:B:C = (2*4) : (3*4) : (3*5) = 8 : 12 : 15.'),
('Ratio, Proportion & Variation', 'Medium', 'Divide Rs. 700 among A, B, C in ratio 2:3:5. Share of B?', 'Rs. 140', 'Rs. 210', 'Rs. 350', 'Rs. 200', 'B', 'Total parts = 10. B share = (3/10) * 700 = Rs. 210.'),
('Ratio, Proportion & Variation', 'Hard', 'If x is directly proportional to y and x=12 when y=4, find x when y=7.', '18', '21', '24', '28', 'B', 'x = k*y => 12 = k*4 => k = 3. When y=7, x = 3*7 = 21.'),

('Averages', 'Easy', 'What is the average of 10, 20, 30, 40, and 50?', '25', '30', '35', '40', 'B', 'Sum = 150. Count = 5. Average = 150/5 = 30.'),
('Averages', 'Medium', 'Average age of 4 boys is 15 years. If a 25-year-old man joins, new average age?', '16 years', '17 years', '18 years', '19 years', 'B', 'Total sum = 4*15 + 25 = 85. New average = 85/5 = 17 years.'),
('Averages', 'Hard', 'Average run of a batsman in 10 innings is 50. How many runs in 11th inning to raise average to 52?', '60', '70', '72', '80', 'C', 'Required runs = (11 * 52) - (10 * 50) = 572 - 500 = 72.'),

('Number System', 'Easy', 'Which of the following is a prime number?', '21', '27', '29', '33', 'C', '29 has no factors other than 1 and 29.'),
('Number System', 'Medium', 'Find the HCF of 36 and 84.', '6', '12', '18', '24', 'B', '36 = 12 * 3, 84 = 12 * 7. Highest Common Factor = 12.'),
('Number System', 'Hard', 'What is the remainder when 2^31 is divided by 5?', '1', '2', '3', '4', 'C', '2^1=2, 2^2=4, 2^3=8(rem 3), 2^4=16(rem 1). Cycle = 4. 31 mod 4 = 3 => rem 3.'),

('Permutations & Combinations', 'Easy', 'In how many ways can the letters of the word "CAT" be arranged?', '3', '6', '9', '12', 'B', 'Number of arrangements = 3! = 3 * 2 * 1 = 6.'),
('Permutations & Combinations', 'Medium', 'Evaluate 5C2 (combinations of 5 taken 2 at a time).', '5', '10', '15', '20', 'B', '5C2 = (5 * 4) / (2 * 1) = 10.'),
('Permutations & Combinations', 'Hard', 'How many 3-digit numbers can be formed using digits 1, 2, 3, 4, 5 without repetition?', '20', '60', '120', '243', 'B', '5P3 = 5 * 4 * 3 = 60.'),

('Probability', 'Easy', 'What is the probability of getting a Head in a single toss of a fair coin?', '0', '1/4', '1/2', '1', 'C', 'Favorable outcomes = 1 (Head), Total outcomes = 2. P = 1/2.'),
('Probability', 'Medium', 'A fair die is rolled. What is the probability of getting an even number?', '1/6', '1/3', '1/2', '2/3', 'C', 'Even outcomes = {2, 4, 6} (3 total). P = 3/6 = 1/2.'),
('Probability', 'Hard', 'Two cards are drawn from a pack of 52. Probability that both are Kings?', '1/221', '1/169', '1/26', '4/663', 'A', 'Probability = (4/52) * (3/51) = (1/13) * (1/17) = 1/221.');
