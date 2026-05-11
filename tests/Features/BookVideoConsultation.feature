Feature: Video Consultation Booking

  Scenario Outline: User books a video consultation successfully with authenticated session

    Given user opens the application URL "<URL>"

    When user clicks on video consultation

    And user clicks on "See All Speciality"

    And user enters symptom or health problem "<Symptom>"

    And user selects speciality "<Speciality>"

    And user clicks on Continue button

    And user clicks on Continue to Payment button

    And user enters card holder name "<CardHolderName>"
    And user enters debit card number "<CardNumber>"
    And user enters expiry month "<ExpiryMonth>"
    And user enters CVV "<CVV>"

    Then user should be able to proceed successfully

    And take screenshot "<ScreenshotName>"

    Examples:
      | URL                    | Symptom | Speciality        | CardHolderName | CardNumber       | ExpiryMonth | CVV | ScreenshotName            |
      | https://www.practo.com | Fever   | General Physician | Ashish Singh   | 4111111111111111 | 12/2028     | 123 | video_consult_booking.png |