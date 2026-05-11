@insta-demo
Feature: Insta by Practo Demo Registration

    Background:
        Given the user accesses the Practo application
        And the Practo landing screen is displayed properly

    Scenario Outline: Submit Insta by Practo demo registration form
        When the user navigates to Insta by Practo section
        And the user selects the Plans option
        And the user provides demo username as "<name>"
        And the user provides demo email address as "<email>"
        And the user provides demo phone number as "<mobile>"
        And the user provides demo city name as "<city>"
        And the user submits the Get Free Demo form
        Then the Insta by Practo demo form should be submitted successfully
        And the demo success confirmation message should appear
        And the user captures screenshot of the demo confirmation page

        Examples:
            | name      | email          | mobile     | city  |
            | Demo User | demo@gmail.com | 9876543210 | Delhi |