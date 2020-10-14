module.exports = [
  {
    type: 'add',
    path: 'src/components/{{pascalCase name}}/index.ts',
    templateFile: '.plop-templates/BasicComponent/template/index.ts.hbs',
  },
  {
    type: 'add',
    path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
    templateFile: '.plop-templates/BasicComponent/template/Component.tsx.hbs',
  },
  {
    type: 'add',
    path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.module.scss',
    templateFile: '.plop-templates/BasicComponent/template/Component.module.scss.hbs',
  },
  {
    type: 'add',
    path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
    templateFile: '.plop-templates/BasicComponent/template/Component.test.tsx.hbs',
  },
  {
    type: 'add',
    path: 'src/components/{{pascalCase name}}/__snapshots__/{{pascalCase name}}.test.tsx.snap',
    templateFile:
      '.plop-templates/BasicComponent/template/__snapshots__/Component.test.tsx.snap.hbs',
  },
  {
    type: 'add',
    path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
    templateFile: '.plop-templates/BasicComponent/template/Component.stories.tsx.hbs',
  },
];
