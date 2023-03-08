import ShowNotes from "../src/components/StickNotes"
import React from "react";
import { render, screen } from "@testing-library/react"

jest.mock("../src/context/userContext")

describe("ShowNotes", () => {
    it("Debería renderizar ShowNotes", () => {
        render(<ShowNotes />);
        const ul = screen.getByRole("listitem")
    });
});