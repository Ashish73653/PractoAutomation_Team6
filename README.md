# Practo Automation Testing Scenarios

## Project Overview

This document contains end-to-end automation testing scenarios for the Practo application using:

- Playwright
- Cucumber Framework
- Data Driven Testing (DDT)

The framework executes both valid and invalid test data within the same scenario using Scenario Outline and Examples.

---

# Modules Covered

1. Registration
2. Login
3. Forgot Password
4. Find Doctor
5. Consult with Doctor
6. Lab Tests
7. Health Feed
8. Medicine Ordering
9. Footer Validation
10. Help and Support
11. Surgery Appointment
12. Contact Us
13. Insta by Practo
14. Book Clinic Visit via Searching Hospital Name and Speciality

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

| Name           | Email                | Password | Expected Result  |
| -------------- | -------------------- | -------- | ---------------- |
| Valid User 1   | validuser1@gmail.com | Test@123 | Success          |
| Valid User 2   | validuser2@gmail.com | Pass@123 | Success          |
| Invalid User 1 | invalidgmail.com     | 123      | Validation Error |
| Invalid User 2 | test@.com            | pass     | Validation Error |

---

# 2. Login Scenarios

## Scenario: Login with Valid and Invalid Credentials

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
- Proper validation for invalid credentials

### Example Data

| Email                 | Password | Expected Result |
| --------------------- | -------- | --------------- |
| validuser1@gmail.com  | Test@123 | Success         |
| validuser2@gmail.com  | Pass@123 | Success         |
| invaliduser@gmail.com | wrong123 | Error Message   |
| test@gmail.com        | 12345    | Error Message   |

---

# 3. Forgot Password Scenarios

## Scenario: Reset Password Using Registered Mobile Number or Email

### Flow

1. Navigate to login page
2. Click on Forgot Password
3. Enter registered mobile number or email
4. Click on Send Instructions
5. Enter OTP received
6. Enter new password
7. Confirm new password
8. Click on Change Password

### Validation

- Password should be updated successfully
- User should be able to login using new password

---

# 4. Find Doctor Scenarios

## Scenario 1: Search Doctor Using Speciality and Filters with Appointment Booking

### Flow

1. Login to application
2. Navigate to Find Doctor
3. Apply address filter
4. Search doctor via speciality
5. Select female gender filter
6. Select experience above 5 years
7. Sort consultation fee low to high
8. Select first doctor
9. Book appointment
10. Select available timeslot
11. Enter mobile number
12. Enter OTP
13. Continue booking

### Validation

- Doctor appointment booking flow should complete successfully

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

# 5. Consult with Doctor Scenarios

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

- Consultation booking flow should complete successfully

---

# 6. Lab Test Scenarios

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

- Test booking flow should work successfully

---

## Scenario 2: Add Multiple Top Booked Tests

### Flow

1. Login to application
2. Navigate to Lab Tests
3. Add multiple top booked tests to cart
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

# 7. Health Feed Scenarios

## Scenario: Health Feed Article Search and Topic Follow

### Flow

1. Navigate to home page
2. Scroll to "Read top articles from health experts"
3. Click on See All Articles
4. Search Weight Loss
5. Open 5th article
6. Click Like
7. Log article title and doctor name
8. Navigate back to articles section
9. Open Healthy Skin topic
10. Follow topic
11. Navigate to For You tab
12. Log 6th article details

### Validation

- Article should open successfully
- Like functionality should work properly
- Healthy Skin topic should be followed successfully
- Personalized articles should appear in For You section

---

# 8. Medicine Ordering Scenarios

## Scenario: Order Medicine

### Flow

1. Login to application
2. Search Pacimol
3. Press Tab + Enter
4. Add 2 strips to cart
5. Change address to Bangalore
6. Place order
7. Capture screenshot of payment gateway

### Validation

- Medicine should be added successfully
- Payment page should open correctly

---

# 9. Footer Validation

## Scenario: Validate Footer Links

### Flow

1. Navigate through footer links
2. Verify all links
3. Validate redirections
4. Check for broken links

### Validation

- All footer links should work properly

---

# 10. Help and Support Scenarios

## Scenario 1: Submit Contact Us Form from Help Section

### Flow

1. Navigate to Security
2. Open Help section
3. Open Contact Us
4. Fill form
5. Submit form

### Validation

- Form should submit successfully

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

## Scenario 3: Search Invalid Help Question

### Flow

1. Navigate to Security
2. Open Help section
3. Search invalid help keyword
4. Observe search results

