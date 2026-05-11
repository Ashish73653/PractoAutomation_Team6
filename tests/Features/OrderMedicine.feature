@medicine-order
Feature: Order medicine on Practo — end-to-end flow

  # Covers: login → search Pacimol → add to cart → change address → place order → payment gateway

  Background:
    Given the user navigates to "https://www.practo.com"
    And   the Practo homepage is loaded successfully

  Scenario: Complete end-to-end order flow for Pacimol on Practo
    When  the user navigates to the "<section>" section
    And   the user searches for "<name>" using Tab and Enter
    And   the user adds 5 strips of Pacimol to the cart
    # And   the user changes the delivery address to "Bangalore"
    And   the user clicks on Place Order
    Then  the payment gateway page should open with a valid order summary
    And   a screenshot of the payment gateway page is captured

    Examples:
        | section        | name                       |
        | Order Medicine | PACIMOL ACTIVE Tablet 10`S |