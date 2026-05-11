Feature: Forgot Password Functionality

  @ForgotPassword
  Scenario Outline: Perform forgot password functionality
    Given I am on the Practo Login Page
    When I click on the forgot password link
    And I enter the registered mobile number "<mobileNumber>"
    And I click the Send me instructions button
    And I enter the OTP that I received
    And I click on Login Button
    And I write the New Password "<newPassword>"
    And I write the confirm New Password "<confirmNewPassword>"
    And I click the Change Password button
    Then I should see the message "Password updated successfully"

    Examples:
      | mobileNumber | newPassword | confirmNewPassword |
      | 6396916975   | PractoDummy@1234  | PractoDummy@1234 |