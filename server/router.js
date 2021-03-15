const axios = require('axios');
const router = require('express').Router();
const gitToken = require('../config.js');
const controllers = require('./controllers.js');

// PRODUCTS//
router
  .route('/products')
  .get(controllers.getAllProducts);

router
  .route('/products/:product_id')
  .get(controllers.getProductInfo);

router
  .route('/products/:product_id/styles')
  .get(controllers.getProductStyles);

router
  .route('/products/:product_id/related')
  .get(controllers.getRelatedProductIds);

// REVIEWS//
router
  .route('/reviews')
  .get(controllers.getAllReviews)
  .post(controllers.postReviewById);

router
  .route('/reviews/meta/:product_id')
  .get(controllers.getMetadataById);

router
  .route('/reviews/:review_id/helpful')
  .put(controllers.markReviewAsHelpful);

router
  .route('/reviews/:review_id/report')
  .put(controllers.reportReview);

/** ******************* Q&A ROUTES ******************** */
router.route('/qa/questions/:id')
  .get((req, res) => {
    const productId = req.params.id;
    // options.params = {
    //   product_id: productId,
    //   count: 100,
    // };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions`, {
      headers: {
        Authorization: gitToken.TOKEN,
      },
      params: {
        product_id: productId,
        count: 100,
      },
    })
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .post((req, res) => {
    axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions`, req.body, {
      headers: {
        Authorization: gitToken.TOKEN,
      },
    })
      .then(() => res.status(201).send('posted'))
      .catch((err) => res.send(err));
  });

router.route('/qa/questions/:question_id/answers')
  .get((req, res) => {
    const questionId = req.params.question_id;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${questionId}/answers`, {
      headers: {
        Authorization: gitToken.TOKEN,
      },
    })
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .post((req, res) => {
    const questionId = req.params.question_id;
    axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${questionId}/answers`, req.body, {
      headers: {
        Authorization: gitToken.TOKEN,
      },
    })
      .then(() => res.status(201).send('posted'))
      .catch((err) => res.send(err));
  });

router.route('/qa/questions/:question_id/helpful')
  .put((req, res) => {
    const questionId = req.params.question_id;
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${questionId}/helpful`, {}, {
      headers: {
        Authorization: gitToken.TOKEN,
      },
    })
      .then(() => res.status(204).send('updated'))
      .catch((err) => res.send(err));
  });

router.route('/qa/questions/:question_id/report')
  .put((req, res) => {
    const questionId = req.params.question_id;
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${questionId}/report`, {}, {
      headers: {
        Authorization: gitToken.TOKEN,
      },
    })
      .then(() => res.status(204).send('updated'))
      .catch((err) => res.send(err));
  });

router.route('/qa/answers/:answer_id/helpful')
  .put((req, res) => {
    const answerId = req.params.answer_id;
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${answerId}/helpful`, {}, {
      headers: {
        Authorization: gitToken.TOKEN,
      },
    })
      .then(() => res.status(204).send('updated'))
      .catch((err) => res.send(err));
  });

router.route('/qa/answers/:answer_id/report')
  .put((req, res) => {
    const answerId = req.params.answer_id;
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${answerId}/report`, {}, {
      headers: {
        Authorization: gitToken.TOKEN,
      },
    })
      .then(() => res.status(204).send('updated'))
      .catch((err) => res.send(err));
  });

// CART//
router
  .route('/cart')
  .get(controllers.getCart)
  .post(controllers.postProductToCartBySkuId);

// INTERACTIONS//
router
  .route('/interactions')
  .post(controllers.postInteraction);

module.exports = router;
