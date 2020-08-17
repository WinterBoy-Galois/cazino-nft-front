module.exports = function (plop) {
  plop.setGenerator('BasicComponent', {
    description: 'Create a Basic React Component',
    prompts: [
      {
        type: `input`,
        name: `name`,
        message: `Name of the component:`,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/BasicComponent/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/BasicComponent/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.module.scss',
        templateFile: 'plop-templates/BasicComponent/Component.module.scss.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: 'plop-templates/BasicComponent/Component.test.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/__snapshots__/{{pascalCase name}}.test.tsx.snap',
        templateFile: 'plop-templates/BasicComponent/__snapshots__/Component.test.tsx.snap.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: 'plop-templates/BasicComponent/Component.stories.tsx.hbs',
      },
    ],
  });
};
