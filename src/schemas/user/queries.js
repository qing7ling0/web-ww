import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

import * as types from './types';
import { userModel } from '../../models'


export const users = {
	type: new GraphQLList(types.user),
	async resolve (root, params, options) {
  		var users = await userModel.find({});
  		return users;
	}
}