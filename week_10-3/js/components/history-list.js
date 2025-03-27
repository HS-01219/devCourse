import { renderCurrentAsset } from "../components/current-asset.js";
import { store, removeHistory } from "../store.js";

const $sectionHistory = document.querySelector(".history");

export function initHistoryList() {
  renderHistoryList();
  addHistoryListEventListener();
}

function addHistoryListEventListener() {
  $sectionHistory.addEventListener("click", function (event) {
    const element = event.target;
    if (!element.className.includes("delete-button")) return;
    
    const { dateid, itemid } = element.dataset;
    console.log(dateid, itemid)
    const isSuccess = removeHistory(dateid, itemid);
    console.log(isSuccess)
    if (!isSuccess) {
      alert("소비내역 삭제에 실패했습니다.");
      return;
    }

    reRender();
  });
}

function reRender() {
  renderCurrentAsset();
  renderHistoryList();
}

export function renderHistoryList() {
  // TODO: 데이터 매핑
  // TODO: 오름차순으로 목록 나열
  // TODO: 항목의 시간 포맷 변경: `HH:mm`
  // TODO: 금액 콤마 포맷 맞추기

  $sectionHistory.innerHTML = store.dateList
    .map(({ date, id: dateId }) => {
      const detail = store.detailList[dateId];
      if (!detail?.length) return "";
      
      return `<article class="history-per-day">
      <p class="history-date">2021년 12월 1일</p>
      ${ // map은 배열을 반환하기 때문에 join("")을 사용하여 문자열로 변환
        // 시간 오름차순으로 나열하기 위해 sort 사용
        detail
        .sort((a,b) => new Date(b.createAt) - new Date(a.createAt))
        .map(({description, category, amount, fundsAtTheTime, createAt, id}) => {
          // ISO 날짜 형식을 변환
          const time = new Date(createAt).toLocaleTimeString("ko-kr", {
              timeStyle : "short",
              hourCycle : "h24"
          }); // "오후 3:00:00" -> "15:00" / 이 외에도 다양한 옵션으로 포맷 설정 가능
          return `<section class="history-item">
                      <section class="history-item-column">
                        <div class="create-at">${time}</div>
                        <div class="history-detail">
                          <div class="history-detail-row history-detail-title">
                            <p>${description}</p>
                          </div>
                          <div class="history-detail-row history-detail-subtitle">
                            <p>${category}</p>
                            <p>
                              ${amount.toLocaleString()}
                              <span>원</span>
                            </p>
                          </div>
                        </div>
                        <div class="delete-section">
                          <button class="delete-button" data-dateid="${dateId}" data-itemid="${id}">🗑</button>
                        </div>
                      </section>
                      <section class="history-item-caption">
                        <p>
                          <span>남은 자산</span>
                          <span>${fundsAtTheTime.toLocaleString()}</span>
                          <span>원</span>
                        </p>
                      </section>
                  </section>`;
        }).join("")
      }
    </article>`;
    })
    .join("");
}
