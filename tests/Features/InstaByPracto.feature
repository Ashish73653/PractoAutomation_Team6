@insta-demo
Feature: Insta by Practo Demo Registration

    Background:
        Given the user accesses the Practo application
        And the Practo landing screen is displayed properly

    Scenario Outline: Submit Insta by Practo demo registration form
        When the user navigates to Insta by Practo section
        And the user selects the Plans option
        And the user fills the demo form using "<dataKey>" data
        And the user submits the Get Free Demo form
        Then the form result should be validated based on "<dataKey>" data
        And the user captures screenshot of the demo confirmation page

        Examples:
            | dataKey     |
            | validData   |
            | invalidData |