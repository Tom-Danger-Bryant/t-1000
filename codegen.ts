
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/lib/graphql/server.ts",
  documents: ["src/lib/graphql/queries/*.ts","src/lib/graphql/mutations/*.ts"],
  generates: {
    "generated/": {
      preset: "client",
      plugins: []
    },
    "./graphql.schema.json": {
      plugins: ["typescript","typescript-resolvers"]
    }
  }
};

export default config;
