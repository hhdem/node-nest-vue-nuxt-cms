import { apiHelper } from "../plugins/axios";

export default {
  getArticles({ page, limit, keyword, category }) {
    const searchParams = new URLSearchParams();
    searchParams.append("page", page);
    searchParams.append("limit", limit);
    searchParams.append("rand", new Date().getTime());
    if (keyword) {
      searchParams.append("keyword", keyword);
    }
    if (category) {
      searchParams.append("category", category);
    }
    return apiHelper.get(`/articles?${searchParams.toString()}`);
  },
  getLastestArticles({ page, limit, keyword, category, outerId }) {
    const searchParams = new URLSearchParams();
    searchParams.append("limit", limit);
    searchParams.append("page", page);
    searchParams.append("rand", new Date().getTime());
    if (keyword) {
      searchParams.append("keyword", keyword);
    }
    if (category) {
      searchParams.append("category", category);
    }
    if (outerId) {
      searchParams.append("outerId", outerId);
    }
    return apiHelper.get(`/articles/list/lastest?${searchParams.toString()}`);
  },
  getArticleDetail({ id }) {
    // console.info("get article by id", `/article/${id}`);
    return apiHelper.get(`/articles/${id}?rand=${new Date().getTime()}`);
  },
  getArticleCategories({ page, limit, keyword }) {
    const searchParams = new URLSearchParams();
    searchParams.append("page", page);
    searchParams.append("limit", limit);
    searchParams.append("rand", new Date().getTime());
    if (keyword) {
      searchParams.append("keyword", keyword);
    }
    return apiHelper.get(`/article-categories?${searchParams.toString()}`);
  },
};
