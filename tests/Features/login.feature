# Feature: User Login

# @Login

# Scenario Outline: Login with valid and Invalid Credentials
#     Given I am on the Practo Login page
#     When I enter "<mobileNumber>" and "<password>"
#     And I click the Remember me for 30 days checkbox
#     And I click the login button
#     Then I should see "<expectedResult>" for login

#     Examples:
#         | mobileNumber | password        | expectedResult |
#         | 6396916975 | PractoDummy@123  | Success        |

Feature: User Login

  @Login
  Scenario Outline: Login with valid and Invalid Credentials
    Given I am on the Practo Login page
    When I enter "<mobileNumber>" and "<password>"
    And I click the Remember me for 30 days checkbox
    And I click the login button
    Then I should see "<expectedResult>" for login

    Examples:
      | mobileNumber | password         | expectedResult |
      | 6396916975   | PractoDummy@1234 | Success        |