import type { Schema as SanitizeOption } from 'hast-util-sanitize';
import { Plugin } from 'unified/index';
import { Data, Node } from 'unist';
import { visit } from 'unist-util-visit';

function rewriteNode(node: Node) {
  const data = node.data ?? (node.data = {});
  Object.defineProperty(data, 'hName', { value: "summary" });
  // function transformList(node:Data) {
//   node.data?.
//     // Iterate over list items
//     return node.children.map((listItem) => {
//       const [firstChild, ...restChildren] = listItem.children;

//       // Assume the first child is a paragraph containing the list item text
//       const summaryText = firstChild.children
//         .filter((child) => child.type === 'text')
//         .map((child) => child.value)
//         .join('');

//       const sublistNodes = restChildren.map((child) => {
//         // If a child is a list, recursively transform it
//         if (child.type === 'list') {
//           return transformList(child);
//         }
//         return null;
//       });

//       return {
//         type: 'html',
//         value: `
// <details>
// <summary>${summaryText}</summary>
// ${sublistNodes.filter(Boolean).join('')}
// </details>`,
//       };
//     });
//   }
}


export const remarkSummaryPlugin: Plugin = function () {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'list') { //@see https://github.com/syntax-tree/mdast#list
        rewriteNode(node);
      }
    });
  };
};

export const sanitizeOption: SanitizeOption = {
  tagNames: ['summary'],
};
