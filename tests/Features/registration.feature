Feature: User Registration

  @Registration
  Scenario Outline: Register with valid and invalid user details
    Given I am on the Practo Registration page
    When I enter registration details "<fullName>", "<mobileNumber>" and "<password>"
    And I click the Send OTP button
    Then I should see "<expectedResult>" for registration

    Examples:
      | fullName         | mobileNumber | password      | expectedResult   |
      | Practo Test User | 9999999999   | Practo@12345  | OTP Sent         |
      |                  |              |               | Validation Error |
