export function throwContextError(businessContext: string): void {
  throw new Error(
    `use${businessContext}Context deve ser utilizando dentro do ${businessContext}Provider`
  );
}
