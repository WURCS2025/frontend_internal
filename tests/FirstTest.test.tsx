import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';         // ✅ Import required
import React from 'react';

import FirstTest from '../src/components/FirstTest'

test("Example 1 renders successfully", () => {
    render(<FirstTest/>);

    const element = screen.getByText(/first test/i);

    expect(element).toBeInTheDocument();
})