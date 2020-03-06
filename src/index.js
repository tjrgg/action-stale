const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
	try {
		const repoToken = core.getInput('repo-token', { required: true });
		const daysBeforeClose = parseInt(core.getInput('days-before-close', { required: true }));
		const daysBeforeStale = parseInt(core.getInput('days-before-stale', { required: true }));
		const staleLabel = core.getInput('stale-label', { required: true });

		for (const number of [ 'days-before-close', 'days-before-stale' ]) {
			if (isNaN(parseInt(core.getInput(number)))) {
				throw new TypeError(`${number} did not parse to a valid integer`);
			}
		}

		const client = new github.GitHub(repoToken);
		const ctx = { owner: github.context.repo.owner, repo: github.context.repo.repo };

		const { data: issues } = await client.issues.listForRepo({
			...ctx,
			state: 'open',
			page: 1,
			// eslint-disable-next-line camelcase
			per_page: 100
		});

		for (const issue of issues.values()) {
			core.debug(`Issue #${issue.number}: ${issue.title} - last updated ${issue.updated_at}`);

			const hasLabel = issue.labels.some(({ name }) => name.toLowerCase() === staleLabel);
			const timeBeforeClose = 1000 * 60 * 60 * 24 * daysBeforeClose;
			const timeBeforeStale = 1000 * 60 * 60 * 24 * daysBeforeStale;
			const timeSinceUpdated = new Date().getTime() - new Date(issue.updated_at).getTime();

			if (timeBeforeStale <= timeSinceUpdated) {
				if (!hasLabel) {
					core.debug(`Labeling issue #${issue.number} as stale`);

					client.issues.addLabels({
						...ctx,
						// eslint-disable-next-line camelcase
						issue_number: issue.number,
						labels: [ staleLabel ]
					});
				}

				if (timeBeforeClose <= timeSinceUpdated) {
					core.debug(`Closing issue #${issue.number} for being stale`);

					client.issues.update({
						...ctx,
						// eslint-disable-next-line camelcase
						issue_number: issue.number,
						state: 'closed'
					});

					continue;
				}
			}
			else if (hasLabel) {
				client.issues.removeLabel({
					...ctx,
					// eslint-disable-next-line camelcase
					issue_number: issue.number,
					labels: staleLabel
				});
				continue;
			}
		}
	}
	catch (error) {
		core.error(error);
		core.setFailed(error.message);
	}
})();
