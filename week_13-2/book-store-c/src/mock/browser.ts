import { setupWorker } from "msw/browser";
import { addReview, reviewForMain, reviewsById } from "./review";

// 모킹 서버 api
const handlers = [reviewsById, addReview, reviewForMain];

export const worker = setupWorker(...handlers);