export function toShow(node) {
  node.className = node.className.replace("v-none", "v-show");
}

export function toHidden(node) {
  node.className = node.className.replace("v-show", "v-none");
}

export function validatePrice(currentFunds, currentAmount) {
  // TODO: 금액이 현재 자산보다 이하인지
  return currentFunds >= currentAmount;
}

export function validateRequired({ category, description, price }) {
  // Boolean(category) 또는 !!category 로 체크 가능
  return Boolean(category) && Boolean(description) && Boolean(price) && price > 0;
}
