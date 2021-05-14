# carryhome

1. Please use transactions whenever there are more than one DB action. It's a real pain to add it later. See https://medium.com/cashpositive/the-hitchhikers-guide-to-mongodb-transactions-with-mongoose-5bf8a6e22033 to know how to use transactions
2. Use logger being initialized instead of console.log, so that we can ship logs easily in future.
3. Use errorHandler class, if new functionality is to be added we can add there
4. Use wrap, to bring async functions to express router.
5. Added lint, use defined rules and can add more. Run npm run lint before commiting. Added general rules there
6. Add security rules while developing controller itself
7. Add environment variables in .env file. Dotenv lib package is added to read and populate into process.env
8. Add swagger document when-ever we are creating new endpoint. It is already configured and again it's a pain to add later for multiple endpoints at one-go
9. Use models.js file for model imports rather than invididual model file import

Side Note:
https://eslint.org/docs/rules/semi
https://evanhahn.com/newline-necessary-at-the-end-of-javascript-files/
https://staxmanade.com/2018/03/should-i-use-javascript-single-or-double-quotes/
https://eslint.org/docs/rules/comma-dangle

