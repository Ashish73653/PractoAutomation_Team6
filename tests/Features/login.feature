# # # Feature: User Login

# # # @Login

# # # Scenario Outline: Login with valid and Invalid Credentials
# # #     Given I am on the Practo Login page
# # #     When I enter "<mobileNumber>" and "<password>"
# # #     And I click the Remember me for 30 days checkbox
# # #     And I click the login button
# # #     Then I should see "<expectedResult>" for login

# # #     Examples:
# # #         | mobileNumber | password        | expectedResult |
# # #         | 6396916975 | PractoDummy@123  | Success        |

# # Feature: User Login

# #   @Login
# #   Scenario Outline: Login with valid and Invalid Credentials
# #     Given I am on the Practo Login page
# #     When I enter "<mobileNumber>" and "<password>"
# #     And I click the Remember me for 30 days checkbox
# #     And I click the login button
# #     Then I should see "<expectedResult>" for login

# #     Examples:
# #       | mobileNumber | password         | expectedResult |
# #       | 6396916975   | PractoDummy@1234 | Success        |

# Feature: User Login

#   @Login
#   Scenario Outline: Login with valid and Invalid Credentials
#     Given I am on the Practo Login page
#     When I enter "<mobileNumber>" and "<password>"
#     And I click the Remember me for 30 days checkbox
#     And I click the login button
#     Then I should see "<expectedResult>" for login

#     @Positive
#     Examples:
#        | mobileNumber | password         | expectedResult |
#       | 6396916975   | PractoDummy@1234 | Success        |

#     @Negative
#     Examples:
#       | mobileNumber   | password  | expectedResult |
#       | 6396916975     | Wrong@999 | Failure        |
#       | nobody@xyz.com | Any@123   | Failure        |
#       |                | Valid@123 | Failure        |
#       | user@test.com  |           | Failure        |
#       |                |           | Failure        |
#       | usertestcom    | Valid@123 | Failure        |
#       | 98765          | Valid@123 | Failure        |
Feature: User Login

  @Login @Positive
  Scenario: Login with valid credentials from JSON
    Given I have login test data for "valid" cases
    When I execute the login test cases
    Then each login result should match the expected result

  @Login @Negative
  Scenario: Login with invalid credentials from JSON
    Given I have login test data for "invalid" cases
    When I execute the login test cases
    Then each login result should match the expected result
