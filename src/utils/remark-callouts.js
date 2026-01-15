/**
 * Remark plugin to convert Obsidian-style callouts to HTML
 * Supports syntax like:
 * > [!NOTE] Title
 * > Content
 * 
 * Converts to:
 * <div class="callout" data-callout="note">
 *   <div class="callout-title">
 *     <span class="callout-icon">📝</span>
 *     <span>Title</span>
 *   </div>
 *   <div class="callout-content">
 *     <p>Content</p>
 *   </div>
 * </div>
 */

import { visit } from 'unist-util-visit';

// Map of callout types to icons
const calloutIcons = {
  note: '📝',
  tip: '💡',
  warning: '⚠️',
  danger: '🔥',
  info: 'ℹ️',
  question: '❓',
  success: '✅',
  failure: '❌',
  bug: '🐛',
  quote: '💬',
  example: '📖',
  abstract: '📄',
  todo: '📋',
};

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, 'blockquote', (node, index, parent) => {
      if (!node.children || node.children.length === 0) return;
      
      const firstChild = node.children[0];
      if (firstChild.type !== 'paragraph') return;
      
      const firstParagraph = firstChild;
      if (!firstParagraph.children || firstParagraph.children.length === 0) return;
      
      const firstText = firstParagraph.children[0];
      if (firstText.type !== 'text') return;
      
      const text = firstText.value;
      
      // Match Obsidian callout syntax: [!TYPE] Title
      const calloutMatch = text.match(/^\[!([A-Z]+)\]\s*(.*)/i);
      if (!calloutMatch) return;
      
      const calloutType = calloutMatch[1].toLowerCase();
      const calloutTitle = calloutMatch[2].trim() || calloutType.charAt(0).toUpperCase() + calloutType.slice(1);
      
      // Remove the callout syntax from the first paragraph
      firstText.value = '';
      
      // If the title was the only content in the first paragraph, remove the paragraph
      if (firstParagraph.children.length === 1 && !calloutTitle) {
        node.children.shift(); // Remove the first paragraph
      } else if (calloutTitle) {
        // Update the first text node with the title
        firstText.value = calloutTitle;
      }
      
      // Collect all content from the blockquote
      const contentChildren = [];
      for (const child of node.children) {
        contentChildren.push(child);
      }
      
      // Create the callout HTML structure
      const calloutNode = {
        type: 'html',
        value: `<div class="callout" data-callout="${calloutType}">`,
      };
      
      const titleNode = {
        type: 'html',
        value: `<div class="callout-title"><span class="callout-icon">${calloutIcons[calloutType] || '📝'}</span><span>${calloutTitle}</span></div>`,
      };
      
      const contentStartNode = {
        type: 'html',
        value: '<div class="callout-content">',
      };
      
      const contentEndNode = {
        type: 'html',
        value: '</div>',
      };
      
      const calloutEndNode = {
        type: 'html',
        value: '</div>',
      };
      
      // Replace the blockquote with callout structure
      parent.children[index] = calloutNode;
      
      // Insert the rest of the structure
      const newNodes = [titleNode, contentStartNode, ...contentChildren, contentEndNode, calloutEndNode];
      parent.children.splice(index + 1, 0, ...newNodes);
    });
  };
}
