Feature: Lab Test Booking and Payment

  Scenario Outline: User books a lab test successfully

    Given user opens the application URL "<URL>"

    When user clicks on "Lab Tests"

    And user is on "Lab Tests" page just click escape key to close any location popups

    And user clicks on search tests input

    And user enters lab test name "<LabTestName>"

    And user presses Enter key

    And user clicks on Add to Cart button

    And user takes screenshot of cart "<CartScreenshot>"

    And user clicks on Proceed to Checkout button

    And user enters date of birth "<DateOfBirth>"

    And user selects gender as "<Gender>"

    And user enters email id "<Email>"

    And user clicks on Continue button

    And user clicks on Continue button for selected address

    And user selects first time slot "<TimeSlot>"

    And user clicks on Pay Now button

    And user enters card holder name "<CardHolderName>"

    And user enters debit card number "<CardNumber>"

    And user enters expiry month "<ExpiryMonth>"

    And user enters CVV "<CVV>"

    Then user should be able to proceed successfully

    And take screenshot "<ScreenshotName>"

    Examples:
      | URL                    | LabTestName | CartScreenshot | DateOfBirth | Gender | Email              | TimeSlot          | CardHolderName | CardNumber       | ExpiryMonth | CVV | ScreenshotName       |
      | https://www.practo.com | Lipid Test  | cart_page.png  | 25          | Male   | testuser@gmail.com | 06:00 AM-06:30 AM | Ashish Singh   | 4111111111111111 | 12/28       | 123 | lab_test_booking.png |