### Validation

- No relevant help article should be displayed
- “No results found” message should be displayed successfully

---

# 11. Surgery Appointment Scenarios

## Scenario: Book Surgery Appointment

### Flow

1. Open Practo Surgery booking page
2. Select city as Bangalore
3. Select ailment as Knee Replacement
4. Enter patient name
5. Enter contact number
6. Click on Book Appointment

### Validation

- Surgery appointment request should be submitted successfully

---

# 12. Contact Us Scenarios

## Scenario 1: Submit Contact Us Form

### Flow

1. Open Contact Us page
2. Select "Software to manage my hospital(s)" from Interested In dropdown
3. Enter name
4. Enter mobile number
5. Enter email address
6. Verify country is India
7. Enter city as Delhi
8. Enter message
9. Click Submit

### Validation

- Contact request should be submitted successfully

---

## Scenario 2: Submit Contact Form with Empty Name Field

### Flow

1. Open Contact Us page
2. Select "Software to manage my hospital(s)" from Interested In dropdown
3. Leave name field empty
4. Enter mobile number
5. Enter email address
6. Verify country is India
7. Enter city as Delhi
8. Enter message
9. Click Submit

### Validation

- Validation message for name field should be displayed
- Form should not be submitted successfully

---

## Scenario 3: Submit Contact Form with Invalid Mobile Number

### Flow

1. Open Contact Us page
2. Select "Software to manage my hospital(s)" from Interested In dropdown
3. Enter name
4. Enter mobile number with less than 10 digits
5. Enter email address
6. Verify country is India
7. Enter city as Delhi
8. Enter message
9. Click Submit

### Validation

- Validation message for invalid mobile number should be displayed
- Form should not be submitted successfully

---

# 13. Insta by Practo Scenarios

## Scenario: Get Free Demo

### Flow

1. Open Practo website
2. Click on Insta by Practo
3. Click on Select Plans
4. Enter required details:
   - Name
   - Email
   - Mobile Number
   - City
5. Click on Get Free Demo
6. Validate success message
7. Capture screenshot

### Validation

- Demo request should be submitted successfully
- Success message should be displayed

---

# 14. Book Clinic Visit via Searching Hospital Name and Speciality

## Scenario 1: Book Clinic Visit Successfully

### Flow

1. Open Practo website
2. Select location
3. Search and select hospital
4. Open Doctors tab
5. Select speciality
6. Click on Book Clinic Visit
7. Select Tomorrow tab
8. Choose first available slot
9. Capture screenshot
10. Validate Confirm Clinic Visit button

### Validation

- Hospital should be selected successfully
- Speciality filter should be applied
- Time slot should be selected successfully
- Confirm Clinic Visit button should be enabled

---

## Scenario 2: Validate Invalid Hospital Search

### Flow

1. Open Practo website
2. Select location
3. Click on hospital search bar
4. Enter invalid hospital name
5. Search for hospital
6. Observe search result message

### Validation

- Invalid hospital should not appear in suggestion list
- “We couldn't find any doctors for you” message should be displayed
- “didn't match anything” description should be displayed
- Book Clinic Visit option should not be visible

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

| Team Member      | Assigned Scenarios                                                                                                                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pavitra Sharma   | 1. Registration with Valid & Invalid Inputs <br> 2. Login with Valid & Invalid Credentials (Using Data Driven Testing JSON) <br> 3. Footer Validation <br> 4. Submit Contact Us Form from Help Section <br> 5. Forgot Password                               |
| Puneet Thapliyal | 1. Find Doctor Using Speciality & Filters <br> 2. Find Doctor Using Hospital Name <br> 3. Search Help Question (Using Data Driven Testing JSON) <br> 4. Health Feed Article Search and Topic Follow <br> 5. Search Invalid Help Question                     |
| Ashish Singh     | 1. Book Video Consultation (Using Data Driven Testing JSON) <br> 2. Book Lipid Test <br> 3. Add Multiple Top Booked Tests <br> 4. Book Clinic Visit via Searching Hospital Name and Speciality <br> 5. Validate Invalid Hospital Search                      |
| Abhishek Gargya  | 1. Order Medicine <br> 2. Surgery Appointment Scenario <br> 3. Submit Contact Us Form Page <br> 4. Insta by Practo (Using Data Driven Testing JSON) <br> 5. Submit Contact Form with Empty Name Field <br> 6. Submit Contact Form with Invalid Mobile Number |

---
