Feature: searchHelp

  @searchHelp
  Scenario: search for queries in the help section and verify the results

    Given Navigate to url
    When click on Help
    And click on search field in the help section
    And fill search with search query
    And select the second result from the search results
    And click on the selected result

    Then Verify that the selected result is relevant to the search query by taking a screenshot of the result page

  @searchHelp
  Scenario: search for an empty query in the help section

    Given Navigate to url
    When click on Help
    And click on search field in the help section
    And fill search with empty search query
    And submit the help search

    Then I should see expected result for help search

    
    