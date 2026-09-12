-- To change this live, edit line 6 onwards in seed_part1.sql
-- Returns: Seed rows for Topics 1 to 5 (Percentages, Profit/Loss, Interest, Speed/Distance, Work)
INSERT INTO questions (topic, difficulty, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
('Percentages', 'Easy', 'What is 20% of 450?', '80', '90', '100', '95', 'B', '20% of 450 = (20/100) * 450 = 90.'),
('Percentages', 'Medium', 'If price increases by 25%, by what % must consumption decrease to keep expenditure constant?', '15%', '20%', '25%', '30%', 'B', 'Formula: (r / (100+r)) * 100 = (25/125)*100 = 20%.'),
('Percentages', 'Hard', 'A population increases by 10% in Year 1 and decreases by 10% in Year 2. What is the net percentage change?', '0%', '1% increase', '1% decrease', '2% decrease', 'C', 'Net % change = +10 - 10 - (10*10)/100 = -1% (1% decrease).'),

('Profit, Loss & Discount', 'Easy', 'Cost Price is Rs. 400 and Selling Price is Rs. 480. What is the profit percentage?', '15%', '20%', '25%', '30%', 'B', 'Profit = 480 - 400 = 80. Profit % = (80/400)*100 = 20%.'),
('Profit, Loss & Discount', 'Medium', 'A trader marks goods 40% above cost and allows 15% discount. Find profit %.', '19%', '21%', '25%', '18%', 'A', 'Net Profit % = 40 - 15 - (40*15)/100 = 25 - 6 = 19%.'),
('Profit, Loss & Discount', 'Hard', 'If 12 items are sold for the cost price of 15 items, what is the profit percentage?', '20%', '25%', '30%', '33.33%', 'B', 'Profit % = ((15 - 12)/12)*100 = (3/12)*100 = 25%.'),

('Simple & Compound Interest', 'Easy', 'Find Simple Interest on Rs. 5000 at 10% p.a. for 2 years.', 'Rs. 800', 'Rs. 1000', 'Rs. 1200', 'Rs. 1500', 'B', 'SI = (P * R * T)/100 = (5000 * 10 * 2)/100 = Rs. 1000.'),
('Simple & Compound Interest', 'Medium', 'Find Compound Interest on Rs. 10000 at 10% p.a. for 2 years compounded annually.', 'Rs. 2100', 'Rs. 2000', 'Rs. 2200', 'Rs. 2500', 'A', 'Amount = 10000*(1.1)^2 = 12100. CI = 12100 - 10000 = Rs. 2100.'),
('Simple & Compound Interest', 'Hard', 'Difference between CI and SI on a sum for 2 years at 5% p.a. is Rs. 25. Find the sum.', 'Rs. 8000', 'Rs. 10000', 'Rs. 12000', 'Rs. 15000', 'B', 'Diff = P*(R/100)^2 => 25 = P*(5/100)^2 => P = 25 * 400 = Rs. 10000.'),

('Time, Speed & Distance', 'Easy', 'A car travels 180 km in 3 hours. What is its speed in km/h?', '50 km/h', '60 km/h', '70 km/h', '80 km/h', 'B', 'Speed = Distance / Time = 180 / 3 = 60 km/h.'),
('Time, Speed & Distance', 'Medium', 'Convert 72 km/h into metres per second (m/s).', '15 m/s', '20 m/s', '25 m/s', '30 m/s', 'B', '72 * (5/18) = 4 * 5 = 20 m/s.'),
('Time, Speed & Distance', 'Hard', 'Two trains 100m and 150m long run in opposite directions at 40 km/h and 50 km/h. Time to cross?', '8 seconds', '10 seconds', '12 seconds', '15 seconds', 'B', 'Total D = 250m. Relative Speed = 90 km/h = 25 m/s. Time = 250/25 = 10 sec.'),

('Time & Work', 'Easy', 'A can finish work in 10 days, B in 15 days. Working together, days needed?', '5 days', '6 days', '7.5 days', '8 days', 'B', 'Combined rate = 1/10 + 1/15 = 5/30 = 1/6. Days = 6.'),
('Time & Work', 'Medium', 'A is twice as efficient as B. Together they finish work in 12 days. Days for A alone?', '18 days', '24 days', '36 days', '30 days', 'A', 'Rate ratio A:B = 2:1. Total rate = 3x. 3x * 12 = 36 work. A alone = 36/2 = 18 days.'),
('Time & Work', 'Hard', '10 men can complete a job in 12 days. How many men complete it in 8 days?', '12 men', '15 men', '18 men', '20 men', 'B', 'M1 * D1 = M2 * D2 => 10 * 12 = M2 * 8 => M2 = 120 / 8 = 15 men.');
