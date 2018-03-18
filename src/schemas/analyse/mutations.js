import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList
} from 'graphql';

import * as types from './types';
import {userData, customerData} from '../../data/index';
import { 
  customerModel
} from '../../models/customer'
const commonFields = require('../common/common-fields')
const schemasUtils = require('../../utils/schemas-utils')
const utils = require('../../utils/utils')
