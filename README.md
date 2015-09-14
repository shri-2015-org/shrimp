# Shrimp
_Chat application by ShrimpJS team. Project curated by Yandex developers at [Yandex Interface Developer School](https://academy.yandex.ru/events/shri/)._

[![Stories in Ready](https://badge.waffle.io/shri-2015-org/shrimp.png?label=ready&title=Ready)](https://waffle.io/shri-2015-org/shrimp)
[![Circle CI](https://circleci.com/gh/shri-2015-org/shrimp/tree/master.svg?style=svg)](https://circleci.com/gh/shri-2015-org/shrimp/tree/master)

## Development

### Get up and going

1. Install nodejs.
2. Clone this repo and run `npm install`.
3. For development run: `npm run dev` and go here: `http://localhost:2992/webpack-dev-server/bundle`.
4. For production run: `npm run master` and go here: `http://localhost:3000`.

### Contributor workflow

1. Head to https://waffle.io/shri-2015-org/shrimp and pick existing issue or create a new one.
2. When actively working on an issue, *move the ticket to "In Progress"*, so other team members would see where you at.
3. Follow Github flow: https://guides.github.com/introduction/flow/.

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

* When pulling latest changes from master, prefer rebase to merge where possible, to keep history clean: `git pull --rebase origin master`

* For hotfixes or little things this workflow may be simplified: e.g. you may not want to create a ticket for something you have already done (in that case the branch name may just be `<type>/<short_name>`).

* All changes *must pass code review*. After PR is created, at least two positive comments must be recorded in PR discussion, before the PR may be merged. Don't be discouraged by downvotes: it's much better to fix issues before merging, than applying hotfixes all over the place!

* Always delete branches after merge with master. For follow-up changes a new branch and a new ticket should be created.

### Code style

We adhere to [AirBnb JavaScript styleguide](https://github.com/airbnb/javascript). Watch for linter error on pre-commit hook. For other stuff use common sense and code reviews by other team members.

[Git workflow](https://github.com/CSSSR/sputnik/blob/master/Git.md)  
[CSS styleguide](https://github.com/CSSSR/sputnik/blob/master/CSS.md)


### Client state spec

```
State {
	messages: [
		{
			id: 1,
			senderId: 1,
			channelId: 1,
			text: 'Hello world!',
			timestamp: 'unix timestamp?'
		},
	],
	channels:[
		{
			id: 123,
			name: 'Channel name',
			userIds: [1,2]
		},
	],
	users: [
		{
			id: 1,
			nick: '',
			name: 'Vasya',
			avatar: 'image.jpg',
			isOnline: false
		},
	],
	user: [
		id: 1,
		nick: '',
		name: 'Vasya',
		avatar: 'image.jpg',
	],
}
```
