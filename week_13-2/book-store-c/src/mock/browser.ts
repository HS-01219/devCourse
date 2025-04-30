import { setupWorker } from "msw/browser";
import { addReview, reviewsById } from "./review";

// 모킹 서버 api
const handlers = [reviewsById, addReview];

export const worker = setupWorker(...handlers);