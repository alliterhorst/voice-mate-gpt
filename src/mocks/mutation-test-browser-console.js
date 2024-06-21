/* eslint-disable */

getHtmlWithoutChild = element => element.outerHTML.replace(element.innerHTML || '', '');

transformMutationRecord = mutationRecord => ({
  type: mutationRecord.type,
  target: getHtmlWithoutChild(mutationRecord.target),
  addedNodes: Array.from(mutationRecord.addedNodes).map(
    node => getHtmlWithoutChild(node) || node.textContent,
  ),
  removedNodes: Array.from(mutationRecord.removedNodes).map(
    node => getHtmlWithoutChild(node) || node.textContent,
  ),
  previousSibling: mutationRecord.previousSibling
    ? getHtmlWithoutChild(mutationRecord.previousSibling) ||
      mutationRecord.previousSibling.textContent
    : null,
  nextSibling: mutationRecord.nextSibling
    ? getHtmlWithoutChild(mutationRecord.nextSibling) || mutationRecord.nextSibling.textContent
    : null,
  attributeName: mutationRecord.attributeName,
  attributeNamespace: mutationRecord.attributeNamespace,
  oldValue: mutationRecord.oldValue,
  attributeValue: mutationRecord.attributeName
    ? mutationRecord?.target?.getAttribute(mutationRecord.attributeName)
    : null,
});

convertMutationRecordToString = mutationRecord =>
  JSON.stringify(transformMutationRecord(mutationRecord), null, 2);

mutationsHistory = [];
mutationsHistoryRemovedNodes = [];
element =
  document.querySelector('[role="presentation"]')?.children[0]?.children[0]?.children[0]
    ?.children[0];
config = { attributes: true, childList: true, subtree: true, attributeOldValue: true };
observer = new MutationObserver(mutations => {
  console.log(mutations);
  mutations.forEach(mutation => {
    if (
      mutation.type === 'childList' &&
      mutation.removedNodes.length &&
      !mutation.addedNodes.length
    ) {
      mutationsHistoryRemovedNodes.push(mutation);
    } else {
      mutationsHistory.push(mutation);
    }
  });
});
observer.observe(element, config);

m = mutationsHistory[0];
console.log(convertMutationRecordToString(m));
