import InvalidParameterException from 'utils/exception/InvalidParameterException';

const helper = () => {
  const orderingTrxs = (orderBy, order) => {
    if (order !== 'desc' && order !== 'asc') throw new InvalidParameterException(`order ${order} is not correct : should be desc or asc`);
    if(orderBy === 'received_at') { // need to cast ot Date
      if (order === 'asc') {
        return (paramA, paramB) => new Date(paramA[orderBy]) - new Date(paramB[orderBy]);
      } else {
        return (paramA, paramB) => new Date(paramB[orderBy]) - new Date(paramA[orderBy]);
      }
    }

    if (order === 'asc') { // let's to default sorting for now
      return (paramA, paramB) => paramA[orderBy] - paramB[orderBy];
    } else {
      return (paramA, paramB) => paramB[orderBy] - paramA[orderBy];
    }
  }

  return {
    orderingTrxs,
  }
}

export default helper();