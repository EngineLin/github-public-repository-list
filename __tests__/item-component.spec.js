import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";

import Item from "@/components/Item.vue";
import GitHubParser from "@/utils/parsers/GitHubParser";

test("Item component should render correct data with GitHubParser", () => {
  const tData = {
    name: "TEST_NAME",
    description: "TEST_DESCRIPTION",
    html_url: "https://test-url.com",
    id: 0,
    created_at: "2018-07-13T09:23:53Z"
  };
  const item = GitHubParser.parse(tData);
  const { getByText } = render(Item, { propsData: { item } });
  getByText(item.title);
  getByText(item.description);
  getByText(item.url);
  getByText(item.createdAt);
});

test("Item component should render with GitHubParser.empty() when props item has no data", () => {
  const { baseElement } = render(Item);
  expect(baseElement).toMatchSnapshot();
});
