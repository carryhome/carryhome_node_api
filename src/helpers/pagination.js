import _ from 'lodash'

global.paginationProject = {
  'data' : 1,
  'metadata.total': { $arrayElemAt: [ '$meta.total', 0 ] },
  'metadata.page': { $arrayElemAt: [ '$meta.page', 0] },
}

export async function pagination(req, res, next){
  try {
    let pageNo = 1, pageSize = 10000
    if (_.isUndefined(req.query)) return next() 
    if (!_.isUndefined(req.query.pageNo) ^ !_.isUndefined(req.query.pageSize)) {
      return res.status(422).send({status : 'error', message: 'pageNo, pageSize either both are required or none!'})
    }
    if (!_.isUndefined(req.query.pageNo) && !_.isUndefined(req.query.pageSize)) {
      pageNo = parseInt(req.query.pageNo)
      pageSize = parseInt(req.query.pageSize)
      if (pageNo < 0 || pageNo === 0) 
        res.status(422).send({status : 'success', message : 'invalid page number, should start with 1'})
      const skip = pageSize * (pageNo - 1), limit = pageSize
      delete req.query.pageNo
      delete req.query.pageSize
      req.pagination = {}
      req.pagination.limit = limit
      req.pagination.skip = skip
      req.pagination.page = pageNo
      next()
    }
    else {
      req.pagination = {}
      req.pagination.limit = pageSize
      req.pagination.skip = 0
      req.pagination.page = pageNo
      next()  
    }
  } catch(err) {
    return res.status(500).send({status : 'error', message: `Error: Not valid parameters, ${err.message}`})
  }
}
