@contact-us-form
Feature: Submit Contact Us Form on Practo
    # Covers: open contact page → complete form → submit → verify confirmation / validation errors

    Background:
        Given the user opens the Practo site
        And the Practo homepage loads successfully

    # POSITIVE TEST CASES
    Scenario Outline: Successfully submit the Contact Us form with valid details
        When the user navigates to the Contact Us page in a separate tab
        And the user chooses "<interest>" from the Interested In dropdown menu
        And the user enters "<name>" into the Name field
        And the user enters "<mobile>" into the Mobile Number field
        And the user enters "<email>" into the Email field
        Then the Country field should be auto-filled with "India"
        When the user enters "<city>" into the City field
        And the user enters "<message>" into the Message field
        And the user clicks the Submit button
        Then the Contact Us form should be submitted successfully
        And the user captures a screenshot of the successful submission

        Examples:
            | interest                                      | name      | mobile     | email              | city      | message                           |
            | Software to manage my hospital(s)             | Demo Name | 9876543210 | random@gmail.com   | Delhi     | I want software for my hospital   |
            | Software to manage my hospital(s)             | Test User | 9845012345 | testuser@yahoo.com | Bangalore | I want a free trial for my clinic |

    # NEGATIVE TEST CASES
    Scenario Outline: Display validation errors when the Contact Us form is submitted with invalid details
        When the user navigates to the Contact Us page in a separate tab
        And the user chooses "<interest>" from the Interested In dropdown menu
        And the user enters "<name>" into the Name field
        And the user enters "<mobile>" into the Mobile Number field
        And the user enters "<email>" into the Email field
        Then the Country field should be auto-filled with "India"
        When the user enters "<city>" into the City field
        And the user enters "<message>" into the Message field
        And the user clicks the Submit button
        Then the Contact Us form should not be submitted
        And the user should see the validation error "<error_message>"
        And the user captures a screenshot of the validation error

        Examples:
            | interest                          | name      | mobile     | email            | city  | message                         | error_message                      |
            | Software to manage my hospital(s) |           | 9876543210 | random@gmail.com | Delhi | I want software for my hospital | Name field is required             |
            | Software to manage my hospital(s) | Demo Name | 98765      | randomgmail.com  | Delhi | I want software for my hospital | Please enter a valid email address |