const fs = require("fs");
const path = require("path");

module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Create a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
      {
        type: "list",
        name: "type",
        message:
          "What is the type of component? ('atom, molecule, organism, screens')",
        choices: ["atoms", "molecules", "organisms", "screens"],
      },
      {
        type: "confirm",
        name: "useCategory",
        message: "Do you want to create or select a category?",
        default: false,
      },
      {
        type: "list",
        name: "existingCategory",
        message: "Select an existing category or choose to create a new one:",
        choices: (answers) => {
          const componentTypePath = path.join(
            __dirname,
            `src/components/${answers.type}`
          );
          const folders = fs
            .readdirSync(componentTypePath)
            .filter((file) =>
              fs.statSync(path.join(componentTypePath, file)).isDirectory()
            );
          return [
            ...folders,
            new plop.inquirer.Separator(),
            "Create a new category",
          ];
        },
        when: (answers) => answers.useCategory,
      },
      {
        type: "input",
        name: "newCategory",
        message: "Enter the name of the new category:",
        when: (answers) =>
          answers.useCategory &&
          answers.existingCategory === "Create a new category",
      },
    ],
    actions: (data) => {
      const category =
        data.useCategory && data.existingCategory === "Create a new category"
          ? data.newCategory
          : data.existingCategory;

      const basePath = data.useCategory
        ? `src/components/{{camelCase type}}/${category}/{{camelCase name}}`
        : `src/components/{{camelCase type}}/{{camelCase name}}`;

      return [
        {
          type: "add",
          path: `${basePath}/index.tsx`,
          templateFile: "plop-templates/Component.tsx.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{camelCase name}}.interface.ts`,
          templateFile: "plop-templates/Component.interface.ts.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{camelCase name}}.logic.ts`,
          templateFile: "plop-templates/Component.logic.ts.hbs",
        },
      ];
    },
  });
};
