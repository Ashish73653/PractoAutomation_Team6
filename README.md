# Practo Automation Testing Scenarios

## Project Overview

This document contains end-to-end automation testing scenarios for the Practo application using:

- Playwright
- BDD Cucumber Framework
- Data Driven Testing (DDT)

The framework executes both valid and invalid test data within the same scenario using Scenario Outline and Examples.

---

# Modules Covered

1. Registration
2. Login
3. Find Doctor
4. Consult with Doctor
5. Lab Tests
6. Health Feed
7. Medicine Ordering
8. Footer Validation
9. Help and Support

---

# 1. Registration Scenarios

## Scenario: Register User with Valid and Invalid Inputs

### Flow

1. Navigate to registration page
2. Enter user details from Examples table
3. Submit registration form
4. Validate expected result based on test data

### Test Type

- BDD Cucumber
- Data Driven Testing (DDT)

### Validation

- Successful registration for valid data
- Validation messages for invalid data

### Example Data

| Name         | Email               | Password | Expected Result  |
| ------------ | ------------------- | -------- | ---------------- |
| Valid User   | validuser@gmail.com | Test@123 | Success          |
| Invalid User | invalidgmail.com    | 123      | Validation Error |

---

# 2. Login Scenarios

## Scenario: Login with Valid Credentials

### Flow

1. Navigate to login page
2. Enter credentials from Examples table
3. Click login
4. Verify expected result

### Test Type

- BDD Cucumber
- Data Driven Testing (DDT)

### Validation

- Successful login for valid credentials

### Example Data

| Email               | Password | Expected Result |
| ------------------- | -------- | --------------- |
| validuser@gmail.com | Test@123 | Success         |

---

# 3. Find Doctor Scenarios

## Scenario 1: Search Doctor Using Speciality and Filters

### Flow

1. Login to application
2. Navigate to Find Doctor
3. Apply address filter
4. Search doctor via speciality
5. Select female gender filter
6. Select experience above 5 years
7. Sort consultation fee low to high
8. Select first doctor
9. Log doctor details
10. Capture screenshot

### Validation

- Proper doctor listing should appear
- Filters should work correctly

---

## Scenario 2: Search Doctor Using Hospital Name

### Flow

1. Login to application
2. Navigate to Find Doctor
3. Apply address filter
4. Search hospital name "Apollo Clinic"
5. Select first doctor
6. Open doctor profile
7. Log doctor details
8. Capture screenshot

### Validation

- Doctor profile should open successfully

---

# 4. Consult with Doctor Scenarios

## Scenario: Book Video Consultation

### Flow

1. Login to application
2. Click on Video Consult
3. Open all specialities
4. Fill consultation details
5. Choose relevant speciality
6. Continue booking
7. Proceed to payment
8. Enter debit card details
9. Capture screenshot

### Validation

- Consultation flow should complete successfully

---

# 5. Lab Test Scenarios

## Scenario 1: Book Lipid Test

### Flow

1. Login to application
2. Navigate to Lab Tests
3. Select Chandigarh location
4. Search Lipid Test
5. Add to cart
6. Capture cart screenshot
7. Proceed to checkout
8. Fill all forms
9. Deny location permission
10. Use Indiranagar manually
11. Enter debit card details
12. Capture screenshot

### Validation

- Test booking flow should work correctly

---

## Scenario 2: Add Multiple Top Booked Tests

### Flow

1. Login to application
2. Navigate to Lab Tests
3. Add multiple tests to cart
4. Capture cart screenshot
5. Proceed to checkout
6. Fill all forms
7. Deny location permission
8. Use Indiranagar manually
9. Enter debit card details
10. Capture screenshot

### Validation

- Multiple tests should be added successfully

---

# 6. Health Feed Scenarios

## Scenario 1: Search and Like Health Article

### Flow

1. Navigate to home page
2. Open health articles section
3. Click See All Articles
4. Search Weight Loss
5. Open 5th article
6. Like article
7. Log article title and doctor name

### Validation

- Article should open successfully
- Like functionality should work

---

## Scenario 2: Follow Healthy Skin Topic

### Flow

1. Login to application
2. Navigate to Health Feed
3. Open Healthy Skin topic
4. Follow topic
5. Navigate to For You tab
6. Log 6th article details

### Validation

- Topic follow functionality should work

---

# 7. Medicine Ordering Scenarios

## Scenario: Order Medicine

### Flow

1. Login to application
2. Search Pacimol
3. Press Tab + Enter
4. Add 2 strips to cart
5. Change address to Bangalore
6. Place order
7. Capture payment gateway screenshot

### Validation

- Medicine should be added successfully
- Payment page should open correctly

---

# 8. Footer Validation

## Scenario: Validate Footer Links

### Flow

1. Navigate through footer links
2. Verify all links
3. Validate redirections
4. Check for broken links

### Validation

- All footer links should work properly

---

# 9. Help and Support Scenarios

## Scenario 1: Submit Contact Us Form

### Flow

1. Navigate to Security
2. Open Help section
3. Open Contact Us
4. Fill form
5. Submit form

### Validation

- Form submission should succeed

---

## Scenario 2: Search Help Question

### Flow

1. Navigate to Security
2. Open Help section
3. Search Consultation
4. Open 4th result
5. Capture screenshot

### Validation

- Relevant help article should open successfully

---

# Automation Notes

- Framework: Playwright + Cucumber BDD
- Language: JavaScript
- Design Pattern: Page Object Model (POM)
- Data Driven Testing implemented using Scenario Outline and Examples
- Screenshots captured for important validations
- Logging implemented for doctor details, article details, and payment pages
- Explicit waits and assertions should be used throughout automation

---

# Team Scenario Allocation

| Team Member      | Assigned Scenarios                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| Pavitra Sharma   | 1. Registration with Valid & Invalid Inputs <br> 2. Login with Valid Credentials <br> 3. Footer Validation     |
| Puneet Thapliyal | 1. Find Doctor Using Speciality & Filters <br> 2. Find Doctor Using Hospital Name <br> 3. Search Help Question |
| Ashish Singh     | 1. Book Video Consultation <br> 2. Book Lipid Test <br> 3. Add Multiple Top Booked Tests                       |
| Abhishek gargya  | 1. Search and Like Health Article <br> 2. Follow Healthy Skin Topic <br> 3. Order Medicine                     |

---

# Unallocated Scenario

- Submit Contact Us Form
