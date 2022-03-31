import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '..';

const innerText = 'Inner button text';

describe('given the prop onPress, it will be applied to the TouchableOpacity', () => {
  it('simple event handling', () => {
    let itPassed = false;

    const changeItPassed = () => itPassed = true;

    const { getByText } = render(<Button onPress={changeItPassed}>{innerText}</Button>);

    fireEvent.press(getByText(innerText));

    expect(itPassed).toBe(true);
  });
});

describe('CSS API', () => {
  it('type primary', () => {
    const tree = render(<Button type="primary">{innerText}</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('type secondary', () => {
    const tree = render(<Button type="secondary">{innerText}</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('type danger', () => {
    const tree = render(<Button type="danger">{innerText}</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('size big', () => {
    const tree = render(<Button size="big">{innerText}</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('size medium', () => {
    const tree = render(<Button size="medium">{innerText}</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('size small', () => {
    const tree = render(<Button size="small">{innerText}</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('useSpacing true', () => {
    const tree = render(<Button useSpacing={true}>{innerText}</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('useSpacing false', () => {
    const tree = render(<Button useSpacing={false}>{innerText}</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
