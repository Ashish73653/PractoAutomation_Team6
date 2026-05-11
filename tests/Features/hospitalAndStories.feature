Feature: Hospital search and story submission

  @hospitalAndStories
  Scenario Outline: Find doctor via hospital name and share visit story

    Given Navigate to "<url>"

    When click on Find Doctor
    And fill location as "<location>"
    And fill hospital name "<hospitalName>"
    And search hospital name
    And click on doctors
    And search field "<speciality>"
    And Search for dr name "<doctorName>"
    And click on view profile
    And click Share your story
    And click on recommend the doctor
    And fill the treatment for which you visited "<treatment>"
    And fill checkbox for How long you waited for doctor "<waitingTime>"
    And fill What were you most happy with "<happyWith>"
    And fill the experience with the doctor "<experience>"
    And click on keep my feedback story anonymous

    Then verify by taking screenshot of the form filled

    Examples:
      | url                     | location  | hospitalName | speciality   | doctorName          | treatment              | waitingTime | happyWith         | experience                                                |
      | https://www.practo.com/ | Bangalore | Apollo        | Pediatrician | Dr. Sumedha Gandotra | Treating Viral Fever | 15 Minutes  | Doctor friendliness | The doctor explained the treatment clearly and was helpful |