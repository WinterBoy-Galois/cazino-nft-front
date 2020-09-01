const basicComponentActions = require('./.plop-templates/BasicComponent/plopfile');

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
    actions: basicComponentActions,
  });
};
