const generateId = () => Date.now();

const parseQuery = (req, res, next) => {
    req.query.offset = (req.query.offset && parseInt(req.query.offset, 10)) || 0;
    req.query.limit = (req.query.limit && parseInt(req.query.limit, 10)) || 10;

    next();
};

module.exports = {
    generateId,
    parseQuery
};
