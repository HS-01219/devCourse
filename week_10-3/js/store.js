/**
 * dateList {
    date: new Date("2000-01-10").toLocaleDateString(),
    id: "2",
  }[]
 * detailList {
    2: {
       id: Date.now() + 1000,
       createAt: new Date(),
       description: "삼겹살",
       category: "식사",
       amount: 20000,
       fundsAtTheTime: 9978000,
     }[]
  }
 */
export const store = {
  currentFunds: 0,
  isFirstEdit: true,
  todayId: 1,
  dateList: [
    {
      id: 1,
      date: new Date().toLocaleDateString(),
    },
  ],
  detailList: {},
};

export function updateStorage() {
  sessionStorage.setItem("store", JSON.stringify(store));
}

export function initStore() {
  const storage = sessionStorage.getItem("store");
  if (!storage) updateStorage();

  const { dateList, detailList, todayId, currentFunds, isFirstEdit } =
    JSON.parse(storage);

  store.currentFunds = currentFunds;
  store.isFirstEdit = isFirstEdit;
  store.dateList = dateList;
  store.detailList = detailList;
  store.todayId = todayId;
}

export function addNewHistory(newHistory) {
  try {
    // TODO:
    /**
     * - store의 detailList 새로 갱신
     * - store.currentFunds 새로 갱신
     */

    if(store.detailList[store.todayId]) {
      // 존재하는 경우 해당 배열에 push
      store.detailList[store.todayId].push(newHistory);
    } else {
      // 존재하지 않는 경우 새로운 배열 생성
      store.detailList[store.todayId] = [newHistory];
    }

    // 현재 자산 - amount가 현재 자산이 됨
    store.currentFunds -= newHistory.amount;

    updateStorage();
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

export function removeHistory(dateId, itemId) {
  try {
    // TODO:
    /**
     * - store의 detailList 새로 갱신
     * - store.currentFunds 새로 갱신
     */
    
    // 기존 배열에서 삭제할 요소를 제거한 배열을 재할당
    store.detailList[dateId] = store.detailList[dateId].filter(({id, amount}) => {
      if(id === Number(itemId)) {
        // 현재 자산 + amount가 다시 현재 자산이 됨
        store.currentFunds += amount;
      }
      return id !== Number(itemId);
    });

    updateStorage();
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}
