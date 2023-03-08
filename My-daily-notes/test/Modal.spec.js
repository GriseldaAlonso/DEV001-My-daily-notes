import Modal from "../src/components/Modal"
import React from "react";
import { render, screen } from "@testing-library/react"

describe('Modal', () => {
    it('deberia renderizar Modal pero este no debería estar presente en el documento', () => {
        render(<Modal />);
        const dialog = screen.queryByRole('dialog');
        expect(dialog).toBeNull();
    });
});