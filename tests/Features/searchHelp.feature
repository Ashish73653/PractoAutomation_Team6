Feature: searchHelp

  @searchHelp
  Scenario Outline: search for queries in the help section and verify the results

     Given Navigate to "<url>"
     When click on Help
     And click on search field in the help section
     And fill search  with "<searchQuery>"
     And select the second result from the search results
     And click on the selected result

     Then Verify that the selected result is relevant to the search query by taking a screenshot of the result page

    Examples:
      | url                     | searchQuery |
      | https://www.practo.com/ | profile     |