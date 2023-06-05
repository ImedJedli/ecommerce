class APISearch {
  constructor(query, querySearch) {
    this.query = query;
    this.querySearch = querySearch;
  }

  search() {
    const keyword = this.querySearch.keyword
      ? {
          name: {
            $regex: this.querySearch.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const newQuery = { ...this.querySearch };

    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((field) => delete newQuery[field]);

    let querySearch = JSON.stringify(newQuery);
    querySearch = querySearch.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(querySearch));
    return this;
  }

  pagination(page) {
    const currentPage = Number(this.querySearch.page) || 1;
    const skip = page * (currentPage - 1);
    this.query = this.query.limit(page).skip(skip);
    return this;
  }

  sort(sortBy) {
    this.query = this.query.sort(sortBy);
    return this;
  }
}

module.exports = APISearch;
