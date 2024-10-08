export default [
  {
    type: 'attributes',
    target:
      '<div class="items-center justify-start rounded-xl p-1 z-10 -mt-1 bg-token-main-surface-primary md:absolute md:border md:border-token-border-light md:hidden"></div>',
    addedNodes: [],
    removedNodes: [],
    previousSibling: null,
    nextSibling: null,
    attributeName: 'class',
    attributeNamespace: null,
    oldValue: 'items-center justify-start rounded-xl p-1 flex',
    attributeValue:
      'items-center justify-start rounded-xl p-1 z-10 -mt-1 bg-token-main-surface-primary md:absolute md:border md:border-token-border-light md:hidden',
  },
  {
    // Remove data-scroll-anchor
    type: 'attributes',
    target:
      '<div class="w-full text-token-text-primary" dir="auto" data-testid="conversation-turn-23" data-scroll-anchor="false"></div>',
    addedNodes: [],
    removedNodes: [],
    previousSibling: null,
    nextSibling: null,
    attributeName: 'data-scroll-anchor',
    attributeNamespace: null,
    oldValue: 'true',
    attributeValue: 'false',
  },
  {
    // Adiciona a mensagem do prompt do usuário (data-scroll-anchor="false")
    type: 'childList',
    target: '<div class="flex flex-col text-sm md:pb-9"></div>',
    addedNodes: [
      '<div class="w-full text-token-text-primary" dir="auto" data-testid="conversation-turn-24" data-scroll-anchor="false"></div>',
    ],
    removedNodes: [],
    previousSibling:
      '<div class="w-full text-token-text-primary" dir="auto" data-testid="conversation-turn-23" data-scroll-anchor="false"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    // Adiciona div que receberá a mensagem do GPT (data-scroll-anchor="true")
    type: 'childList',
    target: '<div class="flex flex-col text-sm md:pb-9"></div>',
    addedNodes: [
      '<div class="w-full text-token-text-primary" dir="auto" data-testid="conversation-turn-25" data-scroll-anchor="true"></div>',
    ],
    removedNodes: [],
    previousSibling:
      '<div class="w-full text-token-text-primary" dir="auto" data-testid="conversation-turn-24" data-scroll-anchor="false"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target:
      '<div class="flex w-full flex-col gap-1 juice:empty:hidden juice:first:pt-[3px]"></div>',
    addedNodes: ['<div class="relative max-w-[70%] result-thinking"></div>'],
    removedNodes: [],
    previousSibling: null,
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'attributes',
    target:
      '<div data-message-author-role="assistant" data-message-id="c592533b-406f-47e4-9494-f8414a1fa33b" dir="auto" class="min-h-[20px] text-message flex flex-col items-start whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 juice:w-full juice:items-end overflow-x-auto gap-2"></div>',
    addedNodes: [],
    removedNodes: [],
    previousSibling: null,
    nextSibling: null,
    attributeName: 'data-message-id',
    attributeNamespace: null,
    oldValue: 'aaa2f27b-ee57-4063-b11d-e64c0dfc66e4',
    attributeValue: 'c592533b-406f-47e4-9494-f8414a1fa33b',
  },
  {
    // Adiciona markdown, div da qual buscaremos o texto para leitura
    type: 'childList',
    target:
      '<div class="flex w-full flex-col gap-1 juice:empty:hidden juice:first:pt-[3px]"></div>',
    addedNodes: ['<div class="markdown prose w-full break-words dark:prose-invert dark"></div>'],
    removedNodes: [],
    previousSibling: null,
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'attributes',
    target:
      '<div data-message-author-role="assistant" data-message-id="c592533b-406f-47e4-9494-f8414a1fa33b" dir="auto" class="min-h-[20px] text-message flex flex-col items-start whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 juice:w-full juice:items-end overflow-x-auto gap-2"></div>',
    addedNodes: [],
    removedNodes: [],
    previousSibling: null,
    nextSibling: null,
    attributeName: 'class',
    attributeNamespace: null,
    oldValue:
      'min-h-[20px] text-message flex flex-col items-start whitespace-pre-wrap break-words [.text-message+&]:mt-5 juice:w-full juice:items-end gap-2',
    attributeValue:
      'min-h-[20px] text-message flex flex-col items-start whitespace-pre-wrap break-words [.text-message+&]:mt-5 juice:w-full juice:items-end overflow-x-auto gap-2',
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    ],
    removedNodes: [],
    previousSibling: '<div class="[&amp;_svg]:h-full [&amp;_svg]:w-full icon-md h-4 w-4"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm text-token-text-quaternary"></svg>',
    ],
    removedNodes: [],
    previousSibling:
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    ],
    removedNodes: [],
    previousSibling: '<div class="[&amp;_svg]:h-full [&amp;_svg]:w-full icon-md h-4 w-4"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm text-token-text-quaternary"></svg>',
    ],
    removedNodes: [],
    previousSibling:
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    ],
    removedNodes: [],
    previousSibling: '<div class="[&amp;_svg]:h-full [&amp;_svg]:w-full icon-md h-4 w-4"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm text-token-text-quaternary"></svg>',
    ],
    removedNodes: [],
    previousSibling:
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    ],
    removedNodes: [],
    previousSibling: '<div class="[&amp;_svg]:h-full [&amp;_svg]:w-full icon-md h-4 w-4"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm text-token-text-quaternary"></svg>',
    ],
    removedNodes: [],
    previousSibling:
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    ],
    removedNodes: [],
    previousSibling: '<div class="[&amp;_svg]:h-full [&amp;_svg]:w-full icon-md h-4 w-4"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm text-token-text-quaternary"></svg>',
    ],
    removedNodes: [],
    previousSibling:
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    ],
    removedNodes: [],
    previousSibling: '<div class="[&amp;_svg]:h-full [&amp;_svg]:w-full icon-md h-4 w-4"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm text-token-text-quaternary"></svg>',
    ],
    removedNodes: [],
    previousSibling:
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    ],
    removedNodes: [],
    previousSibling: '<div class="[&amp;_svg]:h-full [&amp;_svg]:w-full icon-md h-4 w-4"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm text-token-text-quaternary"></svg>',
    ],
    removedNodes: [],
    previousSibling:
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    ],
    removedNodes: [],
    previousSibling: '<div class="[&amp;_svg]:h-full [&amp;_svg]:w-full icon-md h-4 w-4"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm text-token-text-quaternary"></svg>',
    ],
    removedNodes: [],
    previousSibling:
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    ],
    removedNodes: [],
    previousSibling: '<div class="[&amp;_svg]:h-full [&amp;_svg]:w-full icon-md h-4 w-4"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm text-token-text-quaternary"></svg>',
    ],
    removedNodes: [],
    previousSibling:
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    ],
    removedNodes: [],
    previousSibling: '<div class="[&amp;_svg]:h-full [&amp;_svg]:w-full icon-md h-4 w-4"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm text-token-text-quaternary"></svg>',
    ],
    removedNodes: [],
    previousSibling:
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    ],
    removedNodes: [],
    previousSibling: '<div class="[&amp;_svg]:h-full [&amp;_svg]:w-full icon-md h-4 w-4"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex items-center pb-0.5 juice:pb-0"></div>',
    addedNodes: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm text-token-text-quaternary"></svg>',
    ],
    removedNodes: [],
    previousSibling:
      '<span class="line-clamp-1 text-sm" style="opacity: 0; padding-left: 0px; width: 0px;"></span>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    // Indica da resposta do chat, removendo a classe "result-streaming"
    // Após esse evento ocorrer, surgirão os botões de ação, podemos monitorar div da ultima mensagem enviada esperando o surgimento dos botões
    type: 'attributes',
    target: '<div class="markdown prose w-full break-words dark:prose-invert dark"></div>',
    addedNodes: [],
    removedNodes: [],
    previousSibling: null,
    nextSibling: null,
    attributeName: 'class',
    attributeNamespace: null,
    oldValue: 'result-streaming markdown prose w-full break-words dark:prose-invert dark',
    attributeValue: 'markdown prose w-full break-words dark:prose-invert dark',
  },
  {
    type: 'childList',
    target: '<div class="flex-col gap-1 md:gap-3"></div>',
    addedNodes: ['<div class="mt-1 flex gap-3 empty:hidden juice:-ml-3"></div>'],
    removedNodes: [],
    previousSibling: '<div class="flex flex-grow flex-col max-w-full"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex-col gap-1 md:gap-3"></div>',
    addedNodes: ['<div class="pr-2 lg:pr-0"></div>'],
    removedNodes: [],
    previousSibling: '<div class="mt-1 flex gap-3 empty:hidden juice:-ml-3"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
  {
    type: 'childList',
    target: '<div class="flex-col gap-1 md:gap-3"></div>',
    addedNodes: ['<div class="mt-3 w-full empty:hidden"></div>'],
    removedNodes: [],
    previousSibling: '<div class="pr-2 lg:pr-0"></div>',
    nextSibling: null,
    attributeName: null,
    attributeNamespace: null,
    oldValue: null,
    attributeValue: null,
  },
];
