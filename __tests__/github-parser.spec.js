import GitHubParser, {
  CREATED_AT_DATE_FORMAT_RULE
} from "@/utils/parsers/GitHubParser";
import dayjs from "dayjs";

function buildTestData(override) {
  return {
    name: "TEST_NAME",
    description: "TEST_DESCRIPTION",
    html_url: "https://test-url.com",
    id: 0,
    created_at: "2018-07-13T09:23:53Z",
    ...override
  };
}

test("Parse default value when used method empty", () => {
  const tData = {
    title: "",
    description: "",
    url: "",
    id: -1,
    createdAt: ""
  };
  const eData = GitHubParser.empty();
  expect(eData).toMatchObject(tData);

  const dataWithInput = GitHubParser.empty({
    id: 10,
    description: "fake_description"
  });
  expect(dataWithInput).toMatchObject(tData);
});

test("Parse correctly with 'fit' input data", () => {
  const tData = buildTestData();
  const eData = GitHubParser.parse(tData);
  const createdAt = dayjs(tData.created_at).format(CREATED_AT_DATE_FORMAT_RULE);
  expect(eData.title).toBe(tData.name);
  expect(eData.description).toBe(tData.description);
  expect(eData.url).toBe(tData.html_url);
  expect(eData.id).toBe(tData.id);
  expect(eData.createdAt).toBe(createdAt);
});

test("Parse correctly with 'overload' input data", () => {
  const tData = buildTestData({
    overload1: "overload",
    overload2: 0
  });

  const eData = GitHubParser.parse(tData);
  const createdAt = dayjs(tData.created_at).format(CREATED_AT_DATE_FORMAT_RULE);
  expect(eData.title).toBe(tData.name);
  expect(eData.description).toBe(tData.description);
  expect(eData.url).toBe(tData.html_url);
  expect(eData.id).toBe(tData.id);
  expect(eData.createdAt).toBe(createdAt);

  expect(eData.overload1).toBeUndefined();
  expect(eData.overload2).toBeUndefined();
});

test("Parse correctly with 'lose' input data", () => {
  const tData = buildTestData();
  delete tData.description;
  delete tData.html_url;

  const eData = GitHubParser.parse(tData);
  const createdAt = dayjs(tData.created_at).format(CREATED_AT_DATE_FORMAT_RULE);
  expect(eData.title).toBe(tData.name);
  expect(eData.id).toBe(tData.id);
  expect(eData.createdAt).toBe(createdAt);

  expect(eData.description).toBe("");
  expect(eData.url).toBe("");
});
