class GitHubParser {
  // Have to had those properties by the guild line.
  title;
  description;
  url;

  // Other properties.
  id;
  createdAt;
  gitUrl;

  constructor(
    name = "",
    description = "",
    html_url = "",
    id = -1,
    create_at = "",
    git_url = ""
  ) {
    this.title = name;
    this.description = description;
    this.url = html_url;
    this.id = id;
    this.createdAt = create_at;
    this.gitUrl = git_url;
  }

  static parse({ name, description, html_url, id, create_at, git_url } = {}) {
    return new GitHubParser(
      name,
      description,
      html_url,
      id,
      create_at,
      git_url
    );
  }

  static empty() {
    return new GitHubParser();
  }
}

export default GitHubParser;
