Feature: Video Consultation Booking
  @BookVC
  Scenario: User books a video consultation successfully with authenticated session using JSON data

    Given I load video consultation test data with id "VideoConsult_001"
    And user opens the application URL "https://www.practo.com"
    When user clicks on video consultation
    And user clicks on "See All Speciality"
    And user enters symptom or health problem "Fever"
    And user selects speciality "General Physician"
    And user clicks on Continue button
    And user clicks on Continue to Payment button
    And user enters payment details from loaded data
    Then user should be able to proceed successfully
    And take screenshot from loaded data