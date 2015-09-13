[![Stories in Ready](https://badge.waffle.io/shri-2015-org/shrimp.png?label=ready&title=Ready)](https://waffle.io/shri-2015-org/shrimp)
[![Circle CI](https://circleci.com/gh/shri-2015-org/shrimp/tree/master.svg?style=svg)](https://circleci.com/gh/shri-2015-org/shrimp/tree/master)

# Shrimp
Shrimp chat application by ShrimpJS SHRI-2015 team

## Development

### Get up and going

For development run: `npm run dev` and go here: `http://localhost:2992/webpack-dev-server/bundle`

For production run: `npm run master` and go here: `http://localhost:3000`

### Contributor workflow

1. Head to https://waffle.io/shri-2015-org/shrimp and pick existing issue or create a new one.

2. When actively working on an issue, *move the ticket to "In Progress"*, so other team members would see where you at.

3. Follow Github flow: https://guides.github.com/introduction/flow/


* Follow this convention for branch naming: `<type>/<short_name>#<issue_number>`.

Where `<type>` may be among: `feat`, `fix`, `docs`, `refactor`, `test`, `chore` (build changes).

* PR message should be formatted in this way:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
Closes: #123
```

* Commit messages may follow free format, but if the branch has only one commit, it's advised to format it in the same way as PR, and it would automatically be inserted as PR message.

* For hotfixes or little things this workflow may be simplified: e.g. you may not want to create a ticket for something you have already done (in that case the branch name may just be `<type>/<short_name>`).

* All changes *must pass code review*. After PR is created, at least two positive comments must be recorded in PR discussion, before the PR may be merged. Don't be discouraged by downvotes: it's much better to fix issues before merging, than applying hotfixes all over the place!

* Always delete branches after merge with master. For follow-up changes a new branch and a new ticket should be created.
