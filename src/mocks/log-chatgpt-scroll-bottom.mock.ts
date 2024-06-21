export default [
  // show scroll bottom
  {
    type: 'childList',
    target: '<div class="flex flex-col text-sm md:pb-9"></div>',
    addedNodes: [
      '<button class="cursor-pointer absolute z-10 rounded-full bg-clip-padding border text-token-text-secondary border-token-border-light right-1/2 juice:translate-x-1/2 bg-token-main-surface-primary bottom-5"></button>',
    ],
    removedNodes: [],
    previousSibling:
      '<div class="w-full text-token-text-primary" dir="auto" data-testid="conversation-turn-13" data-scroll-anchor="true"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
  },
  // hide scroll bottom
  {
    type: 'childList',
    target: '<div class="flex flex-col text-sm md:pb-9"></div>',
    addedNodes: [],
    removedNodes: [
      '<button class="cursor-pointer absolute z-10 rounded-full bg-clip-padding border text-token-text-secondary border-token-border-light right-1/2 juice:translate-x-1/2 bg-token-main-surface-primary bottom-5"></button>',
    ],
    previousSibling:
      '<div class="w-full text-token-text-primary" dir="auto" data-testid="conversation-turn-13" data-scroll-anchor="true"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
  },
];
