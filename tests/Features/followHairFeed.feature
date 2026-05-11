Feature: followHairFeed

  @followHairFeed
  Scenario Outline: Follow hair care feed and verify updates

    Given Navigate to "<url>"
    When click on "<articleSection>"
    And click on search for any heath topic
    And fill search field with "<searchTopic>"
    And select the first feed from the search results
    And click on like button of the field
    And click on "<feedCategory>"
    And click on follow button of the "<feedCategory>" feed

    Then Verify that the feed is followed by checking for updates in the feed

    Examples:
      | url                     | articleSection  | searchTopic | feedCategory |
      | https://www.practo.com/ | See all articles | hairfall    | Hair Care    |