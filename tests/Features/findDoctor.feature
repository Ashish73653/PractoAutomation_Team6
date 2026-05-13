Feature: findThenBook

  @findDoctor
  Scenario Outline: find speciality doctor Then book appointment with the doctor

    Given Navigate to "<url>"

    Then click on Find Doctor
    Then fill location as "<location>"
    Then fill speciality "<speciality>"
    Then search speciality "<speciality>"
    Then select Gender "<gender>"
    Then select Experience "<experience>"
    Then select Sort By "<sortBy>"
    Then select the first doctor
    Then click on Book Appointment
    Then Select first available time slot
    Then fill valid email address "<email>"
    Then disable the "whatsapp" notifications

    Then Verify by taking screenshot of the booking details appointment page

    Examples:
      | url                     | location  | speciality | gender | experience              | sortBy                           | email                |
      | https://www.practo.com/ | bangalore | Dentist     | Female | 5+ Years of experience | Consultation Fee - Low to High | testuser@gmail.com |