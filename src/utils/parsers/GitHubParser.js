import dayjs from "dayjs";

const CREATED_AT_DATE_FORMAT_RULE = "YYYY年MM月DD日";

class GitHubParser {
  // Have to had those properties by the guild line.
  title;
  description;
  url;

  // Other properties.
  id;
  createdAt;

  constructor(
    name = "",
    description = "",
    html_url = "",
    id = -1,
    created_at = ""
  ) {
    this.title = name;
    this.description = description;
    this.url = html_url;
    this.id = id;
    this.createdAt = dayjs(created_at).format(CREATED_AT_DATE_FORMAT_RULE);
  }

  static parse({ name, description, html_url, id, created_at } = {}) {
    return new GitHubParser(name, description, html_url, id, created_at);
  }

  static empty() {
    return new GitHubParser();
  }
}

export default GitHubParser;
