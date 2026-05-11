Feature: Footer Smoke Testing

  @FooterSmoke
  Scenario: Validate Practo footer sections and important links
    Given I am on the Practo home page for footer smoke testing
    When I scroll to the Practo footer
    Then I should see all major footer sections
    And I should see important footer links
    And the Contact Us footer link should open the contact page
