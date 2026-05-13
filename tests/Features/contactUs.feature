Feature: Contact Us Form

  @ContactUs
  Scenario Outline: Submit the Practo contact us form
    Given I open the Practo Help page from Security and help
    When I open the Contact Us form
    And I fill the contact us form with "<name>", "<mobileNumber>", "<email>", "<country>", "<city>", "<interestedIn>", "<ownsClinic>", "<userType>" and "<message>"
    And I submit the contact us form
    Then the contact us submit attempt should be captured

    Examples:
      | name        | mobileNumber | email                 | country | city  | interestedIn                         | ownsClinic | userType | message                                  |
      | Test Doctor | 9876543210   | practotest@example.com | India   | Delhi | Software to manage my hospital(s)    | No         | Doctor   | Please contact me for Practo assistance. |
      