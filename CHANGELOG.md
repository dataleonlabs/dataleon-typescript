# Changelog

## 0.1.0-alpha.25 (2025-12-18)

Full Changelog: [v0.1.0-alpha.24...v0.1.0-alpha.25](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.24...v0.1.0-alpha.25)

### Bug Fixes

* **mcp:** pass base url to code tool ([f94b0ea](https://github.com/dataleonlabs/dataleon-typescript/commit/f94b0ea0e41c01fc4114d5225360f5d4d3dbb34b))

## 0.1.0-alpha.24 (2025-12-11)

Full Changelog: [v0.1.0-alpha.23...v0.1.0-alpha.24](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.23...v0.1.0-alpha.24)

### Bug Fixes

* **mcp:** add client instantiation options to code tool ([981a138](https://github.com/dataleonlabs/dataleon-typescript/commit/981a1387bc1404e66ce089e6850786d450218c6a))


### Chores

* **internal:** codegen related update ([23b3141](https://github.com/dataleonlabs/dataleon-typescript/commit/23b3141365d3d0c25f42fe117f443561c8acefc0))
* **mcp:** update lockfile ([98e9977](https://github.com/dataleonlabs/dataleon-typescript/commit/98e99775c129eebe97b6ae6e4c8ce62991f2b67c))

## 0.1.0-alpha.23 (2025-12-06)

Full Changelog: [v0.1.0-alpha.22...v0.1.0-alpha.23](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.22...v0.1.0-alpha.23)

### Bug Fixes

* **mcp:** correct code tool API endpoint ([b1ad49d](https://github.com/dataleonlabs/dataleon-typescript/commit/b1ad49d029f603bbfcc487b5ea9cf86a6fc8d128))

## 0.1.0-alpha.22 (2025-12-06)

Full Changelog: [v0.1.0-alpha.21...v0.1.0-alpha.22](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.21...v0.1.0-alpha.22)

### Features

* **mcp:** add typescript check to code execution tool ([4451273](https://github.com/dataleonlabs/dataleon-typescript/commit/445127331fb7b9fe1b82c397af31286f32bf2c3d))
* **mcp:** handle code mode calls in the Stainless API ([025d957](https://github.com/dataleonlabs/dataleon-typescript/commit/025d957e5abf1efab714dff848190b030483de4b))
* **mcp:** return logs on code tool errors ([bddb959](https://github.com/dataleonlabs/dataleon-typescript/commit/bddb959ee74ca5481dd00656d31553f3d9856e61))


### Bug Fixes

* **mcp:** return correct lines on typescript errors ([4432741](https://github.com/dataleonlabs/dataleon-typescript/commit/4432741220de9d43f44f1df0e70dc67588027cc5))


### Chores

* **internal:** codegen related update ([ccef8c3](https://github.com/dataleonlabs/dataleon-typescript/commit/ccef8c3270abe274e72a4700f84fb45433b69597))
* **internal:** upgrade eslint ([91b0afe](https://github.com/dataleonlabs/dataleon-typescript/commit/91b0afed3d9fb2f69f0f2b741040049b365fd763))
* use latest @modelcontextprotocol/sdk ([f4e1fff](https://github.com/dataleonlabs/dataleon-typescript/commit/f4e1fffd6f613c98c051c1afd95781b294a43bec))

## 0.1.0-alpha.21 (2025-12-02)

Full Changelog: [v0.1.0-alpha.20...v0.1.0-alpha.21](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.20...v0.1.0-alpha.21)

### Features

* **mcp:** add detail field to docs search tool ([a411b0d](https://github.com/dataleonlabs/dataleon-typescript/commit/a411b0d5e55d0da17ecc52507f65701ae219bd04))


### Bug Fixes

* **mcp:** return tool execution error on api error ([10b2ee1](https://github.com/dataleonlabs/dataleon-typescript/commit/10b2ee177c3af56ed4eb27f09ff6cfb41f0183de))


### Chores

* **client:** fix logger property type ([c2fa535](https://github.com/dataleonlabs/dataleon-typescript/commit/c2fa5356e37041d3b8ed87e02546762c5c355ae7))
* **mcp:** upgrade jq-web ([23609f4](https://github.com/dataleonlabs/dataleon-typescript/commit/23609f45a0b53ef55ab339b5c22de9a8861389dd))

## 0.1.0-alpha.20 (2025-11-13)

Full Changelog: [v0.1.0-alpha.19...v0.1.0-alpha.20](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.19...v0.1.0-alpha.20)

### Features

* **mcp:** enable optional code execution tool on http mcp servers ([fa75032](https://github.com/dataleonlabs/dataleon-typescript/commit/fa750322099f7efcaf0be638a36689b6d526aefc))


### Bug Fixes

* **mcp:** return tool execution error on jq failure ([ab2f8c2](https://github.com/dataleonlabs/dataleon-typescript/commit/ab2f8c2be091879db87f13f8da9e2d179fd42280))


### Chores

* **internal:** codegen related update ([e07f249](https://github.com/dataleonlabs/dataleon-typescript/commit/e07f249f145c435c16ad0893b87763b69c71e4b5))
* **internal:** codegen related update ([34757aa](https://github.com/dataleonlabs/dataleon-typescript/commit/34757aabc593ed5314e83a34dc00654079086ddf))
* **internal:** grammar fix (it's -&gt; its) ([4db5df4](https://github.com/dataleonlabs/dataleon-typescript/commit/4db5df4f13ca4a8be3871cfe5ef98c365ba1db00))
* mcp code tool explicit error message when missing a run function ([798d349](https://github.com/dataleonlabs/dataleon-typescript/commit/798d34981d5c9fd63ca037d6a3be4a8a3fa43f29))
* **mcp:** add friendlier MCP code tool errors on incorrect method invocations ([9befbe4](https://github.com/dataleonlabs/dataleon-typescript/commit/9befbe45d3a000f36124c43deb1bc33e09c53a2d))
* **mcp:** add line numbers to code tool errors ([6951608](https://github.com/dataleonlabs/dataleon-typescript/commit/695160841599a678c9a83e5e5884c94ff9d3f468))
* **mcp:** clarify http auth error ([801f7b9](https://github.com/dataleonlabs/dataleon-typescript/commit/801f7b9f7dee272b348b33c7f545fca27b91a5bf))
* use structured error when code execution tool errors ([62d6ed5](https://github.com/dataleonlabs/dataleon-typescript/commit/62d6ed5d02017813590b2359caf6fd1e18fefe41))


### Documentation

* **mcp:** add a README button for one-click add to Cursor ([e756344](https://github.com/dataleonlabs/dataleon-typescript/commit/e7563444e38dfcd5e02643414f0a2a8d47b46185))
* **mcp:** add a README link to add server to VS Code or Claude Code ([3ac6f3c](https://github.com/dataleonlabs/dataleon-typescript/commit/3ac6f3c3d575ad1ad2b3868bbf800e39bc7f8194))

## 0.1.0-alpha.19 (2025-10-31)

Full Changelog: [v0.1.0-alpha.18...v0.1.0-alpha.19](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.18...v0.1.0-alpha.19)

### Bug Fixes

* **mcpb:** pin @anthropic-ai/mcpb version ([d82b5e3](https://github.com/dataleonlabs/dataleon-typescript/commit/d82b5e343ebb87ed7e41505623484ea56b2de3eb))

## 0.1.0-alpha.18 (2025-10-14)

Full Changelog: [v0.1.0-alpha.17...v0.1.0-alpha.18](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.17...v0.1.0-alpha.18)

### Features

* **api:** api update ([b5f45e3](https://github.com/dataleonlabs/dataleon-typescript/commit/b5f45e36ddcd7ef50489e801cce29284dd685152))

## 0.1.0-alpha.17 (2025-10-07)

Full Changelog: [v0.1.0-alpha.16...v0.1.0-alpha.17](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.16...v0.1.0-alpha.17)

### Chores

* **internal:** remove .eslintcache ([fa5ee83](https://github.com/dataleonlabs/dataleon-typescript/commit/fa5ee835e254f980e395ed0312ea0bd49e7feabe))
* **internal:** use npm pack for build uploads ([bae0f5a](https://github.com/dataleonlabs/dataleon-typescript/commit/bae0f5a2a479dd210dd904358fe96c17cc898d84))
* **jsdoc:** fix [@link](https://github.com/link) annotations to refer only to parts of the package‘s public interface ([fb1438b](https://github.com/dataleonlabs/dataleon-typescript/commit/fb1438b41102c1a1aa1298d0503afd5af2682519))

## 0.1.0-alpha.16 (2025-09-30)

Full Changelog: [v0.1.0-alpha.15...v0.1.0-alpha.16](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.15...v0.1.0-alpha.16)

### Features

* **mcp:** add docs search tool ([52f2522](https://github.com/dataleonlabs/dataleon-typescript/commit/52f2522ca9c1745dcbcc8da391fa5fcd44c7d34b))
* **mcp:** add option for including docs tools ([43652ad](https://github.com/dataleonlabs/dataleon-typescript/commit/43652ad4b393793d15dfb7a24b14033ad5e8944a))
* **mcp:** enable experimental docs search tool ([f200a65](https://github.com/dataleonlabs/dataleon-typescript/commit/f200a65fd358b3e4f50d4668d1925d2a54c80c46))


### Bug Fixes

* **mcp:** fix cli argument parsing logic ([141c336](https://github.com/dataleonlabs/dataleon-typescript/commit/141c3364742063acb46d1a7a4e7ab9a0c74d6839))
* **mcp:** resolve a linting issue in server code ([6d2118d](https://github.com/dataleonlabs/dataleon-typescript/commit/6d2118d0665eb328b301ff1b5facb521304da24f))


### Performance Improvements

* faster formatting ([6f96e5c](https://github.com/dataleonlabs/dataleon-typescript/commit/6f96e5c221417452badf26c0607f4ba5ba689c5e))


### Chores

* **codegen:** internal codegen update ([51dd2f3](https://github.com/dataleonlabs/dataleon-typescript/commit/51dd2f3dc2b3f16978c96b3e759b53eadb57617c))
* do not install brew dependencies in ./scripts/bootstrap by default ([20b24cd](https://github.com/dataleonlabs/dataleon-typescript/commit/20b24cd053b2c7e077b75a247317f31e0a0f3991))
* **internal:** codegen related update ([be04c6e](https://github.com/dataleonlabs/dataleon-typescript/commit/be04c6e756fb2ce96cfb0274e4cd2e8acd502e5a))
* **internal:** fix incremental formatting in some cases ([7403199](https://github.com/dataleonlabs/dataleon-typescript/commit/7403199048ee5135da2e47bf3b72e6ffd91bb358))
* **internal:** gitignore .mcpb files ([d66f64f](https://github.com/dataleonlabs/dataleon-typescript/commit/d66f64f004e6cd5d48ba8f04854c52b7dd6d39d6))
* **internal:** ignore .eslintcache ([ff5ba41](https://github.com/dataleonlabs/dataleon-typescript/commit/ff5ba417a4314ac895a966cb888f6009840297be))
* **internal:** remove deprecated `compilerOptions.baseUrl` from tsconfig.json ([f411963](https://github.com/dataleonlabs/dataleon-typescript/commit/f4119634fb9fcf2ed477419bb9b8c85fb7c1556d))
* **mcp:** allow pointing `docs_search` tool at other URLs ([167d7ce](https://github.com/dataleonlabs/dataleon-typescript/commit/167d7cedd7e35c7e2cbe4504409e620f5d8233ef))
* **mcp:** rename dxt to mcpb ([5d0bd60](https://github.com/dataleonlabs/dataleon-typescript/commit/5d0bd60dbb77fd5c28119338cedb17e3082fd4ef))
* update lockfile ([0a62d2a](https://github.com/dataleonlabs/dataleon-typescript/commit/0a62d2a2fe915ce7ad68146a61139319444e7b0d))

## 0.1.0-alpha.15 (2025-09-17)

Full Changelog: [v0.1.0-alpha.14...v0.1.0-alpha.15](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.14...v0.1.0-alpha.15)

### Bug Fixes

* **ci:** set permissions for DXT publish action ([be17efa](https://github.com/dataleonlabs/dataleon-typescript/commit/be17efa0ab0d4354ce1ffead759340c780e331f7))

## 0.1.0-alpha.14 (2025-09-12)

Full Changelog: [v0.1.0-alpha.13...v0.1.0-alpha.14](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.13...v0.1.0-alpha.14)

### Bug Fixes

* **mcp:** fix uploading dxt release assets ([0287127](https://github.com/dataleonlabs/dataleon-typescript/commit/0287127da55b46eb5403f11bd64688d0361f2dbd))

## 0.1.0-alpha.13 (2025-09-10)

Full Changelog: [v0.1.0-alpha.12...v0.1.0-alpha.13](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.12...v0.1.0-alpha.13)

### Features

* **api:** api update ([2d0c5ff](https://github.com/dataleonlabs/dataleon-typescript/commit/2d0c5ff8027470274ceeec6d9c52fe59acae6f4e))


### Chores

* **mcp:** upload dxt as release asset ([932c565](https://github.com/dataleonlabs/dataleon-typescript/commit/932c5657b111e53aa9a90f7be88b6f6198c3faac))

## 0.1.0-alpha.12 (2025-09-09)

Full Changelog: [v0.1.0-alpha.11...v0.1.0-alpha.12](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.11...v0.1.0-alpha.12)

### Chores

* **internal:** codegen related update ([a672965](https://github.com/dataleonlabs/dataleon-typescript/commit/a6729652cfc3aeca209bfb5fa7d5defd1ecf0f47))

## 0.1.0-alpha.11 (2025-09-06)

Full Changelog: [v0.1.0-alpha.10...v0.1.0-alpha.11](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.10...v0.1.0-alpha.11)

### Features

* **mcp:** allow setting logging level ([8040b9e](https://github.com/dataleonlabs/dataleon-typescript/commit/8040b9e6a4663d1cdbb0ca1323c98244ab8b8f95))
* **mcp:** expose client options in `streamableHTTPApp` ([44b70e5](https://github.com/dataleonlabs/dataleon-typescript/commit/44b70e5f1e1d7eb03c9376299fca59211a47783c))


### Bug Fixes

* **mcp:** fix query options parsing ([8db3753](https://github.com/dataleonlabs/dataleon-typescript/commit/8db375365cf36f1bd809138a5000d69e4c624c64))


### Chores

* ci build action ([a36f68f](https://github.com/dataleonlabs/dataleon-typescript/commit/a36f68fbb6a3484b318c7d698f04108f01ad83de))
* **internal:** codegen related update ([60bfefb](https://github.com/dataleonlabs/dataleon-typescript/commit/60bfefb86e2d5b293a061bd6d672fe20aae5e5bb))
* **internal:** codegen related update ([7a6584c](https://github.com/dataleonlabs/dataleon-typescript/commit/7a6584cd8d0232c62a9b612e82a7d9d0add73fc3))
* **internal:** update global Error reference ([080b814](https://github.com/dataleonlabs/dataleon-typescript/commit/080b8149e1a1b6e5defa3965a908c515725b5049))

## 0.1.0-alpha.10 (2025-08-28)

Full Changelog: [v0.1.0-alpha.9...v0.1.0-alpha.10](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.9...v0.1.0-alpha.10)

### Features

* **api:** manual updates ([578cd28](https://github.com/dataleonlabs/dataleon-typescript/commit/578cd2839472f45199368e396cced9ce0b53cc18))

## 0.1.0-alpha.9 (2025-08-27)

Full Changelog: [v0.1.0-alpha.8...v0.1.0-alpha.9](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.8...v0.1.0-alpha.9)

### Features

* **api:** manual updates ([633568b](https://github.com/dataleonlabs/dataleon-typescript/commit/633568b209ac45cca49cb6aeeb0f10b4a4461ef3))

## 0.1.0-alpha.8 (2025-08-27)

Full Changelog: [v0.1.0-alpha.7...v0.1.0-alpha.8](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.7...v0.1.0-alpha.8)

### Features

* **api:** manual updates ([4fee004](https://github.com/dataleonlabs/dataleon-typescript/commit/4fee0041686afce5cbd77d3fa2f5020aca9c41bd))

## 0.1.0-alpha.7 (2025-08-27)

Full Changelog: [v0.1.0-alpha.6...v0.1.0-alpha.7](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.6...v0.1.0-alpha.7)

### Features

* **api:** api update ([3e3c729](https://github.com/dataleonlabs/dataleon-typescript/commit/3e3c729fb73ce88d41c3e80d32df79f1ba812575))


### Chores

* **internal:** codegen related update ([265553f](https://github.com/dataleonlabs/dataleon-typescript/commit/265553f88910e8c069f4b2259574298689a27d0a))
* update CI script ([802be2e](https://github.com/dataleonlabs/dataleon-typescript/commit/802be2ef2519976e1fc08f9f0065d7f41a51cd08))

## 0.1.0-alpha.6 (2025-08-22)

Full Changelog: [v0.1.0-alpha.5...v0.1.0-alpha.6](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.5...v0.1.0-alpha.6)

### Features

* **api:** api update ([242e112](https://github.com/dataleonlabs/dataleon-typescript/commit/242e11264a7d680a557c3ed5097199b3feaba0c7))

## 0.1.0-alpha.5 (2025-08-22)

Full Changelog: [v0.1.0-alpha.4...v0.1.0-alpha.5](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.4...v0.1.0-alpha.5)

### Features

* **api:** api update ([4cb8564](https://github.com/dataleonlabs/dataleon-typescript/commit/4cb8564b40cac9cd8a95ec32d3f4abc51f17e19d))

## 0.1.0-alpha.4 (2025-08-22)

Full Changelog: [v0.1.0-alpha.3...v0.1.0-alpha.4](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.3...v0.1.0-alpha.4)

### Features

* **api:** api update ([9a662bb](https://github.com/dataleonlabs/dataleon-typescript/commit/9a662bb668b29b5064ebad2d5df8f958aa91804a))


### Chores

* add package to package.json ([5f56759](https://github.com/dataleonlabs/dataleon-typescript/commit/5f56759f0862d055ef02577b66e18479887e2241))
* **client:** qualify global Blob ([e03f902](https://github.com/dataleonlabs/dataleon-typescript/commit/e03f90213eb58f573504ca76e4b2e8748616eabd))
* **internal:** codegen related update ([b3d3382](https://github.com/dataleonlabs/dataleon-typescript/commit/b3d338282224ef2d59311f0fd51094d5e6386505))
* **mcp:** update package.json ([fb873c8](https://github.com/dataleonlabs/dataleon-typescript/commit/fb873c8eb63c373d5b813247b524942c3c18227c))
* **mcp:** update types ([ded4e37](https://github.com/dataleonlabs/dataleon-typescript/commit/ded4e377c3fa70bdc677fe5571bfd3cec424fdff))

## 0.1.0-alpha.3 (2025-08-21)

Full Changelog: [v0.1.0-alpha.2...v0.1.0-alpha.3](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.2...v0.1.0-alpha.3)

### Features

* **api:** api update ([773a264](https://github.com/dataleonlabs/dataleon-typescript/commit/773a2643ee69957bd229dcf2b4fa4ba093d823b1))
* **mcp:** add code execution tool ([eaed228](https://github.com/dataleonlabs/dataleon-typescript/commit/eaed228bf1cdead464bc7a1fff6a087023802cbe))
* **mcp:** add option to infer mcp client ([477d273](https://github.com/dataleonlabs/dataleon-typescript/commit/477d273096ace1da0b8b660d48dad794dc099d51))
* **mcp:** parse query string as mcp client options in mcp server ([a65b203](https://github.com/dataleonlabs/dataleon-typescript/commit/a65b203e29940d9609db412e9a904a6dc605c051))


### Chores

* **deps:** update dependency @types/node to v20.17.58 ([4552911](https://github.com/dataleonlabs/dataleon-typescript/commit/455291102ec6ab617154ec51484b2ecd82b0ac03))
* **internal:** formatting change ([b09472a](https://github.com/dataleonlabs/dataleon-typescript/commit/b09472a67f5c920796d36203554052249b5985b1))
* **internal:** make mcp-server publishing public by defaut ([99a090d](https://github.com/dataleonlabs/dataleon-typescript/commit/99a090d4d36faebd813d823cc22e5f0efda8dd84))
* **internal:** refactor array check ([9f04d7f](https://github.com/dataleonlabs/dataleon-typescript/commit/9f04d7ffa69d0d6df0457a96d274cc3de2904612))
* **mcp:** add cors to oauth metadata route ([3c7afac](https://github.com/dataleonlabs/dataleon-typescript/commit/3c7afac98d8817da34c819341bdf38d170538a5f))
* **mcp:** update README ([a653faf](https://github.com/dataleonlabs/dataleon-typescript/commit/a653faf76e81dad8bed1b4e7ee9364e88a47b51f))

## 0.1.0-alpha.2 (2025-08-15)

Full Changelog: [v0.1.0-alpha.1...v0.1.0-alpha.2](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.1.0-alpha.1...v0.1.0-alpha.2)

### Features

* **api:** api update ([dc4502f](https://github.com/dataleonlabs/dataleon-typescript/commit/dc4502f354e7e195256dc6d323921a6e1d08d9c1))

## 0.1.0-alpha.1 (2025-08-15)

Full Changelog: [v0.0.1-alpha.2...v0.1.0-alpha.1](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.0.1-alpha.2...v0.1.0-alpha.1)

### Features

* **api:** api update ([de5cde5](https://github.com/dataleonlabs/dataleon-typescript/commit/de5cde5eb00d610d7862d5ff58bd38c3ae52188d))

## 0.0.1-alpha.2 (2025-08-15)

Full Changelog: [v0.0.1-alpha.1...v0.0.1-alpha.2](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.0.1-alpha.1...v0.0.1-alpha.2)

### Features

* **mcp:** add unix socket option for remote MCP ([14bae7c](https://github.com/dataleonlabs/dataleon-typescript/commit/14bae7c7ea0cd86d963cf86150c9764abfa02bf7))


### Bug Fixes

* **mcp:** generate additionalProperties=true for map schemas to avoid validation issues ([a2edec1](https://github.com/dataleonlabs/dataleon-typescript/commit/a2edec1817d78abfe81b77487a5d720a68398d57))


### Chores

* **internal:** codegen related update ([c476cb5](https://github.com/dataleonlabs/dataleon-typescript/commit/c476cb582d34759c286712fd4616f09a0336a952))
* **internal:** move publish config ([f8f11fc](https://github.com/dataleonlabs/dataleon-typescript/commit/f8f11fc813a5bcc2c5bf003c0f7756b57a80e255))
* **internal:** update comment in script ([077f80e](https://github.com/dataleonlabs/dataleon-typescript/commit/077f80e8829db1000ccb5626f88f73f021b0c2e7))
* **mcp:** document remote server in README.md ([6b57959](https://github.com/dataleonlabs/dataleon-typescript/commit/6b57959b1897e989cc04e586ebccf6208654611e))
* **mcp:** minor cleanup of types and package.json ([81f91c4](https://github.com/dataleonlabs/dataleon-typescript/commit/81f91c490baaf4cdb71e326f422876ba3fb0b8a1))
* **mcp:** refactor streamable http transport ([4127bc0](https://github.com/dataleonlabs/dataleon-typescript/commit/4127bc0b6ab5589a79ade674abc1af2fff3435b8))
* update @stainless-api/prism-cli to v5.15.0 ([85476d2](https://github.com/dataleonlabs/dataleon-typescript/commit/85476d2dadf3c959bbf42ecc5fc7859dd5b7fa0a))

## 0.0.1-alpha.1 (2025-08-05)

Full Changelog: [v0.0.1-alpha.0...v0.0.1-alpha.1](https://github.com/dataleonlabs/dataleon-typescript/compare/v0.0.1-alpha.0...v0.0.1-alpha.1)

### Features

* **api:** api update ([a4acd9d](https://github.com/dataleonlabs/dataleon-typescript/commit/a4acd9d341314d611a8008e73d870b6b9aed88fc))
* **api:** api update ([55b1665](https://github.com/dataleonlabs/dataleon-typescript/commit/55b16651abfd88e816fcfa3ede6672a122b598f0))
* **api:** api update ([c9a0f77](https://github.com/dataleonlabs/dataleon-typescript/commit/c9a0f77c34da48aca69ba5b12e2f04c861e2000e))
* **api:** api update ([d1fc007](https://github.com/dataleonlabs/dataleon-typescript/commit/d1fc007662a515022ed5e646ab74a7d59f49bc80))
* **api:** manual updates ([c71cf83](https://github.com/dataleonlabs/dataleon-typescript/commit/c71cf8342b5d93c35b3c4e1a0887a5ca076db8a0))
* **api:** manual updates ([358ccf0](https://github.com/dataleonlabs/dataleon-typescript/commit/358ccf097d4aec2514f704cad051a29440e5ffee))
* **api:** manual updates ([3156a1b](https://github.com/dataleonlabs/dataleon-typescript/commit/3156a1b7d0d0bc0d80caab02a55e0da1ab1817b0))


### Chores

* configure new SDK language ([363355c](https://github.com/dataleonlabs/dataleon-typescript/commit/363355cc6bca329b5d3334a1f8e47fd50bcc4604))
* configure new SDK language ([8483ba4](https://github.com/dataleonlabs/dataleon-typescript/commit/8483ba46113aaf731b5dd8c195d679bb2bd076fc))
* update SDK settings ([c438a68](https://github.com/dataleonlabs/dataleon-typescript/commit/c438a68b22ebcff2dce59ce681cbf29600749a37))
