const { newsService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const createNews = catchAsync(async (req, res) => {  
  if (!req.file) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: "No file uploaded",
    });
  }

  const news = await newsService.createNews(req.body, req.file);

  return res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Create News Success",
    data: {
      newsId: news.id,
    },
  });
});

module.exports = {
  createNews,
};


module.exports = {
  createNews,
};
