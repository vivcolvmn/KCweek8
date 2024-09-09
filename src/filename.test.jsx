import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import Header from './components/header';
import Item from './components/item';

// Test if Header component is rendered correctly
describe('Header Component', () => {
  it('renders Header component correctly', () => {
    render(<Header />);
    expect(screen.getByText('Hello Techtonica!')).toBeTruthy();
    expect(screen.getByText('This is a Gratitud List')).toBeTruthy();
  });
});

// Test if Item component renders items correctly
describe('Item Component', () => {
  it('renders Item component correctly', () => {
    const testItem = { text: "Be grateful for coding" };
    render(<Item item={testItem} />);
    expect(screen.getByText('Be grateful for coding')).toBeTruthy();
  });
});

// Test if Form component works as expected (adding an item)
describe('App Component - Form Behavior', () => {
  it('adds item when Form is submitted', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Enter an item');
    const submitButton = screen.getByText('Submit');

    // Simulate typing and submitting the form
    fireEvent.change(input, { target: { value: 'Learn React Testing' } });
    fireEvent.click(submitButton);

    // Check if the item was added
    expect(screen.getByText('Learn React Testing')).toBeTruthy();
  });

  test('does not add item if input is empty', () => {
    // Render the App component
    render(<App />);

    // Find the submit button
    const submitButton = screen.getByText('Submit');

    // Simulate clicking the submit button with an empty input
    fireEvent.click(submitButton);

    // Check if the list of items has not been updated
    const items = screen.queryAllByTestId('item');
    expect(items).toHaveLength(0);
  });
});
