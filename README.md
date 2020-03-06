<h1 align="center">
	action-stale
</h1>

<h3 align="center">
	An action that manages stale issues and pull requests.
</h3>

<p align="center">
	<a href="https://github.com/tjrgg/action-stale/fork">
		<img alt="GitHub Forks" src="https://img.shields.io/github/forks/tjrgg/action-stale?label=Fork&style=social" />
	</a>
	<a href="https://github.com/tjrgg/action-stale">
		<img alt="GitHub Stars" src="https://img.shields.io/github/stars/tjrgg/action-stale?label=Star&style=social" />
	</a>
	<a href="https://github.com/tjrgg/action-stale/subscription">
		<img alt="GitHub Watchers" src="https://img.shields.io/github/watchers/tjrgg/action-stale?label=Watch&style=social" />
	</a>
</p>

<p align="center">
	<img alt="Issues" src="https://img.shields.io/github/issues/tjrgg/action-stale?cacheSeconds=86400" />
	<img alt="Pull Requests" src="https://img.shields.io/github/issues-pr/tjrgg/action-stale?cacheSeconds=86400" />
	<img alt="Size" src="https://img.shields.io/github/repo-size/tjrgg/action-stale?cacheSeconds=86400&label=size" />
</p>

<p align="center">
	<a href="https://twitter.com/tjrgg">
		<img alt="Twitter" src="https://img.shields.io/twitter/follow/tjrgg?style=social" />
	</a>
</p>


## Usage

```yml
name: "Stale"

on:
  schedule:
    - cron: "0 0 * * *"

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: tjrgg/action-stale@master
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          stale-label: "stale"
```


## Author

👤 **Tyler Richards**

* GitHub: [@tjrgg](https://github.com/tjrgg)
* Twitter: [@tjrgg](https://twitter.com/tjrgg)


## License

Copyright © 2020 Tyler Richards. All rights reserved.
