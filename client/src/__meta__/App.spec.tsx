import { render, screen } from "@testing-library/react";
import { contacts, additionalFields } from "./mockData";
import * as helpers from "../helpers";
import { App } from "../App";

const mockFetchData = jest.spyOn(helpers, "fetchData");

describe("App", () => {
  describe("filterContactsBySearchTerm", () => {
    const { filterContactsBySearchTerm } = helpers;

    it("should filter by first name, by last name and by parsed name", () => {
      const expectedResults = {
        Ji: ["0", "1"],
        Kim: ["2"],
        Hamlin: ["3"],
        "Kim Wex": ["2"],
        Jimmm: [],
      };

      Object.entries(expectedResults).forEach(
        ([searchFilter, expectedResult]) => {
          const actualResult = filterContactsBySearchTerm({
            contacts,
            searchFilter,
          }).map((contact) => contact.id);

          expect(actualResult).toEqual(expectedResult);
        }
      );
    });

    it("should ignore casing", () => {
      const expectedResults = {
        how: ["3"],
        HoW: ["3"],
      };

      Object.entries(expectedResults).forEach(
        ([searchFilter, expectedResult]) => {
          const actualResult = filterContactsBySearchTerm({
            contacts,
            searchFilter,
          }).map((contact) => contact.id);

          expect(actualResult).toEqual(expectedResult);
        }
      );
    });
  });

  describe("render", () => {
    beforeEach(() => {
      mockFetchData.mockResolvedValue({ contacts, additionalFields });
    });
    it("should render list of contacts", async () => {
      render(<App />);

      const renderedContactCardIds = (
        await screen.findAllByTestId("contactCard")
      ).map((contactCardElement) => contactCardElement.id);

      const mockDataIds = contacts.map((contact) => contact.id);

      expect(renderedContactCardIds).toEqual(mockDataIds);
    });
  });
});
