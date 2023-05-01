import { render } from "@testing-library/react";
import Home from "@/pages/index";

it("renders homepage unchanged", () => {
  const { container } = render(<Home />);
  // code to make test fail on purpose
  //   expect(4).toBe(5);
  expect(container).toMatchSnapshot();
});
