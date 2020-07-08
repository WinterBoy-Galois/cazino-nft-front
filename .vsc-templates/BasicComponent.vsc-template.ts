import * as vsc from 'vsc-base';

export function Template(): vsc.vscTemplate {
  return {
    userInputs: [
      {
        title: 'What is the Component Name',
        argumentName: 'name', // will become input in template
        defaultValue: 'Example',
      },
    ],
    template: [
      {
        type: 'folder',
        name: inputs => `${vsc.toPascalCase(inputs.name)}`,
        children: [
          {
            type: 'file',
            name: inputs => `${vsc.toPascalCase(inputs.name)}.tsx`,
            content: inputs => `import React from 'react';

import styles from './${vsc.toPascalCase(inputs.name)}.module.scss';

interface IProps {
  message?: string;
  className?: string;
}

const ${vsc.toPascalCase(inputs.name)}: React.SFC<IProps> = ({ message = undefined, className = '' }) => {
  return <div className={\`\${styles.container} \${className}\`}>{message}</div>;
};

export default ${vsc.toPascalCase(inputs.name)};
`,
          },
          {
            type: 'file',
            name: inputs => `${vsc.toPascalCase(inputs.name)}.module.scss`,
            content: inputs => `@import '../../styles/shared';

.container {
  display: flex;
  align-items: center;
}           
`,
          },
          {
            type: 'file',
            name: inputs => `${vsc.toPascalCase(inputs.name)}.stories.tsx`,
            content: inputs => `import React from 'react';
import { text } from '@storybook/addon-knobs';

import ${vsc.toPascalCase(inputs.name)} from '.';

export default {
  title: 'Components/${vsc.toPascalCase(inputs.name)}',
  component: ${vsc.toPascalCase(inputs.name)},
};

const data = {
  message: 'Hello World!',
};

export const Default = () => <${vsc.toPascalCase(inputs.name)} message={text('Message', data.message)} />;
`,
          },
          {
            type: 'file',
            name: inputs => `${vsc.toPascalCase(inputs.name)}.test.tsx`,
            content: inputs => `import React from 'react';
import { render } from '@testing-library/react';

import ${vsc.toPascalCase(inputs.name)} from '.';

describe('${vsc.toPascalCase(inputs.name)}', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<${vsc.toPascalCase(inputs.name)} message="Hello World!" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
`,
          },
          {
            type: 'file',
            name: inputs => `index.ts`,
            content: inputs => `export { default } from './${vsc.toPascalCase(inputs.name)}';
`,
          },
          {
            type: 'folder',
            name: '__snapshots__',
            children: [
              {
                type: 'file',
                name: inputs => `${vsc.toPascalCase(inputs.name)}.test.tsx.snap`,
                content: inputs => `// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[\`${vsc.toPascalCase(inputs.name)} should match snapshot 1\`] = \`
Object {
  "asFragment": [Function],
  "baseElement": <body>
    <div>
      <div
        class="container "
      >
        Hello World!
      </div>
    </div>
  </body>,
  "container": <div>
    <div
      class="container "
    >
      Hello World!
    </div>
  </div>,
  "debug": [Function],
  "findAllByAltText": [Function],
  "findAllByDisplayValue": [Function],
  "findAllByLabelText": [Function],
  "findAllByPlaceholderText": [Function],
  "findAllByRole": [Function],
  "findAllByTestId": [Function],
  "findAllByText": [Function],
  "findAllByTitle": [Function],
  "findByAltText": [Function],
  "findByDisplayValue": [Function],
  "findByLabelText": [Function],
  "findByPlaceholderText": [Function],
  "findByRole": [Function],
  "findByTestId": [Function],
  "findByText": [Function],
  "findByTitle": [Function],
  "getAllByAltText": [Function],
  "getAllByDisplayValue": [Function],
  "getAllByLabelText": [Function],
  "getAllByPlaceholderText": [Function],
  "getAllByRole": [Function],
  "getAllByTestId": [Function],
  "getAllByText": [Function],
  "getAllByTitle": [Function],
  "getByAltText": [Function],
  "getByDisplayValue": [Function],
  "getByLabelText": [Function],
  "getByPlaceholderText": [Function],
  "getByRole": [Function],
  "getByTestId": [Function],
  "getByText": [Function],
  "getByTitle": [Function],
  "queryAllByAltText": [Function],
  "queryAllByDisplayValue": [Function],
  "queryAllByLabelText": [Function],
  "queryAllByPlaceholderText": [Function],
  "queryAllByRole": [Function],
  "queryAllByTestId": [Function],
  "queryAllByText": [Function],
  "queryAllByTitle": [Function],
  "queryByAltText": [Function],
  "queryByDisplayValue": [Function],
  "queryByLabelText": [Function],
  "queryByPlaceholderText": [Function],
  "queryByRole": [Function],
  "queryByTestId": [Function],
  "queryByText": [Function],
  "queryByTitle": [Function],
  "rerender": [Function],
  "unmount": [Function],
}
\`;
`,
              },    
            ]
          },
        ],
      },
    ],
  };
}
