Feature: Book Clinic Visit

  Scenario Outline: User books a clinic visit successfully

    Given user opens the application URL "<URL>"

    When user clicks on location selector

    And user enters location "<LocationName>"

    And user selects location "<LocationName>" from suggestion list

    And user clicks on hospital search bar

    And user clears content of hospital search bar

    And user enters hospital name "<HospitalName>"

    And user selects hospital "<HospitalName>" from suggestion list

    And user clicks on Doctors tab

    And user clicks on speciality and selects "<SpecialityName>"

    And user clicks on Book Clinic Visit button

    And user clicks on Tomorrow tab

    And user selects first slot from the time slots section

    And user takes screenshot of the details page of that Doctors "<ScreenshotName>"

    Then user should be able to see enabled Confirm Clinic Visit button

    Examples:
      | URL                    | LocationName | HospitalName    | SpecialityName | ScreenshotName        |
      | https://www.practo.com | Mohali       | Fortis Hospital | Dermatologist  | clinic_visit_page.png |