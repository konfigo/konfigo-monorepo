migration-generate:
	pnpm run typeorm migration:generate ./src/migrations/$(name) -d ./src/dev/data-source.ts

migration-run:
	pnpm run typeorm migration:run -d ./src/dev/data-source.ts