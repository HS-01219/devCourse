import { setupWorker } from "msw/browser";
import { addReview, reviewForMain, reviewsById } from "./review";
import { bestBooks } from "./books";
import { banners } from "./banner";

// 모킹 서버 api
const handlers = [reviewsById, addReview, reviewForMain, bestBooks, banners];

export const worker = setupWorker(...handlers);