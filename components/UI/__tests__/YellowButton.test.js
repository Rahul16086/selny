import YellowButton from "../Buttons/YellowButton";
import React from "react";
import renderer from "react-test-renderer";

describe("Yellow Button", () => {
  it("renders properly", () => {
    const tree = renderer.create(<YellowButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
