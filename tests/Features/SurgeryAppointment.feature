@surgery-appointment
Feature: Surgery Appointment Booking
    # Covers: search surgery → fill details → book appointment → verify popup

    Background:
        Given the user opens the Practo website
        And the Practo landing page is displayed successfully

    Scenario Outline: Book a surgery appointment on Practo
        When the user opens the Surgeries category
        And the user chooses city as "<city>"
        And the user chooses ailment as "<ailment>"
        And the user enters patient name as "<username>"
        And the user enters phone number as "<mobile>"
        And the user clicks the Book Appointment button
        Then the booking confirmation popup should appear
        And a screenshot of the booking confirmation is captured

        Examples:
            | city      | ailment          | username    | mobile     |
            | Bangalore | Knee Replacement | Random Name | 9876543210 |