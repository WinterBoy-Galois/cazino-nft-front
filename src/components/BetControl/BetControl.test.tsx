import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BetControl from '.';

describe('BetControl', () => {
  it('should render', () => {
    // Arrange

    // Act
    const { container } = render(<BetControl />);

    // Assert
    expect(container).toMatchSnapshot();
  });

  it('should display 5', () => {
    // Arrange
    render(<BetControl value={5} decimalPlaces={0} />);

    // Act

    // Assert
    expect(screen.getByTestId('value')).toHaveValue('5');
  });

  xit('should display 1 for min 1', () => {
    // Arrange
    render(<BetControl value={0} min={1} />);

    // Act

    // Assert
    expect(screen.getByTestId('value')).toHaveValue('1');
  });

  xit('should display 5 for max 5', () => {
    // Arrange
    render(<BetControl value={10} max={5} />);

    // Act

    // Assert
    expect(screen.getByTestId('value')).toHaveValue('5');
  });

  it('should not call onChange value < min', () => {
    // Arrange
    const changeValue = jest.fn();
    render(<BetControl value={1} min={1} onChange={changeValue} />);

    // Act
    fireEvent.change(screen.getByTestId('value'), { target: { value: -5 } });

    // Assert
    expect(changeValue).toHaveBeenCalledTimes(0);
  });

  it('should call onChange value = min', () => {
    // Arrange
    const changeValue = jest.fn();
    render(<BetControl value={2} min={1} onChange={changeValue} />);

    // Act
    fireEvent.change(screen.getByTestId('value'), { target: { value: 1 } });

    // Assert
    expect(changeValue).toHaveBeenCalledTimes(1);
  });

  it('should call onChange value > min', () => {
    // Arrange
    const changeValue = jest.fn();
    render(<BetControl value={1} min={1} onChange={changeValue} />);

    // Act
    fireEvent.change(screen.getByTestId('value'), { target: { value: 3 } });

    // Assert
    expect(changeValue).toHaveBeenCalledTimes(1);
  });

  it('should call onChange value = max', () => {
    // Arrange
    const changeValue = jest.fn();
    render(<BetControl value={1} max={5} onChange={changeValue} />);

    // Act
    fireEvent.change(screen.getByTestId('value'), { target: { value: 5 } });

    // Assert
    expect(changeValue).toHaveBeenCalledTimes(1);
  });

  it('should call onChange value < max', () => {
    // Arrange
    const changeValue = jest.fn();
    render(<BetControl value={1} max={5} onChange={changeValue} />);

    // Act
    fireEvent.change(screen.getByTestId('value'), { target: { value: 4 } });

    // Assert
    expect(changeValue).toHaveBeenCalledTimes(1);
  });

  it('should not call onChange value > max', () => {
    // Arrange
    const changeValue = jest.fn();
    render(<BetControl value={1} max={5} onChange={changeValue} />);

    // Act
    fireEvent.change(screen.getByTestId('value'), { target: { value: 6 } });

    // Assert
    expect(changeValue).toHaveBeenCalledTimes(0);
  });

  it('should change quantity to 10', () => {
    // Arrange
    const container = render(<BetControl value={5} decimalPlaces={0} />);
    const input = container.getByTestId('value');

    // Act
    fireEvent.change(input, { target: { value: 10 } });

    // Assert
    expect((input as HTMLInputElement).value).toBe('10');
  });

  it('should revert to max 8', () => {
    // Arrange
    const container = render(<BetControl value={5} max={8} decimalPlaces={0} />);
    const input = container.getByTestId('value');

    // Act
    input.focus();
    fireEvent.change(input, { target: { value: 10 } });
    input.blur();

    // Assert
    expect((input as HTMLInputElement).value).toBe('8');
  });

  it('should revert to recent value', () => {
    // Arrange
    const container = render(<BetControl value={5} decimalPlaces={0} />);
    const input = container.getByTestId('value');

    // Act
    input.focus();
    fireEvent.change(input, { target: { value: 'test' } });
    input.blur();

    // Assert
    expect((input as HTMLInputElement).value).toBe('5');
  });
});
