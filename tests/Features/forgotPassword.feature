Feature: Forgot Password Functionality

  @ForgotPassword
  Scenario Outline: Request forgot password instructions
    Given I am on the Practo Login Page
    When I click on the forgot password link
    And I enter the registered mobile number "<mobileNumber>"
    And I click the Send me instructions button
    Then I should see the captcha challenge for password reset

    Examples:
      | mobileNumber |
      | 6396916975   |