import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Filter from "../components/Filter";
import { getTodos } from "../API";

describe("Test search filter", () => {
  const handleFilterMock = (e: React.ChangeEvent<HTMLInputElement>): void => {};
  it("Filter todo", () => {
    const testInput = "testing1234";
    const { getByTestId } = render(
      <Filter value={testInput} handleFilter={handleFilterMock} />
    );
    const input = getByTestId("input-filter");
    fireEvent.change(input, { target: { value: testInput } });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(testInput);
  });
});

describe("Test endpoint getTodo", () => {
  it("The getTodo request has succeeded", async () => {
    const todos = getTodos();
    await waitFor(() => todos);
    expect((await todos).status).toBe(200);
  });
});
