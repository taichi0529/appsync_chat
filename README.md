# appsync_chat

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```


## amplifyの設定

Admin権限のアクセスキー、シークレットキーが設定されている前提。
[こちら](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-quickstart.html) 参照の事

[ドキュメント](https://docs.amplify.aws/start/q/integration/js?sc_icampaign=js-start&sc_ichannel=choose-integration)

### 1. amplify のCLIツールをインストール
```bash
npm install -g @aws-amplify/cli
```

### 2. プロジェクトのルートディレクトリでamplifyを初期化する

```bash
amplify init
? Enter a name for the project appsyncchat # テキトーなプロジェクト名
? Enter a name for the environment dev
? Choose your default editor: None
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using none # 自前でコードは書くのでnoneで。
? Source Directory Path:  src
? Distribution Directory Path: dist
? Build Command:  yarn build
? Start Command: yarn serve

? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use xxxxxxxx # 使用するプロファイルを選ぶ

```

### 3. AWS Cognitoの追加
認証のためにamplifyコマンドでcognitoのuser pool と identity poolを追加する。
色々と細かく設定出来るが今回はしない。

```bash
amplify add auth

 Do you want to use the default authentication and security configuration? Default configuration
 Warning: you will not be able to edit these selections. 
 How do you want users to be able to sign in? Email
 Do you want to configure advanced settings? No, I am done.
```

### 4. Appsyncの追加
graphQLのAPIを追加

```bash
amplify add api
? Please select from one of the below mentioned services: GraphQL
? Provide API name: appsyncchat
? Choose the default authorization type for the API Amazon Cognito User Pool
Use a Cognito user pool configured as a part of this project.
? Do you want to configure advanced settings for the GraphQL API No, I am done.
? Do you have an annotated GraphQL schema? Yes
? Provide your schema file path: ./annotatedSchema.graphql
```

### 5. 設定をpushする
3,4までの設定はローカルで行われているだけなのでAWSへpushする。
`amplify status`で状況を確認出来る。
pushするとCloudFormationでCognitoやAppsyncが作成される。

```bash
amplify push
? Do you want to generate code for your newly created GraphQL API Yes
? Choose the code generation language target typescript
? Enter the file name pattern of graphql queries, mutations and subscriptions src/graphql/**/*.ts
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions Yes
? Enter maximum statement depth [increase from default if your schema is deeply nested] 2
? Enter the file name for the generated code src/API.ts
```
