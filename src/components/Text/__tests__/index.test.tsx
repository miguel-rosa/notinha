import React from "react";
import { render, fireEvent } from '@testing-library/react-native';

import Text from "../index";

const innerText = "Text Component"

describe("given a text, the component should render it as children", () => {
  it("is rendering the children", () => {
    const tree = render(<Text>{innerText}</Text>).toJSON();
    expect(tree.children[0]).toBe(innerText)
  })    
})

describe('CSS API', () => {
  it("font weight 500", () => {
    const tree = render(<Text weight="500">{innerText}</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  })  
  it("font weight 700", () => {
    const tree = render(<Text weight="700">{innerText}</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  })
});