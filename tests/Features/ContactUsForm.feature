@contact-us
Feature: Submit Contact Us Form on Practo
    # Covers: open contact page → fill form → submit → validate success

    Background:
        Given the user launches the Practo website
        And the Practo homepage is displayed properly

    Scenario Outline: Submit Contact Us form successfully
        When the user opens the Contact Us page in a new tab
        And the user selects "<interest>" from Interested In dropdown
        And the user enters contact name as "<name>"
        And the user enters contact mobile number as "<mobile>"
        And the user enters contact email as "<email>"
        Then the country field should display "India"
        When the user enters city as "<city>"
        And the user enters message as "<message>"
        And the user clicks on the Submit button
        Then the contact request should be submitted successfully
        And a screenshot of the submitted contact form is captured

        Examples:
            | interest                          | name      | mobile     | email            | city  | message                         |
            | Software to manage my hospital(s) | Demo Name | 9876543210 | random@gmail.com | Delhi | I want software for my hospital |